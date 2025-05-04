import React, { useEffect, useState } from 'react';
import axios from 'axios';
import ServiceCard from '../components/ServiceCard';

export default function Home() {
  const [homeInfo, setHomeInfo] = useState('');
  const [services, setServices] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const homeRes = await axios.get('http://localhost:5000/api/bookings/home');
        setHomeInfo(homeRes.data.description);

        const servicesRes = await axios.get('http://localhost:5000/api/bookings/service');
        setServices(servicesRes.data);
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
        <div style={{ display: 'flex', overflowX: 'auto' }}>
          {services.map(service => (
            <ServiceCard key={service.id} service={service} />
          ))}
        </div>
      </section>
    </div>
  );
}
