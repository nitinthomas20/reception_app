import React, { useEffect, useState } from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import Login from './pages/Login';
import Signup from './pages/Signup';
import UserDashboard from './pages/UserDashboard';
import GPDashboard from './pages/GPDashboard';
import Home from './pages/Home';
import ServiceDetails from './pages/ServiceDetails';
import ProfessionalDetails from './pages/ProfessionalDetails';
import { UserProvider } from './pages/UserContext';
import Entry from './pages/Entry';
import Profile from './pages/Profile';

function App() {
  const [role, setRole] = useState(localStorage.getItem('role'));

  useEffect(() => {
    const handleStorageChange = () => {
      setRole(localStorage.getItem('role'));
    };

    window.addEventListener('storage', handleStorageChange);
    return () => window.removeEventListener('storage', handleStorageChange);
  }, []);

  return (
    
    <Router>
      <Routes>
        <Route path="/" element={<Navigate to="/entry" />} />
        <Route path="/entry" element={<Entry />} />
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="/home" element={<Home />} />
        <Route path="/profile" element={<Profile />} />
        <Route path ="/services/:serviceId" element ={<ServiceDetails />} />
        <Route path ="/professionals/:professionalId" element ={<ProfessionalDetails />} />
       
        <Route
          path="/user"
          element={role === 'user' ? <UserDashboard /> : <UserDashboard />}
        />
        <Route
          path="/gp"
          element={role === 'gp' ? <GPDashboard /> : <GPDashboard />}
        />
      </Routes>
    </Router>
    
  );
}

export default App;
