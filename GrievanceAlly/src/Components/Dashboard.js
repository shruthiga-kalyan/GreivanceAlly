import React, { useState ,useEffect} from 'react';
import '../Assets/Css/Dashboard.css'
import 'boxicons/css/boxicons.min.css';
import Financial from '../Components/Departments/Financial/Financial'
import { useAuth } from '../AuthContext';
import { useNavigate } from 'react-router-dom';
import Userdetails from './Userdetails';
import Financialdetails from './Departments/Financial/Financialdetails';
import TermsConditions from './Lodge/TermsConditions';
import Rerouting from './Lodge/Rerouting';
import Notification from './Lodge/Notification';
import grievlogo from '../Assets/img/grievlogo.png'
import Feedback from './Lodge/Feedback';

function Dashboard() {
    const [selectedComplaintNo, setSelectedComplaintNo] = useState('');
    const [selectedMenuItem, setSelectedMenuItem] = useState('userdetails');
    const [selectedLanguage, setSelectedLanguage] = useState('en');
    const{user,logout} = useAuth();
    const navigate = useNavigate();
    const [isSidebarActive, setIsSidebarActive] = useState(false);
    const handleLogout = () => {
        logout();
        navigate("/");
    }
    const toggleSidebar = () => {
    setIsSidebarActive(!isSidebarActive);
    };
    const userName = user?.name || "Guest";
    const renderSelectedComponent = () => {
        switch (selectedMenuItem) {
            case 'userdetails':
                return <Userdetails handleComplaintDetails={handleComplaintDetails} selectedLanguage={selectedLanguage}/>;
            case 'feed':
                return <Feedback handleBackClick={handleBackClick}/>;
            case 'financial':
                return <Financial handleBackClick={handleBackClick}/>;
            case 'financialdetails':
                return <Financialdetails complaintNo = {selectedComplaintNo} onBackClick={handleBackClick} prebool={"false"} handlefeed={handlefeed}/>
            case 'terms':
                return <TermsConditions handleBackClick={handleBackClick} handletolodge={handletolodge}/>
            case 'viewstatus':
                return <Rerouting  handleLodgeDept={handleLodgeDept} handleBackClick={handleBackClick}/>
            case 'notify':
                return <Notification handleBackClick={handleBackClick}/>
            default:
                return <Userdetails handleComplaintDetails={handleComplaintDetails}/>;
        }
    }
    const handlefeed=()=>{
        setSelectedMenuItem('feed')
    }
    const handleLodgeDept=(comno)=>{
        setSelectedComplaintNo(comno);
        setSelectedMenuItem('financialdetails');
    }
    const handletolodge = ()=>{
        setSelectedMenuItem('financial');
        console.log(selectedLanguage);
    }

    const handleBackClick = ()=>{
        setSelectedMenuItem('userdetails');
        window.location.reload();
    }
    const handleComplaintDetails = (complaintno) => {
        setSelectedComplaintNo(complaintno);
        setSelectedMenuItem('financialdetails');
    };

    useEffect(() => {
      // Load Google Translate API
      const script = document.createElement('script');
      script.src = '/script.js';
      script.async = true;
      document.head.appendChild(script);
  
      // Initialize Google Translate Element
      window.googleTranslateElementInit = () => {
        // Display the Google Translate dropdown
        new window.google.translate.TranslateElement({ pageLanguage: 'en' }, 'google_translate_element');
  
        // Set a timeout to ensure the translation dropdown is rendered
        setTimeout(() => {
          // Get the translation dropdown
          const translateDropdown = document.querySelector('.goog-te-combo');
  
          if (translateDropdown) {
            // Listen for changes in the translation dropdown
            translateDropdown.addEventListener('change', () => {
              setSelectedLanguage(translateDropdown.value);
            });
          }
        }, 1000); // Adjust the timeout duration if needed
      };
  
      return () => {
        document.head.removeChild(script);
        delete window.googleTranslateElementInit;
      };
    }, []);
  
    // Function to change the language programmatically
    const changeLanguage = (languageCode) => {
      const translateDropdown = document.querySelector('.goog-te-combo');
      if (translateDropdown) {
        translateDropdown.value = languageCode;
        translateDropdown.dispatchEvent(new Event('change'));
      }
    };
  
    
    // Rest of your component code...
    

// Rest of your component code...



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
                <a href="#" onClick={() => { setSelectedMenuItem('userdetails') }} className={selectedMenuItem === 'userdetails' ? 'active' : ''}>
                <i className="bx bx-grid-alt"></i>
                <span className="links_name">Dashboard</span>
                </a>
            </li>
            <li>
                <a href="#" onClick={() => { setSelectedMenuItem('terms') }} className={selectedMenuItem === 'terms' ? 'active' : ''}>
                <i className="bx bx-support"></i>
                <span className="links_name"> Lodge Grievance</span>
                </a>
            </li>
            {/* <li>
                <a href="#">
                <i className="bx bx-map-pin"></i>
                <span className="links_name">Disaster Alerting</span>
                </a>
            </li> */}
            <li>
                <a href="#"  onClick={() => { setSelectedMenuItem('viewstatus') }} className={selectedMenuItem === 'viewstatus' ? 'active' : ''}>
                <i className="bx bx-show"></i>
                <span className="links_name">View Status</span>
                </a>
            </li>
            {/* <li>
                <a href="#">
                <i className="bx bx-chat"></i>
                <span className="links_name">Community Chat</span>
                </a>
            </li> */}
            <li>
                <a href="#" onClick={() => { setSelectedMenuItem('notify') }} className={selectedMenuItem === 'notify' ? 'active' : ''}>
                <i className="bx bx-bell"></i>
                <span className="links_name">Notifications</span>
                </a>
            </li>
            <li className="log_out">
                <a href="" onClick={handleLogout}>
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

                <div id="google_translate_element" style={{ marginRight: '15%', marginTop: '1%' }}></div>

                <div className="profile-details" style={{ cursor: 'pointer', marginLeft: '-20%' }}>
                    <span className="admin_name">{userName}</span>
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

export default Dashboard;
