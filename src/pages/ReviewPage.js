import React, { useState } from 'react';
import axios from 'axios';
import Navbar from '../components/Navbar';

const ReviewPage = ({ type }) => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [rating, setRating] = useState('');
  const [comment, setComment] = useState('');
  const [loading, setLoading] = useState(false);
  const token = localStorage.getItem('token');

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!name || !email || !rating || !comment) {
      alert('Please fill in all fields');
      return;
    }

    try {
      setLoading(true);
      const endpoint = type === 'user' ? '/api/bookings/reviews/user' : '/api/bookings/reviews/gp';
      await axios.post(
        `http://localhost:5000${endpoint}`,
        {
          slotId: `review-${Date.now()}`,
          rating,
          comment,
        },
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      );
      alert('Review submitted successfully!');
      setName('');
      setEmail('');
      setRating('');
      setComment('');
    } catch (err) {
      console.error('Failed to submit review:', err);
      alert('Failed to submit review.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div style={styles.wrapper}>
      <Navbar />
      <div style={styles.container}>
        <form onSubmit={handleSubmit} style={styles.form}>
          <h2 style={styles.heading}>Submit Your Review</h2>

          <label style={styles.label}>Your Name</label>
          <input
            type="text"
            value={name}
            onChange={(e) => setName(e.target.value)}
            style={styles.input}
          />

          <label style={styles.label}>Your Email</label>
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            style={styles.input}
          />

          <label style={styles.label}>Rating (1–5)</label>
          <input
            type="number"
            min="1"
            max="5"
            value={rating}
            onChange={(e) => setRating(e.target.value)}
            style={styles.input}
          />

          <label style={styles.label}>Comment</label>
          <textarea
            value={comment}
            onChange={(e) => setComment(e.target.value)}
            rows={4}
            style={styles.textarea}
          />

          <button type="submit" disabled={loading} style={styles.button}>
            {loading ? 'Submitting...' : 'Submit Review'}
          </button>
        </form>
      </div>
    </div>
  );
};

const styles = {
  wrapper: {
    background: '#f3f4f6',
    minHeight: '100vh',
    paddingBottom: '2rem',
  },
  container: {
    maxWidth: '600px',
    margin: '2rem auto',
    background: '#fff',
    padding: '2rem',
    borderRadius: '1rem',
    boxShadow: '0 6px 20px rgba(0, 0, 0, 0.05)',
    fontFamily: "'Segoe UI', Tahoma, Geneva, Verdana, sans-serif",
  },
  heading: {
    fontSize: '1.5rem',
    color: '#1f2937',
    fontWeight: 600,
    marginBottom: '1rem',
  },
  label: {
    display: 'block',
    fontWeight: 500,
    color: '#1f2937',
    marginBottom: '0.5rem',
    marginTop: '1rem',
  },
  input: {
    width: '100%',
    padding: '0.75rem',
    borderRadius: '8px',
    border: '1px solid #ccc',
    fontSize: '1rem',
  },
  textarea: {
    width: '100%',
    padding: '0.75rem',
    borderRadius: '8px',
    border: '1px solid #ccc',
    fontSize: '1rem',
  },
  button: {
    marginTop: '1.5rem',
    backgroundColor: '#4f46e5',
    color: '#fff',
    padding: '0.75rem 1.5rem',
    borderRadius: '8px',
    fontSize: '1rem',
    border: 'none',
    cursor: 'pointer',
  },
};

export default ReviewPage;
