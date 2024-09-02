import React, { useState ,useEffect} from 'react';
import { Button} from '@mui/material';
import '../Financial/Financialdetails.css'; 
import axios from 'axios'

export default function Incomedetails({complaintNo,onBackClick,prebool}) {
    const [details, setDetails] = useState(null);
    const [isUpdateClicked, setUpdateClicked] = useState(false);
    const [selectedDepartment, setSelectedDepartment] = useState('');
    const [isRouteClicked, setRouteClicked] = useState(false);
    const [selectedStatus, setSelectedStatus] = useState('');
    const [imageSrc, setImageSrc] = useState('');
    const[routecollection] = useState('Rerouted');
    const[notify] = useState('Notifications');
    const handleUpdate= async()=>{
        setUpdateClicked(true);
        if(isUpdateClicked){
            try {
                if (selectedStatus==='') {
                  alert('Please select a status');
                  return;
                }
                else{
                    console.log(complaintNo + " " + selectedStatus)
                    const response = await axios.put(`http://localhost:5000/grievance/updateStatus/${complaintNo}`, {status: selectedStatus});
                    console.log('Status updated successfully:', response.data);
                    setUpdateClicked(false);
                    setSelectedStatus('');
                    alert("Updated successfully");
                    onBackClick();
                    
                }
            } 
                catch (error) {
                    console.error('Error updating status:', error);
                }
        }
    }
    const handlereroute= async()=>{
        setRouteClicked(true);
        if(isRouteClicked){
            try{
                if(selectedDepartment===''){
                    alert("Please select the department");
                    return;
                }
                else{
                    await axios.delete(`http://localhost:5000/grievance/delete/${details[0].department}/${details[0].complaintNo}`);
                    const res = await axios.get('http://localhost:3001/uniquecmno');
                    const currentRid = res.data[1].Rid;
                    const newRid = currentRid + 1;
                    await axios.put('http://localhost:3001/uniquecmno/2', { Rid: newRid });
                    const Rid = "RTE"+String(newRid);
                    console.log(Rid);
                    const response = await axios.post(`http://localhost:5000/grievance/insertreroute/${routecollection}`,{
                        userid: details[0].userid,
                        routeid:Rid,
                        complaintNo: details[0].complaintNo,
                        currentdept: details[0].department,
                        routedto: selectedDepartment
                    })
                    await axios.post(`http://localhost:5000/insertnotification/${notify}`,{
                        userid: details[0].userid,
                        notification:`Your Grievance Id <strong> ${details[0].complaintNo} </strong> is Rerouted from department ${details[0].department} to ${selectedDepartment}. <strong>${Rid}</strong>  is your Route Id and use this Id
                        to re-register your grievance in directed department in your dashboard.`
                    })
                    console.log("Rerouted Successfully" + response.data);
                    setRouteClicked(false);
                    setSelectedDepartment('');
                    alert("Rerouted Successfully");
                    onBackClick();
                }
            }
            catch(err){
                console.log('Error in Rerouting:' + err);
            }
        }
    }
    useEffect(() => {
        const fetchDetails = async () => {
        try {
            console.log(complaintNo);
            const response = await axios.get(`http://localhost:5000/grievance/details/${complaintNo}`);
            setDetails(response.data);
            // const imagesrc = `data:image/jpeg;base64,${details[0].Attach.toString('base64')}`;
            // setImageSrc(imagesrc);
        } catch (error) {
            console.error('Error fetching detailed data:', error);
        }
        };

        fetchDetails();
    }, [complaintNo]);

    if (details === null) {
        return <div>Loading...</div>; 
    }
    const decodedAttach = atob(details[0].Attach);

    const handleDownload = () => {
        const blob = new Blob([decodedAttach], { type: 'image/jpeg' });
        const url = URL.createObjectURL(blob);
        const a = document.createElement('a');
        a.href = url;
        a.download = 'attached_document.jpg'; // You can set the file name here
        a.click();
        URL.revokeObjectURL(url);
    };

    return (
        <div className="department-container">
            <div className="header-container">
                <p style={{fontSize:'22px'}}><b>Grievance Details:</b></p>
                <Button sx={{backgroundColor:'rgb(226, 62, 62)'}}variant="contained" color='secondary' onClick={()=>{onBackClick()}}>Back</Button>
            </div>
            <div className="form-container">
                <form>
                    <div className="form-group">
                        <label  className='label'><b>Complaint Id </b></label>
                        <p>: {details[0].complaintNo}</p>
                    </div>
                    <div className="form-group">
                        <label className='label'><b>User Id  </b></label>
                        <p>: {details[0].userid}</p>
                    </div>
                    <div className="form-group">
                        <label className='label'><b>Name  </b></label>
                        <p>: {details[0].name}</p>
                    </div>
                    <div className="form-group">
                        <label className='label'><b>Address</b></label>
                        <p>: {details[0].address}</p>
                    </div>
                    <div className="form-group">
                        <label className='label'><b>Locality  </b></label>
                        <p>: {details[0].locality}</p>
                    </div>
                    <div className="form-group">
                        <label className='label'><b>Mobile Number </b></label>
                        <p>: {details[0].mobile}</p>
                    </div>
                    <div className="form-group">
                        <label className='label'><b>Gender </b></label>
                        <p>: {details[0].gender}</p>
                    </div>
                    <div className="form-group">
                        <label className='label'><b>Country  </b></label>
                        <p>: {details[0].country}</p>
                    </div>
                    <div className="form-group">
                        <label className='label'><b>State </b></label>
                        <p>: {details[0].state}</p>
                    </div>
                    <div className="form-group">
                        <label className='label'><b>Grievance Department </b></label>
                        <p>: {details[0].department}</p>
                    </div>
                    <div className="form-group">
                        <label className='label'><b>Main Category </b></label>
                        <p>: {details[0].maincategory}</p>
                    </div>
                    <div className="form-group">
                        <label className='label'><b>SubCategory </b></label>
                        <p>: {details[0].nextcategory}</p>
                    </div>
                    <div className="form-group">
                        <label className='label'><b>Organisation Name</b></label>
                        <p>: {details[0].orname}</p>
                    </div>
                    <div className="form-group">
                        <label className='label'><b>Division/Section </b></label>
                        <p>: {details[0].division}</p>
                    </div>
                    <div className="form-group">
                        <label className='label'><b>Employee No. and Name </b></label>
                        <p>: {details[0].empname}</p>
                    </div>
                    <div className="form-group">
                        <label className='label'><b>Regional Office</b></label>
                        <p>: {details[0].office}</p>
                    </div>
                    <div className="form-group">
                        <label className='label'><b>Date </b></label>
                        <p>: {details[0].date}</p>
                    </div>
                    <div className="form-group">
                        <label className='label'><b>Time </b></label>
                        <p>: {details[0].time}</p>
                    </div>
                    <div className="form-group">
                        <label className='label'><b>Grievance </b></label>
                        <p>: {details[0].grievance}</p>
                    </div>
                    <div className="form-group">
                        <label className='label'><b>Status </b></label>
                        <p>: {details[0].status}</p>
                    </div>
                    <div className="form-group">
                        <label className='label'><b>Attached Document</b></label>
                        <Button variant="outlined" color="primary" onClick={handleDownload}>
                            Download Document
                        </Button>
                    </div>
                <div>
                {prebool==='true' && 
                <div className='button-container'>
                    <div className='button-group'>
                        {isUpdateClicked &&
                        <div className='bhere'>
                            <select class="button top-left" value={selectedStatus} onChange={(e) => {setSelectedStatus(e.target.value)}}
                                style={{padding: '3px',border: '1px solid #ccc',borderRadius: '4px',backgroundColor: 'rgba(235, 235, 235, 0.7)',marginRight:'9%'}}>
                                <option value="">Mark as</option>
                                <option value="Pending">Pending</option>
                                <option value="Rejected">Rejected</option>
                                <option value="Solved">Solved</option>
                            </select>
                            <Button variant='contained' size='small' color='secondary' sx={{backgroundColor:'rgb(226, 62, 62)'}} onClick={()=>{setUpdateClicked(false);setSelectedStatus('')}}>Cancel</Button>
                        </div>}
                        <Button variant="contained" color="secondary" sx={{backgroundColor: 'rgb(235, 157, 13)',marginTop:'3%'}}
                            onClick={handleUpdate}>
                            Update
                        </Button>
                    </div>
                    <div className='button-group'>
                        {isRouteClicked &&
                        <div className='bhere'>
                            <select class="button top-left" value={selectedDepartment} onChange={(e) => {setSelectedDepartment(e.target.value)}}
                                style={{padding: '3px',border: '1px solid #ccc',borderRadius: '4px',backgroundColor: 'rgba(235, 235, 235, 0.7)',marginRight:'10%',width:'28%'}}>
                                <option value="">Reroute to</option>
                                <option value="Financial Services(Banking Division)">Financial Services(Banking Division)</option>
                                <option value="Health & Family Welfare">Health & Family Welfare</option>
                                <option value="Housing and Urban Affairs">Housing and Urban Affairs</option>
                                <option value="Labour and Employment">Labour and Employment</option>
                                <option value="Labour and Employment">Central board of Direct Tax</option>
                            </select>
                            
                            <Button variant='contained' color='secondary'size='small' sx={{backgroundColor:'rgb(226, 62, 62)'}} onClick={()=>{setRouteClicked(false);setSelectedDepartment('')}}>Cancel</Button>
                        </div>}
                        <Button variant="contained" color="secondary" sx={{backgroundColor: '#f77644',marginTop:'3%'}}
                            onClick={handlereroute}>
                            Reroute
                        </Button>
                    </div>
                </div>}
            </div>
            </form>
            </div>
        </div>
    );
}
