import React from "react";

function BookingCard({ booking }) {
  return (
    <div className="booking-card">
      <h4>{booking.service}</h4>
      <p>Date: {booking.date}</p>
      <p>Time: {booking.time}</p>
    </div>
  );
}

export default BookingCard;
