import React ,{useState,useEffect} from 'react'
import { Link, Navigate, useNavigate } from "react-router-dom";
import Slider from 'react-slick';
import 'slick-carousel/slick/slick-theme.css';
import 'slick-carousel/slick/slick.css';
import th from '../Assets/img/th.jpg'
import th1 from '../Assets/img/th1.jpg'
import th2 from '../Assets/img/th2.jpg'
import bank from '../Assets/img/bank.jpg'
import tax from '../Assets/img/tax.jpeg'
import tele from '../Assets/img/tele.jpeg'
import urban from '../Assets/img/urban.jpeg'
import personal from '../Assets/img/personal.jpg'
import health from '../Assets/img/health.jpeg'
import post from '../Assets/img/post.jpeg'
import lodge from '../Assets/img/lodge.png'
import status from '../Assets/img/status.png'
import redres from '../Assets/img/redres.png'
import asses from '../Assets/img/asses.png'
import labour from '../Assets/img/labour.jpg'
import grievlogo from '../Assets/img/grievlogo.png'
import { useAuth } from '../AuthContext';



const items = [
    {
      id: 1,
      icon: lodge,
      heading: "Lodge Grievance",
      text: "Lodge your complaints or concerns using a designated process to resolve issues through a structured and transparent system.",
    },
    {
      id: 2,
      icon: status,
      heading: "Grievance Status",
      text: "Check the status of your inquiries or requests to stay informed about their progress through our monitored system.",
    },
    {
      id: 3,
      icon: asses,
      heading: "Assessment",
      text: "Your complaint or grievance has been recorded and its work is in progress.",
    },
    {
      id: 4,
      icon: redres,
      heading: "Redressal ",
      text: "Initiate the redressal process for resolution by formally presenting your grievances or concerns.",
    },
  ];  

