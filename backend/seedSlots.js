const mongoose = require('mongoose');
const { v4: uuidv4 } = require('uuid');

// Replace with your actual MongoDB URI
const MONGO_URI = 'mongodb://localhost:27017/gpbooking';

const timeSlotSchema = new mongoose.Schema({
  slotId: { type: String, unique: true },
  startTime: Date,
  endTime: Date,
  gpId: { type: String, required: true },
  bookedBy: { type: mongoose.Schema.Types.ObjectId, ref: 'User', default: null },
  bookedByEmail: { type: String, default: null },
  status: {
    type: String,
    enum: ['available', 'booked', 'pending'],
    default: 'available',
  },
});

const TimeSlot = mongoose.model('TimeSlot', timeSlotSchema);

const gpIds = [
  "91f286b7-f943-4bd5-a157-a9f41b76d936",
  "7c70a6d7-4377-403a-b41f-6aefbc7b1abe",
  "0984664b-49f8-41d3-90a4-96eba3aa170b",
  "62898b09-d4e0-4f10-a0f7-54e2f5a3b0ae",
  "85d69f55-763e-452e-8227-c42594a9e81f",
  "9265df82-05fa-4883-a382-7ced91e539f0",
  "dc19b0c2-b39b-45f2-bd68-f3781bafa0f5",
  "5a6254ae-79d2-4190-97ef-41fe3e5d1fe5",
  "c2df61eb-1921-4c46-9b97-6acf414405ef"
];

async function generateSlots() {
  try {
    await mongoose.connect(MONGO_URI);
    console.log("Connected to MongoDB");

    const now = new Date();

    for (const gpId of gpIds) {
      for (let i = 0; i < 5; i++) {
        const start = new Date(now.getTime() + i * 24 * 60 * 60 * 1000); // i days from now
        start.setHours(10, 0, 0, 0); // 10:00 AM
        const end = new Date(start.getTime() + 60 * 60 * 1000); // 1 hour later

        const slot = new TimeSlot({
          slotId: uuidv4(),
          startTime: start,
          endTime: end,
          gpId,
          status: 'available',
        });

        await slot.save();
        console.log(`Created slot for GP: ${gpId} at ${start}`);
      }
    }

    console.log("Time slots generated successfully.");
  } catch (err) {
    console.error("Error generating time slots:", err);
  } finally {
    await mongoose.disconnect();
    console.log("Disconnected from MongoDB");
  }
}

generateSlots();
