import React,{useState,useEffect} from 'react'
import '../../Assets/Css/Dashboard.css'
import SwipeRightIcon from '@mui/icons-material/SwipeRight';
import PendingActionsIcon from '@mui/icons-material/PendingActions';
import CheckCircleOutlineIcon from '@mui/icons-material/CheckCircleOutline';
import CancelIcon from '@mui/icons-material/Cancel';
import 'boxicons/css/boxicons.min.css';
import AdminTable from './AdminTable'
import axios from 'axios';

export default function AdminDetails({handleComplaintDetails}) {
    const [grievanceCounts, setGrievanceCounts] = useState('');
    useEffect(() => {
        const fetchData = async () => {
          try {
            const response = await axios.get(`http://localhost:5000/grievance/countcomplaint`);
            setGrievanceCounts(response.data);
          } catch (error) {
            console.error('Error fetching grievance counts:', error);
          }
        };
    
        fetchData();
      },[]);

    return (
        <>
            <div className="home-content">
                <div className="overview-boxes">
                    <div className="box" style={{cursor: 'pointer'}}>
                    <div className="right-side">
                        <div className="box-topic" >Total Grievances Submitted</div>
                        <div className="number">{grievanceCounts.submitted}</div>
                        <div className="indicator"></div>
                    </div>
                    <SwipeRightIcon sx={{height:"2em", width:'2.3em',marginBottom:'1em'}}/>
                    </div>
                    <div className="box" style={{backgroundColor:'#e36666',cursor: 'pointer'}}>
                    <div className="right-side">
                        <div className="box-topic">Total Grievances Rejected</div>
                        <div className="number">{grievanceCounts.rejected}</div>
                        <div className="indicator">
                        </div>
                    </div>
                    <CancelIcon sx={{height:"2em", width:'2.3em',marginBottom:'1em'}}/>
                    </div>
                    <div className="box" style={{backgroundColor:'orange',cursor: 'pointer'}}>
                    <div className="right-side">
                        <div className="box-topic">No of Grievances In Progress</div>
                        <div className="number">{grievanceCounts.inprogress}</div>
                        <div className="indicator">
                        </div>
                    </div>
                    <PendingActionsIcon sx={{height:"2em", width:'2.3em',marginBottom:'1em'}}/>
                    </div>
                    <div className="box" style={{backgroundColor:'rgb(87, 200, 102)',cursor: 'pointer'}}>
                    <div className="right-side">
                        <div className="box-topic">No of Grievances Solved</div>
                        <div className="number">{grievanceCounts.solved}</div>
                        <div className="indicator">
                        </div>
                    </div>
                    <CheckCircleOutlineIcon sx={{height:"2em", width:'2.3em',marginBottom:'1em'}}/>
                    </div>
                </div>


                <AdminTable handleComplaintDetails={handleComplaintDetails} />
            </div>
        </>
    )
}
