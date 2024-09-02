import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Button, TextField, Typography } from "@mui/material";
import Navbar from './Navbar';
import axios from 'axios';
import { useAuth } from '../AuthContext';


const Login = () => {
  const{adlogin,login} = useAuth();
  const[otpbool,setotpbool]=useState(false);
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    email: '',
    mobileNumber: '',
    password: '',
    aadhar:'',
    otp: ''
  });
  const handleInputChange = (e) => {
    setFormData({ ...formData, [e.target.id]: e.target.value });
    console.log("triggered");
  };
  // const handleotp=async()=>{
  //   if(formData.aadhar===''){
  //     alert("Enter Aadhar Number to get otp")
  //   }
  //   else{
  //     setotpbool(true);
  //     const response = await axios.get(`http://localhost:3001/aadhar?number=${formData.aadhar}`);
  //     const temp = response.data[0].phone;

      
  //   }
  // }

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      if (formData.email === 'admin@gmail.com') {
        const adminResponse = await axios.get(`http://localhost:3001/admin?email=${formData.email}&password=${formData.password}&mobileNumber=${formData.mobileNumber}`);
        const admins = adminResponse.data;
        const admin = admins[0];
        if (adminResponse.data.length > 0) {
          const adminData = {
            id: admin.id,
            name: admin.name,
            email:admin.email,
            password:admin.password
          }
          adlogin(adminData);
          alert("Logged in Successfully");
          navigate("/admindash");
        } else {
          alert("Invalid Password or Mobile Number");
        }
      } else {
        const userResponse = await axios.get(`http://localhost:3001/users?email=${formData.email}`);
        const users = userResponse.data;
  
        if (users.length > 0) {
          const user = users[0];
          if (user.mobileNumber === formData.mobileNumber) {
            if (user.password === formData.password) {
              const userData = {
                id: user.id,
                name: user.name,
                address:user.address,
                pincode:user.pincode,
                district:user.district,
                locality:user.locality,
                mobile:user.mobileNumber,
                gender:user.gender,
                country:user.country,
                state:user.state,
                email: user.email,
                password: user.password,
              };
              console.log(userData);
              login(userData);
              alert("Logged in Successfully");
              navigate("/dash");
            } else {
              alert("Invalid Password");
            }
          } else {
            alert("Mobile Number doesn't match");
          }
        } else {
          alert("Email doesn't exist. Create an account");
          navigate('/signup');
        }
      }
    } catch (error) {
      console.error('Error fetching user data:', error.message);
    }
  };
  

  return (
    <>
    <div className='main'>
    <Navbar/>
    <div className="card">
      <h2 style={{ fontSize:'23px',textAlign: 'center',marginTop:'-3%',fontFamily:'Arial, sans-serif'}}><b>ADMIN/USER LOGIN</b></h2>

      <form onSubmit={handleSubmit} className='form'>

        <div className="columns-container">
          <div className="column">
            <TextField sx={{ width: '100%' }} required fullWidth id="email" className="input" label="Email" type='email' onChange={handleInputChange} size='small' />
            <TextField sx={{ width: '100%' }} required fullWidth id="mobileNumber" label="Mobile" className="input" type='number' onChange={handleInputChange} size='small' />
            <TextField sx={{ width: '100%' }} required fullWidth id="password" className="input" label="Password" type='password' onChange={handleInputChange} size='small' />
            {/* <TextField sx={{ width: '80%' }} required fullWidth id="aadhar" className="input" label="Aadhar Number" type='number' onChange={handleInputChange} size='small' />
            <Button variant='contained' color='secondary' size='small' sx={{width:'20%',marginLeft:'82%',marginTop:'-12%'}} onClick={handleotp}>Get OTP</Button>
            {otpbool && <><TextField sx={{ width: '80%' }} required fullWidth id="otp" className="input" label="Enter your OTP" type='number' onChange={handleInputChange} size='small' />
            <Button variant='contained' color='secondary' size='small' sx={{width:'20%',marginLeft:'82%',marginTop:'-12%'}}>Submit</Button></>} */}
            <Typography  component="span" >
              Not registered yet?{" "}
              <span className="hi" onClick={() => navigate("/signup")}>
                Create an Account
              </span>
            </Typography>
          <div style={{marginLeft:'25%'}}>
            <Button type="submit" sx={{backgroundColor:'rgb(55, 85, 167)',width:'60%'}}className="but" variant="contained" color="secondary">
              Sign In
            </Button>
          </div>
          </div>
        </div>
      </form>
    </div>
    {/* <div style={{height:'50%'}}></div> */}
    </div>
    </>
  );
};

export default Login;