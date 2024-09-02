import React from "react";
import { Route, Routes } from "react-router-dom";
import Home from "./Components/Home";
import Login from "./Components/Login";
import Signup from "./Components/Signup";
import Dashboard from "./Components/Dashboard";
import { AuthProvider } from "./AuthContext";
import AdminDash from './Components/AdminDash/AdminDash'
import DeptDash from "./Components/DeptDash/DeptDash";
import DeptLogin from "./Components/DeptDash/DeptLogin";
import Depts from "./Components/Lodge/Depts";

function App() {
  return (
    <div className="App">
      <AuthProvider>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/login" element={<Login />} />
          <Route path="/signup" element={<Signup />} />
          <Route path="/dash" element={<Dashboard />} />
          <Route path="/admindash" element={<AdminDash />} />
          <Route path="/deptdash" element={<DeptDash/>} />
          <Route path="/deptlogin" element={<DeptLogin/>}/>
        </Routes>
      </AuthProvider>
      {/* <Depts/> */}
    </div>
  );
}

export default App;
