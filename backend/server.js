const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const http = require('http');
const bookingRoutes = require('./routes/bookings');
const authRoutes = require('./routes/auth');  // ✅ Add this import


const app = express();
app.use(cors());
app.use(express.json());
const server = http.createServer(app);
const { Server } = require('socket.io');

const io = new Server(server, {
    cors: {
      origin: 'http://localhost:3000', // your frontend URL
      methods: ['GET', 'POST']
    }
  });
mongoose.connect('mongodb://localhost:27017/gpbooking');

app.use('/api/bookings', bookingRoutes);
app.use('/api/auth', authRoutes);  // ✅ Add this line to use auth routes

// Socket.IO logic
io.on('connection', (socket) => {
    console.log('A user connected:', socket.id);
  
    socket.on('disconnect', () => {
      console.log('User disconnected:', socket.id);
    });
  });
  
  // Export io to use in routes
  app.set('io', io);
  
app.listen(5000, () => {
  console.log('Server running on http://localhost:5000');
});
