import React, { useState } from 'react'
import '../../Assets/Css/Dashboard.css'
import { Button } from '@mui/material'
import axios from 'axios';
import {useAuth} from '../../AuthContext';

export default function Rerouting({handleLodgeDept,handleBackClick}) {
    const[enteredid,setenteredid] = useState('');
    const{user} = useAuth();
    const handleClick= async()=>{
        if(enteredid==='')
            alert("Please enter your Route ID")
        else{
            try {
                const response = await axios.get(`http://localhost:5000/routedetails/${enteredid}/${user.id}`);
                console.log("Response from server:", response.data); 
                if (response.data.length === 0) {
                    alert("Complaint ID not found");
                    return;
                } else {
                    const firstRouteDetails = response.data[0];
                    if (firstRouteDetails && firstRouteDetails.complaintno) {
                        setenteredid('');
                        handleLodgeDept(firstRouteDetails.complaintno);
                    } else {
                        console.error("Invalid route details structure:", firstRouteDetails);
                    }
                }
            } catch (err) {
                console.log(err);
            }

        }
    }
    return (
        <div style={{ margin: '20px auto',padding:'40px', border: '4px solid #ddd', borderRadius: '8px', width: '92%' }}>
            <div style={{display:'flex',justifyContent:'space-between',alignItems:'center',marginBottom:'20px'}}>
                <p style={{fontSize:'22px'}}><b>Track Your Status by entering your Grievance Id</b></p>
                <Button sx={{backgroundColor:'rgb(226, 62, 62)'}}variant="contained" color='secondary' onClick={()=>{handleBackClick()}}>Back</Button>
            </div>
            <div className="search-box" style={{marginTop:'5%',marginBottom:'5%'}}>
                <input type="text" placeholder="Enter Your Grievance ID" value={enteredid} onChange={(e)=>{setenteredid(e.target.value)}} required/>
                <i className="bx bx-search" style={{cursor: 'pointer'}} onClick={handleClick}></i>
            </div>
        </div>
    )
}