const NewsCard = ({ text,date}) => (
    <div className="w-[320px] px-4 py-6 bg-white rounded-md news_card_shadow">
      <p className="text-[#5B6469] font-bold text-[15px]">{text} </p>
      <div className="pt-7 text-[13px] flex items-center gap-2">
        <div>
          <h1 className="font-medium">{date}</h1>
        </div>
      </div>
    </div>
);
const cards = [
    {
      id: 1,
      date: "14.05.24",
      dept:"Financial Services",
      topic: "Increase demand and economic activities by raising funds with the help of services like banking and mortgages.",
      image: bank,
    },
    {
      id: 2,
      date: "14.05.24",
      dept:"Labour and Employment",
      topic:
        "Provides liquidity and capital to flow freely in the marketplace resulting in the growth of economy.",
      image: labour,
    },
    {
      id: 3,
      date: "14.05.24",
      dept:"Income Tax",
      topic:
        "Promoting price stability by enforcing various direct tax laws",
      image: tax,
    },
    {
      id: 4,
      date: "14.05.24",
      dept:"Telecommunications",
      topic: "To organize and provide research, training and consultancy in the aspects of communication finance.",
      image: tele,
    },
    {
      id: 5,
      date: "14.05.24",
      dept:"Housing and Urban Affairs",
      topic: "Formulating and administering rules, regulations, and laws relating to housing and urban development",
      image: urban,
    },
    {
      id: 6,
      date: "14.05.24",
      dept:"Personnel and Training",
      topic: "Mr. Dubi Gerber former EU application evaluator",
      image: personal,
    },
    {
      id: 7,
      dept:"Health and Family Welfare",
      date: "14.05.24",
      topic:
        "Ensuring availability of quality healthcare on equitable, accessible and affordable basis across regions.",
      image: health,
    },
    {
      id: 8,
      date: "14.05.24",
      dept:"Post Services",
      topic: "Program life us expanding its offers for call for proposals",
      image: post,
    },
];
export default function Home() {
    const{setlang} = useAuth();
    const[selectedLanguage,setSelectedLanguage]=useState('en');
    const navigate = useNavigate();
    const settings = {
        dots: true,
        infinite: true,
        speed: 500,
        slidesToShow: 1,
        slidesToScroll: 1,
        autoplay: true,
        autoplaySpeed: 2000,
    };
    const images = [
        th1,
        th,
        th2,
    ];
    // useEffect(()=>{
    //     setlang(selectedLanguage);
    // },[selectedLanguage])

    // useEffect(() => {
    //     // Load Google Translate API
    //     const script = document.createElement('script');
    //     script.src = '/script.js';
    //     script.async = true;
    //     document.head.appendChild(script);
    
    //     // Initialize Google Translate Element
    //     window.googleTranslateElementInit = () => {
    //       // Display the Google Translate dropdown
    //       new window.google.translate.TranslateElement({ pageLanguage: 'en' }, 'google_translate_element');
    
    //       // Set a timeout to ensure the translation dropdown is rendered
    //       setTimeout(() => {
    //         // Get the translation dropdown
    //         const translateDropdown = document.querySelector('.goog-te-combo');
    
    //         if (translateDropdown) {
    //           // Listen for changes in the translation dropdown
    //           translateDropdown.addEventListener('change', () => {
    //             setSelectedLanguage(translateDropdown.value);
    //           });
    //         }
    //       }, 1000); // Adjust the timeout duration if needed
    //     };
    
    //     return () => {
    //       document.head.removeChild(script);
    //       delete window.googleTranslateElementInit;
    //     };
    //   }, []);
    
    //   // Function to change the language programmatically
    //   const changeLanguage = (languageCode) => {
    //     const translateDropdown = document.querySelector('.goog-te-combo');
    //     if (translateDropdown) {
    //       translateDropdown.value = languageCode;
    //       translateDropdown.dispatchEvent(new Event('change'));
    //     }
    //   };
    
    return (
        <>
        <nav className="py-2 z-10" style={{marginLeft:'4.1%',marginRight:'4.1%',backgroundImage:'url("https://tse2.mm.bing.net/th?id=OIP.J2xR076jlOX-7CmZJSeCVQHaEo&pid=Api&P=0&w=300&h=300")',backgroundSize:'cover'}}>
        <div className="md:w-11/12 w-full md:px-0 px-3 mx-auto ">     
            <div className="flex items-center justify-between h-16">
                    <img src={grievlogo} style={{width:'10%',marginLeft:'-5%'}}></img>
            <div className="flex gap-4 items-center" style={{marginLeft:'-10%'}}>
                <p style={{fontSize:'25px', marginLeft:'11%'}}><b>GrievanceAlly</b></p>
                <div style={{marginLeft:'12%'}}className="hidden md:block">
                <div className="ml-10 flex items-baseline space-x-4">
                    <Link
                    to="/" style={{fontSize:'16.5px'}}
                    className=" hover:bg-button-primary hover:text-white px-3 py-2 rounded-md text-sm font-medium"
                    >
                    Home
                    </Link>
                    <a
                    href="#about" style={{fontSize:'16.5px'}}
                    className="hover:bg-button-primary hover:text-white px-3 py-2 rounded-md text-sm font-medium"
                    >
                    About
                    </a>
                    <a
                    href="#departments" style={{fontSize:'16.5px'}}
                    className="hover:bg-button-primary hover:text-white px-3 py-2 rounded-md text-sm font-medium"
                    >
                    Departments
                    </a>
                    <a
                    href="#start" style={{fontSize:'16.5px'}}
                    className="hover:bg-button-primary hover:text-white px-3 py-2 rounded-md text-sm font-medium"
                    >
                    New
                    </a>
                    <a
                    href="#contact" style={{fontSize:'16.5px'}}
                    className="hover:bg-button-primary hover:text-white px-3 py-2 rounded-md text-sm font-medium"
                    >
                    Contact
                    </a>
                </div>
                </div>
            </div>

            <Link to="/deptlogin" style={{marginLeft:'21%'}}>
                <div className="hidden md:block hover:bg-button-primary px-4 py-1 rounded-xl">
                <b>DepartmentLogin</b>
                </div>
            </Link>
            <Link to="/login">
                <div className="hidden md:block hover:bg-button-primary px-4 py-1 rounded-xl">
                <b>Login</b>
                </div>
            </Link>
            </div>
            </div>
        </nav>
        {/* <div id="google_translate_element" style={{marginLeft:'50%',marginBottom:'-2%',marginTop:'1%'}}></div> */}
        <section className="z-10" >
            <div className="sm:w-11/12 mx-auto mt-6">
                <Slider {...settings}>
                {images.map((image, index) => (
                <div key={index}>
                    <img style={{width:'100%'}}src={image} alt={`Slide ${index+ 1}`} />
                </div>
                ))}
            </Slider>
            </div>
        </section>

        <section className="my-14">
            <div className="md:w-11/12 w-full md:px-0 px-3 mx-auto" id="about">
                <div className="pt-14 pl-10 pb-4 h-[50%] overflow-auto bg-[#F7F7F7] flex items-center lg:flex-nowrap flex-wrap gap-1">
                <div className="lg:w-1/2 w-full lg:pb-0 pb-4 flex flex-col lg:items-start items-center lg:ml-14">
                <p style={{fontSize:'25px'}}><b>ABOUT CPGRAMS</b></p><br></br>
                    <p className="text-[#5B6469]">&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;Centralised Public Grievance Redress and Monitoring System (CPGRAMS) is an online platform available to the citizens 24x7 to lodge their grievances to the public authorities on any subject related to service delivery.
                    It is a single portal connected to all the Ministries/Departments of Government of India and States.
                    Every Ministry and States have role-based access to this system.CPGRAMS is also accessible to the citizens through standalone mobile application downloadable through Google Play store and mobile application integrated with UMANG.
                    <br></br><br></br>
                    &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;The status of the grievance filed in CPGRAMS  can be tracked with the unique registration ID provided at the time of registration of the complainant. CPGRAMS also provides appeal facility to the citizens if they are not satisfied with the resolution by the Grievance Officer. 
                    After closure of grievance if the complainant is not satisfied with the resolution, he/she can provide feedback.If the rating is ‘Poor’ the option to file an appeal is enabled.
                    The status of the Appeal can also be tracked by the petitioner with the grievance registration number.</p>
                    <br></br>
                    <ul class="mt-2 list-style-none pb-0">
                    <span class="font-bold text-info"><i class="fa fa-info-circle"></i>&nbsp;Issues which are not taken up for redress :</span><br></br><br></br>
                    <li className="ml-3"><i class="fa fa-caret-right"></i> &nbsp;RTI Matters</li>
                    <li className="ml-3"><i class="fa fa-caret-right"></i> &nbsp;Court related / Subjudice matters</li>
                    <li className="ml-3"><i class="fa fa-caret-right"></i> &nbsp;Religious matters</li>
                    <li className="ml-3"><i class="fa fa-caret-right"></i> &nbsp;Suggestions</li>
                    <li className="ml-3"><i class="fa fa-caret-right"></i> &nbsp;Grievances of Government employees concerning their service matters including disciplinary proceedings etc. unless the aggrieved employee has already exhausted the prescribed channels keeping in view the <a target="_blank" href="Home/Preview/RE9QVF9PTV9PblNlcnZpY2VNYXR0ZXJzKEVuZ2xpc2gpMzEtMDgtMjAxMy1Fc3R0LUEtSUlJLUVuZy5wZGY%3d">DoPT OM No. 11013/08/2013-Estt.(A-III) dated 31.08.2015</a></li>
                    </ul>
                    <br></br>
                    <div className="container-fluid"><strong>Note :</strong> <br></br><br></br><ol className="ml-3"><li>1. If you have not got a satifactory redress of your grievance within a reasonable period of time,relating to <a href="https://dpg.gov.in/AuthPages/OgCovered.aspx" 
                    target="_blank" rel='ab'>Ministries/Departments and Organisations</a>
                    under the purview of Directorate of Public Grievances(DPG), Cabinet Secretariat, GOI, you may seek help of DPG in resolution. Please <a href="https://dpg.gov.in/Default.aspx" target="_blank">click here</a> for details. </li><li>
                    2. Government is not charging fee from the public for filing grievances.
                    All money being paid by the public for filing grievance is going only to M/s CSC only.</li></ol> </div><br></br>
                </div>
                <div className="gap-2 sm:flex-nowrap flex-wrap lg:w-1/2 mx-auto">
                    <div >
                    <p style={{fontSize:'20px',marginLeft:'38%',marginBottom:'3%'}}><b>WHAT'S NEW</b></p>
                    </div>
                    <div className="rounded-md w-full flex flex-col gap-3 items-center">
                    <NewsCard text="Strengthening of Machinery for Redressal of Public Grievance (CPGRAMS)." 
                    date="27 JULY 2022"/>
                    <NewsCard text="Reduction of stipulated time limit for disposal of Public Grievance in CPGRAMS." 
                    date="22 JUNE 2021"/>
                    <NewsCard text="Tracking of grievance registered in CPGRAMS." 
                    date="22 SEPTEMPER 2020"/>
                    <NewsCard text=" Handling of Public Grievances received in CPGRAMS on COVID-19 in States." 
                    date="31 MARCH 2020"/>
                    <NewsCard text="Handling Public Grievances pertaining to COVID-19 in Ministries /Departments of GoI." 
                    date="30 MAR 2020"/>
                    </div>
                </div>
                </div>
            </div>
        </section>
        
        <div className="md:w-11/12 w-full md:px-0 px-3 mx-auto">
        <div className="flex items-center sm:justify-between justify-center flex-wrap my-8" id="departments">
            <p style={{fontSize:'30px'}}><b>Departments</b></p>
            <article className="grid xl:grid-cols-4 lg:grid-cols-3 md:grid-cols-2 grid-cols-1 place-items-center lg:gap-14 gap-4" style={{marginTop:'2%'}}>
                {cards.map((card) => (
                <div className="h-[340px] w-[32 0px]" key={card.id} style={{marginTop:'7%'}}>
                    <div className="relative rounded-xl overflow-hidden " >
                    <img src={card.image} alt="fund1" />
                </div>
                <div className="hover:text-[#6D9886] transition-colors cursor-pointer" style={{fontSize:'18px', marginTop:'5%', color:'#d48026',textAlign:'center'}}>
                    <b>{card.dept}</b>
                </div>
                <div className="flex items-center gap-4 my-4 px-2">
                </div>
                    <p className="text-[17px] px-2 hover:text-[#6D9886] transition-colors cursor-pointer">
                    {card.topic}
                    </p>
                </div>
                ))}
            </article>
        </div>
      </div>
      <section className="my-14" id="start">
        <div className="md:w-11/12 w-full md:px-0 px-3 mx-auto">
            <div className="bg-quiz-bg h-auto sm:bg-cover bg-center bg-no-repeat bg-[#6D9886] rounded-xl relative">
            <article className="py-24 md:px-14 px-4 md:w-9/12 md:mx-0 mx-auto md:text-left text-center leading-none">
                <h1 className="font-bold md:text-[30px] text-[40px] text-white pb-8">
                Empower change by voicing your concerns.<br></br><br></br>Start the journey towards resolution by lodging your grievance today.
                </h1>
                <button style={{borderRadius:'12px'}} className="capitalize bg-button-primary hover:bg-button-primary-hover transition-colors px-14 py-3 rounded-sm font-bold text-[#6C6252]" onClick={()=>{navigate("/signup")}}>
                Get Started
                </button>
            </article>
            </div>
        </div>
        </section>

        <section className="my-14">
            <div className="md:w-11/12 w-full md:px-0 px-3 mx-auto">
                <p style={{fontSize:'30px'}}><b>Process Flow</b></p>
                <div className="bg-[#D9CAB3] bg-opacity-30 px-8 py-14 rounded-md mt-8">
                <div className="grid lg:grid-cols-4 md:grid-cols-2 grid-cols-1 place-items-center lg:gap-14 gap-8">
                    {items.map((item) => (
                    <div
                        className="text-center flex flex-col items-center justify-center"
                        key={item.id}
                    >
                        <img src={item.icon} alt="icon" className="pb-4 w-24" />
                        <h1 className="font-bold text-lg py-4">{item.heading}</h1>
                        <p>{item.text}</p>
                    </div>
                    ))}
                </div>
                </div>
            </div>
        </section>

        {/* <footer className="bg-[#212121] py-14 text-white" id="contact">
            <div className="md:w-11/12 w-full md:px-0 px-3 mx-auto">
                <div className="grid place-items-center sm:text-left text-center lg:grid-cols-4 md:grid-cols-3 sm:grid-cols-2 grid-cols-1">
                <div className="sm:mt-0 mt-14">
                    <h1 className="font-bold capitalize sm:pt-0 pt-8 pb-4">company</h1>
                    <ul>
                    <li>
                        <a href="#">About Us</a>
                    </li>
                    <li>
                        <a href="#">Contact Us</a>
                    </li>
                    <li>
                        <a href="#">Knowledge Base</a>
                    </li>
                    <li>
                        <a href="#">Tutorials</a>
                    </li>
                    <li>
                        <a href="#">Terms and Conditions</a>
                    </li>
                    <li>
                        <a href="#">Cookie Policy</a>
                    </li>
                    <li>
                        <a href="#">Privacy Policy</a>
                    </li>
                    <li>
                        <a href="#">Careers</a>
                    </li>
                    </ul>
                </div>
                <div>
                    <h1 className="font-bold capitalize sm:pt-0 pt-8 pb-4">browser</h1>
                    <ul>
                    <li>
                        <a href="#">Memberships</a>
                    </li>
                    <li>
                        <a href="#">CJobs</a>
                    </li>
                    <li>
                        <a href="#">Experts</a>
                    </li>
                    <li>
                        <a href="#">Organizations</a>
                    </li>
                    <li>
                        <a href="#">Funding</a>
                    </li>
                    <li>
                        <a href="#">CAwards</a>
                    </li>
                    <li>
                        <a href="#">Donors</a>
                    </li>
                    <li>
                        <a href="#">News</a>
                    </li>
                    </ul>
                </div>
                <div>
                    <h1 className="font-bold capitalize sm:pt-0 pt-8 pb-4">connect</h1>
                    <ul>
                    <li>
                        <a href="#">Twitter</a>
                    </li>
                    <li>
                        <a href="#">Facebook</a>
                    </li>
                    <li>
                        <a href="#">Linkedin</a>
                    </li>
                    <li>
                        <a href="#">Youtube</a>
                    </li>
                    <li>
                        <a href="#">RSS</a>
                    </li>
                    </ul>
                </div>
                </div>
            </div>
        </footer> */}

        </>
    )
}
