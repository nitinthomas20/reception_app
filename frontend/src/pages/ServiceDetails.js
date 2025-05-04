import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';
import ProfessionalCard from '../components/ProfessionalCard';

export default function ServiceDetails() {
  const { serviceId } = useParams();
  const [serviceName, setServiceName] = useState('');
  const [professionals, setProfessionals] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      try {
        console.log("Fetching for serviceId:", serviceId);

        const [serviceRes, professionalsRes] = await Promise.all([
          axios.get(`http://localhost:5000/api/bookings/service/${serviceId}`),
          axios.get(`http://localhost:5000/api/bookings/service/${serviceId}/professionals`)
        ]);

        setServiceName(serviceRes.data.name);
        setProfessionals(professionalsRes.data);
      } catch (err) {
        console.error(err);
        setError('Failed to load service details.');
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [serviceId]);

  if (loading) return <div style={{ padding: '2rem' }}><p>Loading...</p></div>;
  if (error) return <div style={{ padding: '2rem' }}><p>{error}</p></div>;

  return (
    <div style={{ padding: '2rem' }}>
      <h2>{serviceName}</h2>
      <p>Meet our trusted professionals:</p>
      <div>
        {professionals.map(prof => (
          <ProfessionalCard key={prof.id} professional={prof} serviceId={serviceId} />
        ))}
      </div>
    </div>
  );
}
