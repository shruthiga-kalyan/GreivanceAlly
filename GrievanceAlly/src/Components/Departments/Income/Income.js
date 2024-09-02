import React, { useState } from 'react';
import { Button, TextField } from '@mui/material';
import axios from 'axios'
import { useAuth } from '../../../AuthContext';
import '../Financial/Financial.css'

export default function Income({handleBackClick}) {
    const[department]=useState('Central board of Direct Tax');
    const[category,setcategory]=useState('');
    const[category1,setcategory1]=useState('');
    const[orname,setorname]=useState('');
    const[division,setdivision]=useState('');
    const[empname,setempname]=useState('');
    const[office,setoffice]=useState('');
    const[grievance,setgrievance]=useState('');
    const[fileupload,setfileupload]=useState();
    const{user} = useAuth();
    const[notify] = useState('Notifications');
    const handleFile = (event)=>{
        const file = event.target.files[0];
        setfileupload(file);
    };
    const handleSubmit = async (e) => {
        e.preventDefault();
    
        if (!user) {
            console.error('User is undefined');
            return;
        }
        const response = await axios.get('http://localhost:3001/uniquecmno');
        const currentCompNo = response.data[0].CompNo;
        const newCompNo = currentCompNo + 1;
        await axios.put('http://localhost:3001/uniquecmno/1', { CompNo: newCompNo });
        const temp = JSON.stringify(user, null, 2);
        const user1 = JSON.parse(temp);
        const CNo = "GRVAY"+String(newCompNo);
        console.log(newCompNo);
        const formData = {
            userid: user1.id,
            name: user1.name,
            address: user1.address,
            locality: user1.locality,
            mobile: user1.mobile,
            gender: user1.gender,
            country: user1.country,
            state: user1.state,
            department,
            complaintNo: CNo,
            mainCategory: category,
            nextCategory: category1,
            orname,
            division,
            empname,
            office,
            grievance,
            fileUpload: fileupload ? await convertFileToBase64(fileupload) : '',
        };
    
        try {
            const response = await axios.post('http://localhost:5000/submitincome', formData);
            await axios.post(`http://localhost:5000/insertnotification/${notify}`,{
            userid: user1.id,
            notification:`Your Grievance has been submitted successfully. <strong>${CNo}</strong> is your Grievance ID and use this to track your status.`})
            console.log(response.data);
            alert("Submitted Successfully");
            handleBackClick();
        } catch (error) {
            console.error('Error submitting grievance:', error);
        }
    };
    const convertFileToBase64 = (file) => {
        return new Promise((resolve, reject) => {
            const reader = new FileReader();
            reader.readAsDataURL(file);
            reader.onload = () => resolve(reader.result.split(',')[1]);
            reader.onerror = (error) => reject(error);
        });
    }
    return (
        <div className="department-container">
            <div className="header-container">
                <p style={{fontSize:'22px'}}><b>Grievance Registration Form</b></p>
                <Button sx={{backgroundColor:'rgb(226, 62, 62)'}}variant="contained" color='secondary' onClick={()=>{handleBackClick()}}>Back</Button>
            </div>
            <div className="form-container">
                <form onSubmit={handleSubmit}>
                    <div className="form-group">
                        <label htmlFor='department' className='label'><b>Ministry/Department*</b></label>
                        <TextField disabled required id="department" sx={{marginTop:'18px'}}className="input1" value={department} type='text' size='small'/>
                    </div>
                    <div className="form-group">
                        <label htmlFor='category' className='label'><b>Select main category*</b></label>
                        <select id="category" className="input1" required value={category}  onChange={(e)=>{setcategory(e.target.value)}}>
                        <option value=""> Please select main category</option>
                        <option >Pension Related</option>
                        <option >Employee Related/Service Related</option>
                        <option >Administration related</option>
                        <option >Corruption/Malpractices related(VCs,employees)</option>
                        <option >Direct Taxes</option>
                        <option >Pan Issues</option>
                        <option >Technical Issues with website</option>
                        <option >Other/Misc/Suggestions</option>
                        </select>
                    </div>
                    {category && 
                    <div className="form-group">
                        <label htmlFor='category1' className='label'><b>Select next level category*</b></label>
                        <select id="category1" className="input1" required value={category1} onChange={(e)=>{setcategory1(e.target.value)}}>
                        <option value="">Select next level category</option>
                        <option>Compassionate ground</option>
                        <option>Pending any type of Bill/dues for payment</option>
                        <option>Issues related to Promotion</option>
                        <option>Transfer/Posting</option>
                        <option>Pending Disciplinary/Vigilance Matter</option>
                        <option>Sexual harassment</option>
                        <option>Misbehaviour/harassment by any officer/staff</option>
                        <option>Others</option>
                        </select>
                    </div>}
                    {category1 &&
                    <div className="form-group">
                        <label htmlFor='branch' className='label'><b>Organisation Name*</b></label>
                        <TextField required id="branch" sx={{marginTop:'10px'}}className="input1" value={orname}  type='text' size='small'  onChange={(e)=>{setorname(e.target.value)}}/>
                    </div>}
                    {category1 &&
                    <div className="form-group">
                        <label htmlFor='branch' className='label'><b>Division/Section*</b></label>
                        <TextField required id="branch" sx={{marginTop:'10px'}}className="input1" value={division}  type='text' size='small'  onChange={(e)=>{setdivision(e.target.value)}}/>
                    </div>}
                    {category1 &&
                    <div className="form-group">
                        <label htmlFor='branch' className='label'><b>Employee No. and Name*</b></label>
                        <TextField required id="branch" sx={{marginTop:'10px'}}className="input1" value={empname}  type='text' size='small'  onChange={(e)=>{setempname(e.target.value)}}/>
                    </div>}
                    {category1 && 
                    <div className="form-group">
                        <label  className='label'><b>Regional Office*</b></label>
                        <select id="category1" className="input1" required value={office} onChange={(e)=>{setoffice(e.target.value)}}>
                        <option value="">Please select a Name of RO/SRO</option>
                        <option>(Human Resources Development ) Delhi</option>
                        <option>CIT (Investigation)</option>
                        <option>CIT (ITA)</option>
                        <option>DGIT(Systems) CPC, E-filing</option>
                        <option>DGIT (Vigilance)</option>
                        <option>Exemptions</option>
                        <option>Joint Secretary (FT &amp; TR)-I,Delhi</option>
                        <option>JS (Admin.)</option>
                        <option>JS (Tax Policy and Litigation)</option>
                        <option>L&amp;R</option>
                        <option>NADT, Nagpur</option>
                        <option>National Faceless Appellate centre(NFAC)</option>
                        <option>National Faceless Assessment Center (NaFAC)</option>
                        <option>Others </option>
                        <option>Pr DGIT (Admn &amp; TPS)</option>
                        <option>Pr. CCA Delhi</option>
                        <option>Pr. CCIT (International Taxation)</option>
                        <option>Region Andhra Pradesh &amp; Telangana</option>
                        <option>Region Bihar &amp; Jharkhand</option>
                        <option>Region Delhi</option>
                        <option>Region Gujarat</option>
                        <option>Region Karnataka &amp; Goa</option>
                        <option>Region Kerala</option>
                        <option>Region MP &amp; Chhattisgarh</option>
                        <option>Region Mumbai</option>
                        <option>Region Nagpur</option>
                        <option>Region North East</option>
                        <option>Region NWR</option>
                        <option>Region Odisha</option>
                        <option>Region Pune</option>
                        <option>Region Rajasthan</option>
                        <option>Region Tamil Nadu and Puducherry</option>
                        <option>Region UP (East)</option>
                        <option>Region UP (West) &amp; Uttarakhand</option>
                        <option>Region West Bengal &amp; Sikkim</option>
                        </select>
                    </div>}
                    {category1 &&
                    <div className="form-group">
                        <label htmlFor='textgrievance' className='label'><b>Text of Grievance*</b></label>
                        <textarea
                            autoComplete="off"
                            className="input1 "
                            cols="50"
                            id="Remarks"
                            maxLength="2000"
                            name="Remarks"
                            placeholder="Please Enter Text of Grievance (Remarks)"
                            required="required"
                            rows="5"
                            value={grievance}
                            onChange={(e)=>{setgrievance(e.target.value)}}
                            ></textarea>
                    </div>}
                    {category1 && 
                    <div>
                        <label htmlFor='fileupload' className='label'><b>Attach relevant/supporting documents(if any)</b></label>
                        <input style={{marginTop:'12px',marginBottom:'26px',marginLeft:'18px'}} type='file' id='fileupload'  onChange={handleFile}/>
                    </div>}
                    {category1 &&
                    <div className='sbutton'>
                        <Button type='submit' variant="contained" sx={{backgroundColor:'green'}} color='secondary'>Submit</Button>
                    </div>}
                </form>
            </div>
        </div>
    );
}
