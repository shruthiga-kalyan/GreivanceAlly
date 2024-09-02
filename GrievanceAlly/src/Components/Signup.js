import React, { useState } from 'react';
import '../Assets/Css/Signup.css';
import { useNavigate } from 'react-router-dom';
import { Button, TextField ,Typography} from "@mui/material";
import Navbar from './Navbar';
import axios from 'axios';
import { useAuth } from '../AuthContext';
import { Captcha } from './Captcha';

const Signup = () => {
  const stateNamesArray = [
    "Andhra Pradesh",
    "Arunachal Pradesh",
    "Assam",
    "Bihar",
    "Chhattisgarh",
    "Goa",
    "Gujarat",
    "Haryana",
    "Himachal Pradesh",
    "Jharkhand",
    "Karnataka",
    "Kerala",
    "Madhya Pradesh",
    "Maharashtra",
    "Manipur",
    "Meghalaya",
    "Mizoram",
    "Nagaland",
    "Odisha",
    "Punjab",
    "Rajasthan",
    "Sikkim",
    "Tamil Nadu",
    "Telangana",
    "Tripura",
    "Uttar Pradesh",
    "Uttarakhand",
    "West Bengal"
  ];
    const navigate = useNavigate();
    const{login} = useAuth();
    const [formData, setFormData] = useState({
        name: '',
        address: '',
        locality: '',
        pincode: '',
        mobileNumber: '',
        email: '',
        gender: '',
        country: '',
        district: '',
        state: '',
        captcha: '',
        password: '',
        cpassword: ''
    });
    const [cap,setcap]=useState('');
    const handleInputChange = (e) => {
        setFormData({ ...formData, [e.target.id]: e.target.value });
        console.log("triggered");
    };
    const handlecap=(caption)=>{
      setcap(caption)
    }

    const handleSubmit = async(e) => {
        // console.log('Form submitted with data:', formData);
        e.preventDefault();
        try{
          const emailResponse = await axios.get(`http://localhost:3001/users?email=${formData.email}`);
          if(emailResponse.data.length > 0){
            alert("Email Already Exist");
            return;
          }
          const mobResponse = await axios.get(`http://localhost:3001/users?mobileNumber=${formData.mobileNumber}`);
          if (mobResponse.data.length > 0) {
            alert("Mobile number already registered");
            return;
          }
          if (formData.password !== formData.cpassword) {
            alert("Confirm Password doesn't match");
            return;
          }
          else{
            const registerResponse = await axios.post(`http://localhost:3001/users`,{
              name: formData.name,
              address:formData.address,
              locality:formData.locality,
              pincode:formData.pincode,
              mobileNumber:formData.mobileNumber,
              email:formData.email,
              gender:formData.gender,
              country:formData.country,
              district:formData.district,
              state:formData.state,
              password:formData.password,
              cpassword:formData.cpassword
            });
            const userResponse = await axios.get(`http://localhost:3001/users?email=${formData.email}`);
            const users = userResponse.data;    
            const user = users[0];
            const userData = {
              id: user.id,
              name: user.name,
              address:user.address,
              locality:user.locality,
              mobile:user.mobileNumber,
              district:user.district,
              gender:user.gender,
              pincode:user.pincode,
              country:user.country,
              state:user.state,
              email: user.email,
              password: user.password,
            };
            
            await axios.post('http://localhost:5000/pushcredentials', userData);
            login(userData);
            console.log(userData);
            alert("Registered successfully");
            navigate("/dash");
            console.log(registerResponse);
          }
        }
        catch (error) {
          console.log(error);
        }
    };

  return (
    <>
    <div className='main1'>
    <Navbar/>
    <div className="card1">
      <h2 style={{ textAlign: 'center',marginBottom:'1%',fontFamily:'Arial, sans-serif',fontSize:'23px'}}><b>REGISTER YOUR ACCOUNT</b></h2>

      <form onSubmit={handleSubmit} className="form1">

        <div className="columns-container1">
          <div className="column1">
            <TextField sx={{ width: '150%' }} required fullWidth id="name" className="input1" label="Name" value={formData.name} type='text' onChange={handleInputChange} size='small' />
            <TextField sx={{ width: '150%' }} required fullWidth id="address" className="input1" label="Address" type='text' onChange={handleInputChange} size='small' />
            <TextField sx={{ width: '150%' }} required fullWidth id="locality" className="input1" label="Locality" type='text' onChange={handleInputChange} size='small' />
            <TextField sx={{ width: '150%' }} required fullWidth id="pincode" className="input1" label="PinCode" type='number' onChange={handleInputChange} size='small' />
            <TextField sx={{ width: '150%' }} required fullWidth id="mobileNumber" label="Mobile" className="input1" type='number' onChange={handleInputChange} size='small' />
            <TextField sx={{ width: '150%' }} required fullWidth id="email" className="input1" label="Email" type='email' onChange={handleInputChange} size='small' />
          </div>

          <div className="column2" >
            <select
              id="gender"
              onChange={handleInputChange}
              className="input1"
              required
              style={{padding:'8px',width:'150%'}}
              >
              <option value=""> -- Select Gender --</option>
              <option value="Male">Male</option>
              <option value="Female">Female</option>
              <option value="Other">Other</option>
            </select>
            <TextField sx={{ width: '150%' }} required fullWidth id="country" className="input1" label="Country" type='text' onChange={handleInputChange} size='small' />
            <TextField sx={{ width: '150%' }} required fullWidth id="district" className="input1" label="District" type='text' onChange={handleInputChange} size='small' />            
            <select
              id="state"
              onChange={handleInputChange}
              className="input1"
              required
              style={{padding:'8px',width:'150%'}}
              >
              <option value="">Select State</option>
              {stateNamesArray.map((state, index) => (
              <option key={index} value={state}>{state}</option>
            ))}
            </select>
            <TextField sx={{ width: '150%' }} required fullWidth id="password" className="input1" label="Password" type='password' onChange={handleInputChange} size='small' />
            <TextField sx={{ width: '150%' }} required fullWidth id="cpassword" className="input1" label="Confirm Password" type='password' onChange={handleInputChange} size='small' />
          </div>
        </div>
        <Captcha/>
        <div style={{ marginLeft: '38%',marginTop:'2.8%'}}>
            <Typography   variant="body1" component="span" style={{marginLeft:'-7%'}}>
                Already have an Account?{" "}
                <span className="hi1" onClick={() => {navigate("/login");}}>
                Sign In
                </span>
           </Typography>
          <Button type="submit" sx={{backgroundColor:'rgb(55, 85, 167)',width:'48%',marginTop:'2%'}}className="button1" variant="contained" color="secondary">
            Sign Up
          </Button>
        </div>
        

      </form>
    </div>
    </div>
    </>
  );
};

export default Signup;
