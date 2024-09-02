import {useEffect,useState} from "react";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import "../../Assets/Css/Table.css";
import axios from "axios";
import { saveAs } from "file-saver";
import * as XLSX from "xlsx";
import { Button } from "@mui/material";


const makeStyle = (status) => {
  if (status === "Solved") {
    return {
      background: "rgb(145 254 159 / 47%)",
      color: "green",
    };
  } else if (status === "Rejected") {
    return {
      background: "#ffadad8f",
      color: "red",
    };
  } else if(status === "Submitted"){
    return {
      background: "#59bfff",
      color: "rgb(255, 255, 255)",
    };
  } else if(status === "InProgress"){
    return {
      background: "orange",
      color: "rgb(244, 238, 238)"
    }
  }
  else if(status === "Processing"){
    return{
      background:"rgb(201, 201, 44)",
      color:"black"
    }
  }
};

const tableContainerStyle = {
  boxShadow: "0 5px 10px rgba(0, 0, 0, 0.1)",
  width: "98%",
  margin: "0 auto",
  overflowX: "auto",
  marginTop: "1%",
  borderRadius: "12px",
};

export default function AdminTable({handleComplaintDetails}) {
  const [grievances, setGrievances] = useState([]);
  const [searchInput, setSearchInput] = useState('');
  const [selectedDepartment, setSelectedDepartment] = useState('');
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

  const handleSearchInputChange = (event) => {
    setSearchInput(event.target.value);
  };
  const handleDepartmentChange = (event) => {
    setSelectedDepartment(event.target.value);
  };
  const filteredGrievances = grievances
  .filter((usergrievance) =>
    usergrievance.department &&
    usergrievance.department.toLowerCase().includes(selectedDepartment.toLowerCase())
  )
  .filter((usergrievance) =>
    usergrievance.complaintno.toLowerCase().includes(searchInput.toLowerCase()) ||
    usergrievance.date.toLowerCase().includes(searchInput.toLowerCase()) ||
    usergrievance.department.toLowerCase().includes(searchInput.toLowerCase()) ||
    usergrievance.grievance.toLowerCase().includes(searchInput.toLowerCase()) ||
    usergrievance.status.toLowerCase().includes(searchInput.toLowerCase())
  );


  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(`http://localhost:5000/grievance/admindata`);
        console.log(response.data);
        setGrievances(response.data);
      } catch (error) {
        console.error('Error fetching grievance data:', error);
      }
    };

    fetchData();
  }, []);

  const exportToExcel = () => {
    const dataToExport = grievances.map((grievance) => ({
      "Complaint ID": grievance.complaintno,
      Date: grievance.date,
      Department: grievance.department,
      Description: grievance.grievance,
      Status: grievance.status,
    }));

    const ws = XLSX.utils.json_to_sheet(dataToExport);
    const wb = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(wb, ws, "Sheet1");

    const excelBuffer = XLSX.write(wb, { bookType: "xlsx", type: "array" });
    const data = new Blob([excelBuffer], { type: "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet;charset=UTF-8" });
    saveAs(data, "GrievanceReport.xlsx");
  };

  return (
    <>
      <div className="search-box" value={searchInput} onChange={handleSearchInputChange}>
        <input type="text" placeholder="Search..." />
        <i className="bx bx-search" style={{cursor: 'pointer'}}></i>
      </div>
      <div className="Table" style={{ cursor: 'pointer' }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
          <h2 style={{paddingLeft: "2%", fontSize: '19px',marginBottom:'-2%'}}>
            <b>List of Grievances</b>
          </h2>
          <div className="select" style={{ position: 'relative',marginBottom:'-2%',marginLeft:'28%'}}>
            <select style={{
              WebkitAppearance: 'none',
              padding: '7px 40px 7px 12px',
              border: '1px solid #E8EAED',
              borderRadius: '5px',
              background: 'white',
              width:'45%',
              boxShadow: '0 1px 3px -2px #9098A9',
              cursor: 'pointer',
              fontFamily: 'inherit',
              fontSize: '16px',
              transition: 'all 150ms ease'
            }} value={selectedDepartment} onChange={handleDepartmentChange}>
              <option value="" selected>Filter Department</option>
              {allDepartments.map((department, index) => (
              <option key={index} value={department}>{department}</option>
            ))}
            </select>
            <svg style={{
              position: 'absolute',
              right: '20px',
              top: 'calc(50% - 3px)',
              width: '300px',
              height: '6px',
              strokeWidth: '2px',
              stroke: '#9098A9',
              fill: 'none',
              strokeLinecap: 'round',
              strokeLinejoin: 'round',
              pointerEvents: 'none'
            }}>
              <polyline points="1 1 5 5 9 1" />
            </svg>
          </div>
              <Button variant="contained" size='small' color="secondary" onClick={exportToExcel} sx={{marginTop:'2%',backgroundColor:'gray',marginRight:'3%'}}>
                Download Report
              </Button>
      </div>
      <TableContainer component={Paper} style={tableContainerStyle}>
        <Table sx={{ minWidth: 100 }} aria-label="simple table">
          <TableHead>
            <TableRow>
              <TableCell align="left">Complaint ID</TableCell>
              <TableCell align="left">Date</TableCell>
              <TableCell align="left">Department</TableCell>
              <TableCell>Description</TableCell>
              <TableCell align="left">Status</TableCell>
            </TableRow>
          </TableHead>
          <TableBody style={{ color: "white" }}>
             
          {filteredGrievances.length === 0 ? (
                <TableRow>
                  <TableCell colSpan={5} align="center">
                    <b>No records Found</b>
                  </TableCell>
                </TableRow>
            ) : (
            filteredGrievances.map((usergrievance) => (
              <TableRow
              key={usergrievance._id}
              sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
              >
                <TableCell align="left">{usergrievance.complaintno}</TableCell>
                <TableCell align="left">{usergrievance.date}</TableCell>
                <TableCell align="left">{usergrievance.department}</TableCell>
                <TableCell component="th" scope="row">
                  {usergrievance.grievance}
                </TableCell>
                <TableCell align="left">
                  <span className="status" style={makeStyle(usergrievance.status)}>
                    {usergrievance.status}
                  </span>
                </TableCell>
                <TableCell align="left" className="Details" onClick={() => { handleComplaintDetails(usergrievance.complaintno) }}>
                  Details
                </TableCell>
              </TableRow>
            )))}
          </TableBody>
        </Table>
      </TableContainer>
    </div>
    </>
  );
}
