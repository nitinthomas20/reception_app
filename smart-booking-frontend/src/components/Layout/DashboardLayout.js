import React from "react";
import Navbar from "./Navbar";

function DashboardLayout({ children }) {
  return (
    <>
      <Navbar />
      <main className="dashboard-content">{children}</main>
    </>
  );
}

export default DashboardLayout;
