import React, { useEffect, useState } from 'react';
import axios from 'axios';
import ServiceCard from '../components/ServiceCard';
import { useUser } from './UserContext';
import { motion } from 'framer-motion';

export default function Home() {
  const [homeInfo, setHomeInfo] = useState('');
  const [services, setServices] = useState([]);
  const { setUserData } = useUser();
  const token = localStorage.getItem('token');

  useEffect(() => {
    if (token) {
      fetchData();
    }
  }, []);

  const fetchData = async () => {
    try {
      const user = await fetchUser();
      if (user?.email) {
        const homeRes = await axios.get('http://localhost:5000/api/bookings/home');
        setHomeInfo(homeRes.data.description);

        const servicesRes = await axios.get('http://localhost:5000/api/bookings/service');
        setServices(servicesRes.data);
      }
    } catch (err) {
      console.error('Failed to load dashboard data:', err);
    }
  };

  const fetchUser = async () => {
    try {
      const res = await axios.get('http://localhost:5000/api/user/profile', {
        headers: { Authorization: `Bearer ${token}` },
      });
      setUserData(res.data);
      localStorage.setItem('namee', res.data.name);
      return res.data;
    } catch (err) {
      console.error('Failed to fetch user:', err);
      return null;
    }
  };

  return (
    <div
      style={{
        background: '#ffffff',
        padding: '2rem',
        fontFamily: "'Segoe UI', Tahoma, Geneva, Verdana, sans-serif",
        background: '#f3f4f6',
        minHeight: '100vh',
      }}
    >
      <motion.section
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        style={{ marginBottom: '2rem', textAlign: 'center' }}
      >
        <h1>Hello Annn</h1>
        <h1 style={{ fontSize: '2.5rem', color: '#1f2937', fontWeight: 600 }}>
          Welcome {localStorage.getItem('namee')?.toUpperCase()}
        </h1>
        <h2 style={{ fontSize: '1.5rem', color: '#374151', marginTop: '0.5rem' }}>
          Explore Our Services Below
        </h2>
        <p
          style={{
            marginTop: '1rem',
            color: '#4b5563',
            fontSize: '1rem',
            maxWidth: '700px',
            margin: 'auto',
          }}
        >
          {homeInfo}
        </p>
      </motion.section>

      <motion.section
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
      >
        <h3
          style={{
            fontSize: '1.8rem',
            color: '#111827',
            fontWeight: 600,
            textAlign: 'center',
            marginBottom: '2rem',
          }}
        >
          Services Provided
        </h3>

        <div
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(350px, 1fr))',
            gap: '4rem',
            maxWidth: '1100px',
            margin: '0 auto',
            
          }}
        >
          {services.map(service => (
            <motion.div
              key={service.id}
              whileHover={{ scale: 1.03 }}
              whileTap={{ scale: 0.98 }}
              transition={{ type: 'spring', stiffness: 200 }}
              style={{
                background: '#ffffff',
                padding: '1.5rem',
                borderRadius: '1rem',
                boxShadow: '0 6px 20px rgba(0, 0, 0, 0.05)',
                height: '100%',
                display: 'flex',
                flexDirection: 'column',
                justifyContent: 'space-between',
              }}
            >
              <ServiceCard service={service} />
            </motion.div>
          ))}
        </div>
      </motion.section>
    </div>
  );
}
