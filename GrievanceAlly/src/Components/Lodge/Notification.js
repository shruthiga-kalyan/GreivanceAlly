import React from 'react'
import { useState,useEffect } from 'react'
import NotificationsActiveIcon from '@mui/icons-material/NotificationsActive';
import { useAuth } from '../../AuthContext';
import { Button } from '@mui/material';
import axios from 'axios';

export default function Notification({handleBackClick}) {
    const[notification,setnotification] = useState([]);
    const{user} = useAuth();
    const[targetId] = useState(user.id);
    useEffect(() => {
        const fetchData = async () => {
          try {
            const response = await axios.get(`http://localhost:5000/notification/data/${targetId}`);
            console.log(response.data);
            setnotification(response.data);
          } catch (error) {
            console.error('Error fetching grievance data:', error);
          }
        };
    
        fetchData();
      }, [targetId]);

    return (
        <div style={{ margin: '20px auto',padding:'40px', border: '4px solid #ddd', borderRadius: '8px', width: '92%' }}>
            <div style={{display:'flex',justifyContent:'space-between',alignItems:'center',marginBottom:'20px'}}>
                <p style={{fontSize:'22px'}}><b>Notifications</b></p>
                <Button sx={{backgroundColor:'rgb(226, 62, 62)'}}variant="contained" color='secondary' onClick={()=>{handleBackClick()}}>Back</Button>
            </div><br></br>
            <div>
                {notification.map((notify) => (
                    <div key={notify._id}>
                        <p><NotificationsActiveIcon />&nbsp;&nbsp;&nbsp; <span dangerouslySetInnerHTML={{ __html: notify.notification }}></span></p>
                        <br></br><br></br>
                    </div>
                ))}
            </div>

        </div>
    )
}
