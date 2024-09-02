import React, { createContext, useContext, useEffect, useState } from 'react';

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(() => {
    const storedUser = localStorage.getItem('user');
    return storedUser ? JSON.parse(storedUser) : null;
  });
  const [admin, setAdmin] = useState(() => {
    const storedUser = localStorage.getItem('admin');
    return storedUser ? JSON.parse(storedUser) : null;
  });
  const [dept, setdept] = useState(() => {
    const storedUser = localStorage.getItem('dept');
    return storedUser ? JSON.parse(storedUser) : null;
  });
  const adlogin = (adminData)=>{
    setAdmin(adminData)
    localStorage.setItem('admin', JSON.stringify(adminData));
  }
  const adlogout = () => {
    setUser(null);
    localStorage.removeItem('admin');
  };
  const deptlogin = (deptData)=>{
    setAdmin(deptData)
    localStorage.setItem('dept', JSON.stringify(deptData));
  }
  const deptlogout = () => {
    setUser(null);
    localStorage.removeItem('dept');
  };
  
  
  
  const login = (userData) => {
    setUser(userData);
    localStorage.setItem('user', JSON.stringify(userData));
  };
  
  const logout = () => {
    setUser(null);
    localStorage.removeItem('user');
  };

  const [lang, setlang] = useState(() => {
    const storedUser = localStorage.getItem('user');
    return storedUser ? JSON.parse(storedUser) : null;
  });
  
  return (
    <AuthContext.Provider value={{ user, dept,login, logout,admin,adlogin,adlogout,deptlogin,deptlogout,lang,setlang}}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};
