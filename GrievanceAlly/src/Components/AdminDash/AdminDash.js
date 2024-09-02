import React, { useState ,useEffect} from 'react';
import '../../Assets/Css/Dashboard.css';
import 'boxicons/css/boxicons.min.css';
import AdTableDetails from './AdTableDetails'
import { useAuth } from '../../AuthContext';
import { useNavigate } from 'react-router-dom';
import AdminDetails from './AdminDetails';
import Financialdetails from '../Departments/Financial/Financialdetails';
import grievlogo from '../../Assets/img/grievlogo.png'
import Analytics from './Analytics';

function AdminDash() {
    const [selectedComplaintNo, setSelectedComplaintNo] = useState('');
    const [selectedMenuItem, setSelectedMenuItem] = useState('userdetails');
    const{admin,adlogout} = useAuth();
    const navigate = useNavigate();
    const [isSidebarActive, setIsSidebarActive] = useState(false);
    const handleLogout = () => {
        adlogout();
        navigate("/");
    }
    const toggleSidebar = () => {
    setIsSidebarActive(!isSidebarActive);
    };
    const adminName = admin?.name || "Guest";
    const renderSelectedComponent = () => {
        switch (selectedMenuItem) {
            case 'admindetails':
                return <AdminDetails handleComplaintDetails={handleComplaintDetails}/>;
            case 'analytics':
                return <Analytics handleComplaintDetails={handleComplaintDetails}/>;
            case 'grievpending':
                return <AdTableDetails handlePendingDetails={handlePendingDetails} targetstatus = {"InProgress"} handleComplaintDetails={handleComplaintDetails} admindeptpref={"false"}/>
            case 'grievaccepted':
                return <AdTableDetails handlePendingDetails={handlePendingDetails} targetstatus = {"Submitted"} handleComplaintDetails={handleComplaintDetails}  admindeptpref={"false"}/>
            case 'grievsolved':
                return <AdTableDetails handlePendingDetails={handlePendingDetails} targetstatus = {"Solved"} handleComplaintDetails={handleComplaintDetails}  admindeptpref={"false"}/>
            case 'grievrejected':
                return <AdTableDetails handlePendingDetails={handlePendingDetails} targetstatus = {"Rejected"} handleComplaintDetails={handleComplaintDetails}  admindeptpref={"false"}/>
            case 'grievprocessing':
                return <AdTableDetails handlePendingDetails={handlePendingDetails} targetstatus = {"Processing"} handleComplaintDetails={handleComplaintDetails}  admindeptpref={"false"}/>
            case 'financialdetails':
                return <Financialdetails complaintNo = {selectedComplaintNo} onBackClick={handlePendingDetails} prebool={"true"}/>
            default:
                return <AdminDetails handleComplaintDetails={handleComplaintDetails}/>;
        }
    }
    const handlePendingDetails = ()=>{
        setSelectedMenuItem('userdetails');
        window.location.reload();
    }
    const handleComplaintDetails = (complaintno) => {
        setSelectedComplaintNo(complaintno);
        setSelectedMenuItem('financialdetails');
    };
    
    return (
        <div>
        {/* Sidebar */}
        <div className={`sidebar ${isSidebarActive ? 'active' : ''}`}>
            <div className="logo-details">
                <img src={grievlogo} style={{width:'50%',marginLeft:'-13%'}}></img>
                <span className="logo_name notranslate" style={{marginLeft:'-12%'}}>GrievanceAlly</span>
            </div>
            <ul className="nav-links">
            <li>
                <a href="#e" onClick={() => { setSelectedMenuItem('userdetails') }} className={selectedMenuItem === 'userdetails' ? 'active' : ''}>
                <i className="bx bx-grid-alt"></i>
                <span className="links_name">Dashboard</span>
                </a>
            </li>
            <li>
                <a href="#e" onClick={() => { setSelectedMenuItem('analytics') }} className={selectedMenuItem === 'analytics' ? 'active' : ''}>
                <i className='bx bx-bar-chart'></i>
                <span className="links_name">Analytics</span>
                </a>
            </li>
            <li>
                <a href="#e" onClick={() => { setSelectedMenuItem('grievpending') }} className={selectedMenuItem === 'grievpending' ? 'active' : ''}>
                <i className="bx bx-time"></i>
                <span className="links_name">Grievances InProgress</span>
                </a>
            </li>
            <li>
                <a href="#e" onClick={() => { setSelectedMenuItem('grievprocessing') }} className={selectedMenuItem === 'grievprocessing' ? 'active' : ''}>
                <i class="bx bx-loader-circle"></i>
                <span className="links_name">Grievances Processing</span>
                </a>
            </li>
            <li>
                <a href="#e" onClick={() => { setSelectedMenuItem('grievaccepted') }} className={selectedMenuItem === 'grievaccepted' ? 'active' : ''}>
                <i className="bx bx-check"></i>
                <span className="links_name">Grievances Submitted</span>
                </a>
            </li>
            <li>
                <a href="#e" onClick={() => { setSelectedMenuItem('grievsolved') }} className={selectedMenuItem === 'grievsolved' ? 'active' : ''}>
                <i className="bx bx-check-double"></i>
                <span className="links_name">Grievances Solved</span>
                </a>
            </li>
            <li>
                <a href="#e" onClick={() => { setSelectedMenuItem('grievrejected') }} className={selectedMenuItem === 'grievrejected' ? 'active' : ''}>
                <i className="bx bx-x"></i>
                <span className="links_name">Grievances Rejected</span>
                </a>
            </li>
            <li className="log_out">
                <a href="#e" onClick={handleLogout}>
                <i className="bx bx-log-out"></i>
                <span className="links_name">Log out</span>
                </a>
            </li>
            </ul>
        </div>

        {/* Main Content */}
        <section className="home-section">
            {/* Navigation Bar */}
            <nav style={{ cursor: 'pointer' }}>
                <div className="sidebar-button">
                    <i className="bx bx-menu sidebarBtn" onClick={toggleSidebar}></i>
                    <span className="dashboard">Dashboard</span>
                </div>

                <div className="profile-details" style={{ cursor: 'pointer', marginLeft: '-20%' }}>
                    <span className="admin_name">{adminName}</span>
                    <i className="bx bx-chevron-down"></i>
                </div>
            </nav>
            <div >
                {renderSelectedComponent()}
            </div>
            <br></br><br></br>
        </section>
        </div>
    );
}

export default AdminDash;
