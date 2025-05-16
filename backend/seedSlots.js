const mongoose = require('mongoose');
const { v4: uuidv4 } = require('uuid');
const TimeSlot = require('./models/TimeSlot'); // Adjust path if needed

// Replace with your MongoDB connection string
const mongoURI = 'mongodb://localhost:27017/gpbooking';

const gpList = [
  { email: 'akash@example.com', gpId: 'gp001' },
  { email: 'akshay@example.com', gpId: 'gp002' },
];

async function createTimeSlots() {
  await mongoose.connect(mongoURI);
  console.log('Connected to MongoDB');

  const today = new Date();
  const timeSlots = [];

  gpList.forEach(({ email, gpId }) => {
    for (let i = 0; i < 5; i++) {
      const start = new Date(today);
      start.setDate(today.getDate() + i); // 5 days starting today
      start.setHours(9 + i, 0, 0, 0); // Start time 9:00, 10:00... etc.

      const end = new Date(start);
      end.setMinutes(end.getMinutes() + 30); // 30-minute slot

      timeSlots.push({
        slotId: uuidv4(),
        startTime: start,
        endTime: end,
        gpId: gpId,
        gpEmail: email,
        status: 'available',
      });
    }
  });

  try {
    await TimeSlot.insertMany(timeSlots);
    console.log('Time slots inserted successfully');
  } catch (err) {
    console.error('Error inserting time slots:', err);
  } finally {
    await mongoose.disconnect();
  }
}

createTimeSlots();
