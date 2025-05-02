import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useLocation } from 'react-router-dom';
function UserDashboard() {
  const [availableSlots, setAvailableSlots] = useState([]);
  const [myBookings, setMyBookings] = useState([]);
  const [loading, setLoading] = useState(false);

  const token = localStorage.getItem('token');
  const userEmail = localStorage.getItem('userEmail');
  const location = useLocation();
  const email = location.state?.email;
  useEffect(() => {
    if (!token) return;
    fetchData();
  }, []);

  const fetchData = async () => {
    setLoading(true);
    await Promise.all([fetchAvailableSlots(),fetchMyBookings()]);
    setLoading(false);
  };

  const fetchAvailableSlots = async () => {
    try {
      const res = await axios.get('http://localhost:5000/api/bookings/available', {
        headers: { Authorization: `Bearer ${token}` },
      });
      setAvailableSlots(res.data);
    } catch (err) {
      console.error('Failed to fetch available slots:', err);
    }
  };

  const fetchMyBookings = async () => {
    try {
        const c = email;
        console.log('email',email)
      const res = await axios.get(`http://localhost:5000/api/bookings/my-bookings?email=${c}`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      setMyBookings(res.data);
    } catch (err) {
      console.error('Failed to fetch your bookings:', err);
    }
  };
  const handleBook = async (slotId,email) => {
    try {
        console.log(userEmail)
      await axios.post('http://localhost:5000/api/bookings/book', {slotId,email});
      alert('Booked!');
      fetchData(); // Refresh available list
    } catch (err) {
      alert('Slot already booked or failed.'+ err);
    }
  };
  

  return (
    <div style={{ padding: '20px' }}>
      <h2>Welcome, User!</h2>

      <h3>Available Time Slots</h3>
      {loading ? (
        <p>Loading...</p>
      ) : availableSlots.length === 0 ? (
        <p>No slots available</p>
      ) : (
        <ul>
          {availableSlots.map((slot) => (
            <li key={slot.slotId}>
              
              {new Date(slot.startTime).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })} - 
{new Date(slot.endTime).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}

              <button onClick={() => handleBook(slot.slotId,email)}>Book</button>
            </li>
          ))}
        </ul>
      )}

      <h3>My Bookings</h3>
      {loading ? (
        <p>Loading...</p>
      ) : myBookings.length === 0 ? (
        <p>No bookings yet</p>
      ) : (
        <ul>
          {myBookings.map((booking) => (
            <li key={booking._id}>
               {new Date(booking.startTime).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })} - 
               {new Date(booking.endTime).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}

export default UserDashboard;
