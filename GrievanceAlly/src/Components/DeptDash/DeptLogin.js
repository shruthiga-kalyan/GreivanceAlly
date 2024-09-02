import React, { useState } from 'react';
import '../../Assets/Css/Login.css';
import { useNavigate } from 'react-router-dom';
import { Button, TextField,Typography } from "@mui/material";
import Navbar from '../Navbar';
import axios from 'axios';
import { useAuth } from '../../AuthContext';

const DeptLogin = () => {
  const{deptlogin,dept} = useAuth();
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    id: '',
    name: '',
    password: '',
  });

  const handleInputChange = (e) => {
    setFormData({ ...formData, [e.target.id]: e.target.value });
    console.log("triggered");
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
  
    try {
        const adminResponse = await axios.get(`http://localhost:3001/department?id=${formData.id}&name=${formData.name}&password=${formData.password}`);
        const admins = adminResponse.data;
        const admin = admins[0];
        if (adminResponse.data.length > 0) {
            const adminData = {
                id: admin.id,
                name: admin.name,
                password:admin.password,
                email:admin.email,
                officer:admin.officer,
                contact:admin.contact

            }
            console.log(adminData)
            deptlogin(adminData);
            alert("Logged in Successfully");
            navigate("/deptdash");
        } else {
          alert("Invalid Credentials");
        }
      }
      catch (error) {
      console.error('Error fetching user data:', error.message);
    }
  };
  

  return (
    <>
    <div className='main'>
    <Navbar/>
    <div className="card">
      <h2 style={{ fontSize:'23px',textAlign: 'center',marginTop:'-3%',fontFamily:'Arial, sans-serif'}}><b>DEPARTMENT LOGIN</b></h2>

      <form onSubmit={handleSubmit} className='form'>

        <div className="columns-container">
          <div className="column">
            <TextField sx={{ width: '100%' }} required fullWidth id="id" className="input" label="Department ID" type='text' onChange={handleInputChange} size='small' />
            <TextField sx={{ width: '100%' }} required fullWidth id="name" label="Department Name" className="input" type='text' onChange={handleInputChange} size='small' />
            <TextField sx={{ width: '100%' }} required fullWidth id="password" className="input" label="Password" type='password' onChange={handleInputChange} size='small' />
            <Typography  component="span" >
              User/Admin?{" "}
              <span className="hi" onClick={() => navigate("/login")}>
                Login
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

export default DeptLogin;
