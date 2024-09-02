import React, { useState } from 'react';
import { Button, TextField } from '@mui/material';
import axios from 'axios'
import { useAuth } from '../../../AuthContext';
import '../Financial/Financial.css'

export default function Labour({handleBackClick}) {
    const[department]=useState('Labour and Employment');
    const[category,setcategory]=useState('');
    const[category1,setcategory1]=useState('');
    const[ipno,setipno]=useState('');
    const[boname,setboname]=useState('');
    const[roname,setroname]=useState('');
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
            ipno,
            boname,
            roname,
            grievance,
            fileUpload: fileupload ? await convertFileToBase64(fileupload) : '',
        };
    
        try {
            const response = await axios.post('http://localhost:5000/submitlabour', formData);
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
                        <option >Cash Benefit</option>
                        <option >Medical Benefits</option>
                        <option >Medical Reimbursement</option>
                        <option >Non-Coverage , Non-compliance, Under Reporting</option>
                        <option >Online System Related Issues</option>
                        <option >Recruitment</option>
                        <option >Service Matters</option>
                        <option >Suggestions (ESIC)</option>
                        <option >Vigilance related</option>
                        <option >Others (ESIC)</option>
                        <option >Non-Payment of wages Related (Workers getting wages Rs. 24000 or less)</option>
                        <option >Non-payment of gratuity (Employees having rendered 5 years of length of service)</option>
                        <option >Violation of terms of employment (Workman through group of workers or by trade union)</option>
                        <option >Service matter grievances related to O/o CLC (Officers/ staff working under CLC(C).)</option>
                        <option >PF Withdrawal</option>
                        <option >Pension</option>
                        <option >Compliance related Issues</option>
                        <option >Employer's grievance</option>
                        <option >Transfer related issues</option>
                        <option >Online Claim Application</option>
                        <option >National Data Center related issues</option>
                        <option >Cheque Returned / Misplaced</option>
                        <option >HR HQ and HR Field</option>
                        <option >Finance</option>
                        <option >Pension HQ</option>
                        <option >Compliance HQ</option>
                        <option >Exemption</option>
                        <option >Suggestions (EPFO)</option>
                        <option >Grievance not pertains to EPFO</option>
                        <option >Others (EPFO)</option>
                        </select>
                    </div>
                    {category && 
                    <div className="form-group">
                        <label htmlFor='category1' className='label'><b>Select next level category*</b></label>
                        <select id="category1" className="input1" required value={category1} onChange={(e)=>{setcategory1(e.target.value)}}>
                        <option value="">Select next level category</option>
                        <option>Extended Sickness Benefit</option>
                        <option>Enhanced Sickness Benefit</option>
                        </select>
                    </div>}
                    {category1 &&
                    <div className="form-group">
                        <label htmlFor='branch' className='label'><b>I.P No.*</b></label>
                        <TextField required id="branch" sx={{marginTop:'10px'}}className="input1" value={ipno}  type='number' size='small'  onChange={(e)=>{setipno(e.target.value)}}/>
                    </div>}
                    {category1 &&
                    <div className="form-group">
                        <label htmlFor='branch' className='label'><b>Name of B.O*</b></label>
                        <TextField required id="branch" sx={{marginTop:'10px'}}className="input1" value={boname}  type='text' size='small'  onChange={(e)=>{setboname(e.target.value)}}/>
                    </div>}
                    {category1 && 
                    <div className="form-group">
                        <label  className='label'><b>Name of RO/SRO*</b></label>
                        <select id="category1" className="input1" required value={roname} onChange={(e)=>{setroname(e.target.value)}}>
                        <option value="">Please select a Name of RO/SRO</option>
                        <optgroup label="Andra Pradesh">
                        <option>Regional Office Vijaywada</option>
                        <option>Sub Reginal Office Visakhapatnam</option>
                        <option>Sub Regional Office Trupati</option>
                        </optgroup>
                        <optgroup label="Assam">
                        <option >ESIMH Beltola, Guwhati </option>
                        <option >Regional Office Guwahati</option>
                        </optgroup>
                        <optgroup label="Bihar" data-select2-id="622">
                        <option >ESIMH Phulwarishariff </option>
                        <option >Regional Office Bihar</option>
                        </optgroup>
                        <optgroup label="Chhattisgarh">
                        <option >Regional Office Raipur</option>
                        </optgroup>
                        <optgroup label="Delhi">
                        <option > Directorate Medical Delhi</option>
                        <option >ESIC Dental College Rohini</option>
                        <option>ESIMH Basaidarapur </option>
                        <option>ESIMH Jhilmil </option>
                        <option>ESIMH Okhla</option>
                        <option>ESIMH Rohini</option>
                        <option>Regional Office Delhi</option>
                        <option>Sub Regional Office Okhla </option>
                        <option>Sub Regional Office Rohini</option>
                        <option>Sub Regional Office Shahdara</option>
                        </optgroup>
                        <optgroup label="Goa">
                        <option value="ESIGO">Regional Office Panji</option>
                        </optgroup>
                        <optgroup label="Gujarat">
                        <option> Sub Regional Office Surat </option>
                        <option> Sub Regional Office Vadodara </option>
                        <option>ESICMH Ankalshwar </option>
                        <option>ESIMH Bapunagar </option>
                        <option>ESIMH Naroda, Ahmedabad </option>
                        <option>ESIMH Vapi </option>
                        <option>Regional Office Ahmedabad</option>
                        </optgroup>
                        <optgroup label="Haryana">
                        <option> Regional Office Faridabad </option>
                        <option>ESIMH Faridabad</option>
                        <option>ESIMH Gurugram</option>
                        <option>ESIMH Manesar</option>
                        <option>Sub Regional Office Ambala</option>
                        <option>Sub Regional Office Gurugram</option>
                        </optgroup>
                        <optgroup label="Himachal Pradesh">
                        <option>ESIMH Baddi (Himachal Pradesh)</option>
                        <option>Regional Office Baddi</option>
                        </optgroup>
                        <optgroup label="Jharkhand" >
                        <option>ESIMH Adityapur (Jharkhand)</option>
                        <option>ESIMH Namkum ,Ranchi (Jharkhand)</option>
                        <option>Regional Office Ranchi</option>
                        </optgroup>
                        <optgroup label="Karnataka">
                        <option>ESIC Sub Regional Office Gulbarga</option>
                        <option>ESIC Sub Regional Office Mangaluru</option>
                        <option>ESIC Sub Regional Office Mysore</option>
                        <option>Sub Regional Office Hubli</option>
                        <option>Sub Regional Office Peenya</option>
                        </optgroup>
                        <optgroup label="Kerala" >
                        <option>ESIC Sub Regional Office Enakulam</option>
                        <option>Sub Regional Office Kollam</option>
                        <option>Sub Regional Office Kozhikode</option>
                        <option>Sub Regional Office Thiruvananthapuram</option>
                        </optgroup>
                        <optgroup label="Madhya Pradesh" >
                        <option>ESIMH Nanda Nagar, Indore</option>
                        <option>Regional Office Indore</option>
                        <option>Sub Regional Office Bhopal</option>
                        </optgroup>
                        <optgroup label="Maharashtra" >
                        <option>ESIMH Andheri</option>
                        <option>ESIMH Kolhapur</option>
                        <option>Sub Regional Office Nashik</option>
                        <option>Sub Regional Office Pune</option>
                        <option>Sub Regional Office Thane</option>
                        </optgroup>
                        <optgroup label="Odisha">
                        <option>ESIMH Rourkela</option>
                        <option>Regional Office  Bhubaneswar</option>
                        </optgroup>
                        <optgroup label="Puducherry">
                        <option>Regional Office Puducherry</option>
                        </optgroup>
                        <optgroup label="Punjab">
                        <option>ESIMH Ludhiana</option>
                        <option>ESIMH Ram Darbar, Chandigarh</option>
                        <option>Regional Office Chandigarh</option>
                        <option>Sub Regional Office Jalandhar</option>
                        <option>Sub Regional Office Ludhiana</option>
                        </optgroup>
                        <optgroup label="Rajasthan">
                        <option>ESIMH Alwar</option>
                        <option>ESIMH Bhiwadi</option>
                        <option>ESIMH Jaipur</option>
                        <option>Regional Office Jaipur</option>
                        <option>Sub Regional Office Jodhpur</option>
                        <option>Sub Regional Office Udaipur</option>
                        </optgroup>
                        <optgroup label="Tamilnadu">
                        <option>ESIMH K K Nagar</option>
                        <option>ESIMH Tirunelveli</option>
                        <option>Regional Office Chennai</option>
                        <option>Sub Regional Office Coimbatore</option>
                        <option>Sub Regional Office Madurai</option>
                        <option>Sub Regional Office Salem</option>
                        <option>Sub Regional Office Tirunelveli</option>
                        </optgroup>
                        <optgroup label="Telengana">
                        <option>ESIMC &amp; Hospital</option>
                        <option>ESIMH Sanathnagar</option>
                        <option>Regional Office Telangana</option>
                        </optgroup>
                        <optgroup label="Uttar Pradesh">
                        <option>ESIMH Barielly</option>
                        <option>ESIMH Jajmau, Kanpur</option>
                        <option>ESIMH Lucknow</option>
                        <option>ESIMH Noida</option>
                        <option>ESIMH Sahibabad</option>
                        <option>ESIMH Varanasi</option>
                        <option>Regional office Kanpur</option>
                        <option>Sub Regional Office Lucknow</option>
                        <option>Sub Regional Office Noida</option>
                        <option>Sub Regional Office Varanasi</option>
                        </optgroup>
                        <optgroup label="UttraKhand">
                        <option value="ESIUK">Regional Office Dehradun</option>
                        </optgroup>
                        <optgroup label="West Bengal">
                        <option>ESIMH Joka</option>
                        <option>Regional Office Kolkata</option>
                        <option>Sub Regional Office Barrackpore</option>
                        <option>Sub Regional Office Durgapur</option>
                        </optgroup>
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
