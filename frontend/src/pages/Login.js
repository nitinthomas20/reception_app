import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

function Login() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();

  const handleLogin = async () => {
    try {
      const res = await axios.post('http://localhost:5000/api/auth/login', {
        email,
        password
      });
      localStorage.setItem('token', res.data.token);
      localStorage.setItem('role', res.data.role);
      localStorage.setItem('email', res.data.email);
      console.log('Role:', localStorage.getItem('role'), typeof res.data.role);
      if (res.data.role == 'gp'){
        setTimeout(() => navigate('/gp', { state: { email: res.data.email } }), 0);
      }
      else {
        setTimeout(() => navigate('/home', { state: { email: res.data.email } }), 0);
      }
      
    } catch (err) {
      alert('Login failed. Please check your credentials.');
    }
  };

  return (
    <div
      style={{
        minHeight: '100vh',
        background: 'linear-gradient(to right, #6366f1, #3b82f6)',
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        padding: '2rem',
      }}
    >
      <div
        style={{
          background: '#fff',
          borderRadius: '12px',
          padding: '2.5rem',
          width: '100%',
          maxWidth: '400px',
          boxShadow: '0 10px 25px rgba(0, 0, 0, 0.15)',
        }}
      >
        <h1 style={{ textAlign: 'center', color: '#4f46e5', marginBottom: '0.5rem' }}>
          MediBook
        </h1>
        <p style={{ textAlign: 'center', color: '#555', marginBottom: '2rem' }}>
          Sign in to continue booking trusted healthcare services.
        </p>

        <label style={{ display: 'block', marginBottom: '0.5rem', color: '#333' }}>Email</label>
        <input
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          placeholder="example@email.com"
          style={{
            width: '100%',
            padding: '0.75rem',
            marginBottom: '1.25rem',
            border: '1px solid #ccc',
            borderRadius: '8px',
            fontSize: '1rem',
          }}
        />

        <label style={{ display: 'block', marginBottom: '0.5rem', color: '#333' }}>Password</label>
        <input
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          placeholder="••••••••"
          style={{
            width: '100%',
            padding: '0.75rem',
            marginBottom: '2rem',
            border: '1px solid #ccc',
            borderRadius: '8px',
            fontSize: '1rem',
          }}
        />

        <button
          onClick={handleLogin}
          style={{
            width: '100%',
            backgroundColor: '#4f46e5',
            color: '#fff',
            padding: '0.75rem',
            fontSize: '1rem',
            border: 'none',
            borderRadius: '8px',
            cursor: 'pointer',
            transition: 'background 0.3s ease',
          }}
          onMouseEnter={(e) => (e.currentTarget.style.backgroundColor = '#4338ca')}
          onMouseLeave={(e) => (e.currentTarget.style.backgroundColor = '#4f46e5')}
        >
          Login
        </button>

        <p style={{ marginTop: '1rem', textAlign: 'center', fontSize: '0.9rem' }}>
          Don’t have an account?{' '}
          <span
            style={{ color: '#4f46e5', cursor: 'pointer' }}
            onClick={() => navigate('/signup')}
          >
            Sign up here
          </span>
        </p>
      </div>
    </div>
  );
}

export default Login;
