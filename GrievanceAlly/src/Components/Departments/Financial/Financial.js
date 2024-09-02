import React, { useState } from 'react';
import { Button, TextField } from '@mui/material';
import axios from 'axios'
import { useAuth } from '../../../AuthContext';
import './Financial.css'
import { suggestDepartments } from '../../Lodge/Suggest';
import 'boxicons/css/boxicons.min.css';

export default function Financial({handleBackClick}) {
    const{user} = useAuth();
    const[name,setname] = useState(user.name);
    const[gender,setgender] = useState(user.gender);
    const[country,setcountry]=useState(user.country);
    const[state,setstate] = useState(user.state);
    const[district,setdistrict] = useState(user.district);
    const[address,setaddress]=useState(user.address);
    const[locality,setlocality]=useState(user.locality);
    const[pincode,setpincode]=useState(user.pincode);
    const[email,setemail]=useState(user.email);
    const[mobile,setmobile]=useState(user.mobile);
    const[minstate,setminstate]=useState('');
    const[department,setdepartment]=useState('');
    const[grievance,setgrievance]=useState('');
    const[refno,setrefno]=useState('');
    const[refdate,setrefdate]=useState('');
    const[fileupload,setfileupload]=useState();
    const[notify] = useState('Notifications');
    const [departments, setDepartments] = useState([]);

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
            name,
            gender,
            country,
            state,
            district,
            address,
            locality,
            pincode,
            email,
            mobile,
            minstate,
            department,
            complaintNo: CNo,
            priority:"",
            grievance,
            refno,
            refdate,
            fileUpload: fileupload ? await convertFileToBase64(fileupload) : '',
        };
    
        try {
            const response = await axios.post('http://localhost:5000/submit', formData);
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
    const handleSuggest=async()=>{
        try {
           
            const suggestedDepartments = await suggestDepartments(grievance);
    
            // Update the state with the suggested departments
            setDepartments(suggestedDepartments);
    
        } catch (error) {
            console.error('Error suggesting departments:', error);
        }
    }
    const allDepartments = [
        "Agriculture and Farmers Welfare",
        "Agriculture Research and Education",
        "Animal Husbandry, Dairying",
        "Atomic Energy",
        "Ayush",
        "Bio Technology",
        "Central Board of Direct Taxes(Income Tax)",
        "Central Board of Excise and Customs",
        "Chemicals and Petrochemicals",
        "Civil Aviation",
        "Coal",
        "Commerce",
        "Consumer Affairs",
        "Cooperation",
        "Corporate Affairs",
        "Culture",
        "Defence",
        "Defence Finance",
        "Defence Production",
        "Defence Research and Development",
        "Development of North Eastern Region",
        "Drinking Water and Sanitation",
        "Earth Sciences",
        "Economic Affairs",
        "Electronics & Information Technology",
        "Empowerment of Persons with Disabilities",
        "Environment, Forest and Climate Change",
        "Ex Servicemen Welfare",
        "Expenditure",
        "External Affairs",
        "Fertilizers",
        "Financial Services",
        "Financial Services(Banking Division)",
        "Financial Services(Insurance Division)",
        "Fisheries",
        "Food and Public Distribution",
        "Food Processing Industries",
        "Health & Family Welfare",
        "Health Research",
        "Heavy Industry",
        "Higher Education",
        "Home Affairs",
        "House and Urban Affairs",
        "Information and Broadcasting",
        "Investment & Public Asset Management",
        "Justice",
        "Labour and Employment",
        "Land Resources",
        "Legal Affairs",
        "Legislative Department",
        "Micro Small and Medium Enterprises",
        "Military Affairs",
        "Mines",
        "Minority Affairs",
        "New and Renewable Energy",
        "NITI Aayog",
        "O/o the Comptroller & Auditor General of India",
        "Official Language",
        "Panchayati Raj",
        "Parliamentary Affairs",
        "Personnel and Training",
        "Petroleum and Natural Gas",
        "Pharmaceutical",
        "Posts",
        "Power",
        "Promotion of Industry and Internal Trade",
        "Public Enterprises",
        "Railways, Railway Board",
        "Revenue",
        "Road Transport and Highways",
        "Rural Development",
        "School Education and Literacy",
        "Science and Technology",
        "Scientific & Industrial Research",
        "Shipping",
        "Skill Development and Entrepreneurship",
        "Social Justice and Empowerment",
        "Space",
        "Sports",
        "Staff Selection Commission",
        "Statistics and Programme Implementation",
        "Steel",
        "Telecommunication",
        "Textiles",
        "Tourism",
        "Tribal Affairs",
        "Unique Identification Authority of India",
        "Water Resources, River Development & Ganga Rejuvenation",
        "Women and Child Development",
        "Youth Affairs",
        "Administrative Reforms and Public Grievances",
        "State Governments/Others"
    ];
    
    return (
        <div className="department-container">
            <div className="header-container">
                <p style={{fontSize:'22px'}}><b>Grievance Registration Form</b></p>
                <Button sx={{backgroundColor:'rgb(226, 62, 62)'}}variant="contained" color='secondary' onClick={()=>{handleBackClick()}}>Back</Button>
            </div>
            <div className="form-container">
                <form onSubmit={handleSubmit}>
                    <fieldset>
                        <legend><b>Personal and Communication Details:</b></legend><br></br>
                        <div className='form-group'>
                            <label  className='label'><b>Name*</b></label>
                            <TextField  required id="department" sx={{marginTop:'18px'}}className="input1" value={name} type='text' size='small'  onChange={(e)=>{setname(e.target.value)}}/>
                        </div>
                        <div className='form-group'>
                            <label  className='label'><b>Gender*</b></label>
                            <select id="gender" value={gender} onChange={(e)=>{setgender(e.target.value)}} className="input1" required style={{padding:'8px'}}>
                                <option value="Male">Male</option>
                                <option value="Female">Female</option>
                                <option value="Other">Other</option>
                            </select>
                        </div>
                        <div className='form-group'>
                            <label  className='label'><b>Country*</b></label>
                            <TextField  required className="input1" value={country} type='text' size='small'  onChange={(e)=>{setcountry(e.target.value)}}/>
                        </div>
                        <div className='form-group'>
                            <label  className='label'><b>State*</b></label>
                            <TextField  required  className="input1" value={state} type='text' size='small'  onChange={(e)=>{setstate(e.target.value)}}/>
                        </div>
                        <div className='form-group'>
                            <label  className='label'><b>District*</b></label>
                            <TextField  required  className="input1" value={district} type='text' size='small'  onChange={(e)=>{setdistrict(e.target.value)}}/>
                        </div>
                        <div className='form-group'>
                            <label  className='label'><b>Address*</b></label>
                            <TextField  required  className="input1" value={address} type='text' size='small'  onChange={(e)=>{setaddress(e.target.value)}}/>
                        </div>
                        <div className='form-group'>
                            <label  className='label'><b>Locality*</b></label>
                            <TextField  required  className="input1" value={locality} type='text' size='small'  onChange={(e)=>{setlocality(e.target.value)}}/>
                        </div>
                        <div className='form-group'>
                            <label  className='label'><b>Pincode*</b></label>
                            <TextField  required  className="input1" value={pincode} type='number' size='small'  onChange={(e)=>{setpincode(e.target.value)}}/>
                        </div>
                        <div className='form-group'>
                            <label  className='label'><b>Email ID*</b></label>
                            <TextField  required  className="input1" value={email} type='email' size='small'  onChange={(e)=>{setemail(e.target.value)}}/>
                        </div>
                        <div className='form-group'>
                            <label  className='label'><b>Mobile Number*</b></label>
                            <TextField  required  className="input1" value={mobile} type='number' size='small'  onChange={(e)=>{setmobile(e.target.value)}}/>
                        </div>
                    </fieldset><br></br><br></br>
                    <fieldset>
                        <legend><b>Grievance Details:</b></legend><br></br>
                        <div className="form-group">
                            <label  className='label'><b>Ministry/State Government*</b></label>
                            <select  className="input1" required value={minstate}  onChange={(e)=>{setminstate(e.target.value)}}>
                                <option value="">Select one</option>
                                <option >Andhra Pradesh</option>
                                <option >Arunachal Pradesh</option>
                                <option >Assam</option>
                                <option >Bihar</option>
                                <option >Chattisgarh</option>
                                <option >Goa</option>
                                <option >Gujarat</option>
                                <option >Haryana</option>
                                <option >Himachal Pradesh</option>
                                <option >Jharkhand</option>
                                <option >Karnataka</option>
                                <option >Manipur</option>
                                <option >Meghalaya</option>
                                <option >Mizoram</option>
                                <option >Nagaland</option>
                                <option >NCT of Delhi</option>
                                <option >Odisha</option>
                                <option >Punjab</option>
                                <option >Sikkim</option>
                                <option >Tamil Nadu</option>
                                <option >Telangana</option>
                                <option >Union Territory of Andaman & Nicobar</option>
                                <option >Union Territory of Chattisgarh</option>
                                <option >Union Territory of Dadra & Nagar Haveli</option>
                                <option >Union Territory of Dadra & Diu</option>
                                <option >Union Territory of Jammu and Kashmir</option>
                                <option >Union Territory of Ladakh</option>
                                <option >Union Territory of Lakshadweep</option>
                                <option >Union Territory of Puducherry</option>
                                <option >Uttar Pradesh</option>
                                <option >Uttarkhand</option>
                                <option >West Bengal</option>
                            </select>
                        </div>
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
                                ></textarea>&nbsp;&nbsp;&nbsp;
                                <Button variant='contained' onClick={handleSuggest}>Suggest Ministries</Button>
                        </div>
                        {departments.length > 0 && (
                        <div className="form-group">
                            <label htmlFor='suggestedDepartments' className='label'><b>Suggested Ministries:</b></label>
                                <div>
                                <ul>
                                    {departments.map((department, index) => (
                                    <li key={index}>
                                        {department}
                                    </li>
                                    ))}
                                </ul>
                                </div>
                        </div>
                            )}
                        <div className="form-group">
                            <label  className='label'><b>Ministry*</b></label>
                            <select  className="input1" required value={department}  onChange={(e)=>{setdepartment(e.target.value)}}>
                                <option value="">Select Ministry</option>
                                {allDepartments.map((department, index) => (
                                <option key={index} value={department}>{department}</option>
                                ))}
                            </select>
                        </div>
                        <div className='form-group'>
                            <label  className='label'><b>Reference Number(if any)</b></label>
                            <TextField className="input1" value={refno} type='number' size='small'  onChange={(e)=>{setrefno(e.target.value)}}/>
                        </div>
                        <div className='form-group'>
                                <label  className='label'><b>Reference Date</b></label>
                            <TextField  className="input1" value={refdate} type='date' size='small'  onChange={(e)=>{setrefdate(e.target.value)}}/>
                        </div>
                        <div>
                            <label htmlFor='fileupload' className='label'><b>Attach relevant/supporting documents(if any)</b></label>
                            <input style={{marginTop:'12px',marginBottom:'26px',marginLeft:'18px'}} type='file' id='fileupload'  onChange={handleFile}/>
                        </div>
                        <div className='sbutton'>
                            <Button type='submit' variant="contained" sx={{backgroundColor:'green'}} color='secondary'>Submit</Button>
                        </div>

                    </fieldset>
                </form>
            </div>
        </div>
    );
}
