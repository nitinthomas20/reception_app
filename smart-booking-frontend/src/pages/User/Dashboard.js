import React from "react";
import "./Dashboard.css"; // optional CSS file
import BookingCard from "../../components/BookingCard";
import DashboardLayout from "../../components/Layout/DashboardLayout";
function Dashboard() {
  const user = {
    name: "John Doe",
    membership: "Gold",
  };

  const upcomingBookings = [
    { id: 1, service: "Haircut", date: "2025-04-08", time: "10:00 AM" },
    { id: 2, service: "Massage", date: "2025-04-10", time: "02:30 PM" },
  ];

  return (
    <DashboardLayout>
    <div className="dashboard-container">
      <h2>Welcome, {user.name}!</h2>
      <p>Membership: <strong>{user.membership}</strong></p>

      <div className="dashboard-section">
        <h3>Upcoming Bookings</h3>
        {upcomingBookings.length > 0 ? (
          upcomingBookings.map((booking) => (
            <BookingCard key={booking.id} booking={booking} />
          ))
        ) : (
          <p>No upcoming bookings.</p>
        )}
      </div>

      <div className="dashboard-actions">
        <button>📅 Book Appointment</button>
        <button>🕓 View History</button>
      </div>
    </div>
    </DashboardLayout>
  );
}

export default Dashboard;
