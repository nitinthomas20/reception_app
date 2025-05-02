import React, { useState } from 'react';
import axios from 'axios';

function Signup() {
  const [form, setForm] = useState({ name: '', email: '', password: '', role: 'user' });

  const handleSignup = async () => {
    try {
      await axios.post('http://localhost:5000/api/auth/signup', form);
      alert('Signup successful! Please log in.');
    } catch (err) {
      alert('Signup failed');
    }
  };

  return (
    <div>
      <h2>Signup</h2>
      <input placeholder="Name" onChange={(e) => setForm({ ...form, name: e.target.value })} /><br />
      <input placeholder="Email" onChange={(e) => setForm({ ...form, email: e.target.value })} /><br />
      <input placeholder="Password" type="password" onChange={(e) => setForm({ ...form, password: e.target.value })} /><br />
      <select onChange={(e) => setForm({ ...form, role: e.target.value })}>
        <option value="user">User</option>
        <option value="gp">GP</option>
      </select><br />
      <button onClick={handleSignup}>Signup</button>
    </div>
  );
}

export default Signup;
