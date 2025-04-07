import React from "react";
import { Link } from "react-router-dom";

function Navbar() {
  return (
    <nav className="navbar">
      <h3>Booking System</h3>
      <ul>
        <li><Link to="/dashboard">🏠 Dashboard</Link></li>
        <li><Link to="/book">📅 Book Appointment</Link></li>
        <li><Link to="/login">🚪 Logout</Link></li>
      </ul>
    </nav>
  );
}

export default Navbar;
