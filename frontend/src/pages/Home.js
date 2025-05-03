import React, { useEffect, useState } from 'react';
import axios from 'axios';
// import ServiceCard from '../components/ServiceCard';

export default function Home() {
  const [homeInfo, setHomeInfo] = useState('');
//   const [services, setServices] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const homeRes = await axios.get('http://localhost:5000/api/bookings/home');
        setHomeInfo(homeRes.data.description);
        console.log(homeInfo)
        // const servicesRes = await axios.get('/services');
        // setServices(servicesRes.data);
      } catch (err) {
        console.error('Error fetching home or services:', err);
      }
    };

    fetchData();
  }, []);

  return (
    <div style={{ padding: '2rem' }}>
      <section>
        <h2>Welcome to the Service Booking Platform</h2>
        <p>{homeInfo}</p>
      </section>

      <section style={{ marginTop: '3rem' }}>
        <h3>Services Provided</h3>
       
      </section>
    </div>
  );
}
