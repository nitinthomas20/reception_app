import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';

export default function ProfessionalDetails() {
  const { professionalId } = useParams();
  const [professional, setProfessional] = useState(null);
  const [timeSlots, setTimeSlots] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  const fetchData = async () => {
    try {
      const profRes = await axios.get(`http://localhost:5000/api/bookings/professionals/${professionalId}`);
      const prof = profRes.data[0];
      setProfessional(prof);

      const timeSlotRes = await axios.get(`http://localhost:5000/api/bookings/available/${professionalId}`);
      setTimeSlots(timeSlotRes.data);
    } catch (err) {
      console.error(err);
      setError('Failed to fetch professional details or time slots.');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchData();
  }, [professionalId]);
  if (loading) return <div style={{ padding: '2rem' }}>Loading...</div>;
  if (error) return <div style={{ padding: '2rem' }}>{error}</div>;
  if (!professional) return <div style={{ padding: '2rem' }}>No professional found.</div>;
  const handleBook = async (slotId,email) => {
    try {
        
      await axios.post('http://localhost:5000/api/bookings/book', {slotId,email});
      alert('Booked!');
      fetchData(); // Refresh available list
    } catch (err) {
      alert('Slot already booked or failed.'+ err);
    }
  };
  return (
    <div style={{ padding: '2rem', maxWidth: '700px', margin: '0 auto' }}>
      <div style={{ display: 'flex', gap: '1rem', alignItems: 'center' }}>
        <img
          src={professional.photoUrl}
          alt={professional.name}
          style={{ borderRadius: '50%', width: '120px', height: '120px', objectFit: 'cover' }}
        />
        <div>
          <h2>{professional.name}</h2>
          <p style={{ fontStyle: 'italic', color: '#666' }}>{professional.shortDescription}</p>
        </div>
      </div>

      <div style={{ marginTop: '1rem' }}>
        <h3>About</h3>
        <p>{professional.detailedDescription}</p>
      </div>

      <div style={{ marginTop: '2rem' }}>
        <h3>Available Time Slots</h3>
        {timeSlots && timeSlots.length > 0 ? (
          <ul style={{ listStyle: 'none', paddingLeft: 0 }}>
            {timeSlots.map(slot => (
              <li key={slot._id} style={{ marginBottom: '0.5rem' }}>
                <strong>{new Date(slot.startTime).toLocaleString()}</strong> – {new Date(slot.endTime).toLocaleString()}
                <span style={{ marginLeft: '0.5rem', color: 'green' }}>
                  ({slot.status})
                  <button onClick={() => handleBook(slot.slotId,'nitin@example.com')}>Book</button>
                </span>
              </li>
            ))}
          </ul>
        ) : (
          <p>No available slots.</p>
        )}
      </div>
    </div>
  );
}
