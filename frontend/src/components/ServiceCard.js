import { Link } from 'react-router-dom';

export default function ServiceCard({ service }) {
  return (
    <div style={{
      display: 'inline-block',
      width: '250px',
      margin: '1rem',
      padding: '1rem',
      border: '1px solid #ccc',
      borderRadius: '8px',
      textAlign: 'center',
      backgroundColor: '#fff'
    }}>
      <h3>{service.name}</h3>
      <p>{service.shortDescription}</p>
      {/* Corrected link with service.id */}
      <Link to={`/services/${service.id}`}>View Providers</Link>
    </div>
  );
}
