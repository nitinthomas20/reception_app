const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');

const bookingRoutes = require('./routes/bookings');
const authRoutes = require('./routes/auth');  // ✅ Add this import

const app = express();
app.use(cors());
app.use(express.json());

mongoose.connect('mongodb://localhost:27017/gpbooking');

app.use('/api/bookings', bookingRoutes);
app.use('/api/auth', authRoutes);  // ✅ Add this line to use auth routes

app.listen(5000, () => {
  console.log('Server running on http://localhost:5000');
});
