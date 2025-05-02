const mongoose = require('mongoose');
const TimeSlot = require('./models/TimeSlot'); // adjust path if needed

// Connect to MongoDB
mongoose.connect('mongodb://localhost:27017/gpbooking', {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

const db = mongoose.connection;
db.on('error', console.error.bind(console, 'connection error:'));
db.once('open', async () => {
  console.log('Connected to MongoDB');

  await seedTimeSlots();
  mongoose.disconnect();
});

function generateSlotId(date) {
  const yyyy = date.getFullYear();
  const mm = String(date.getMonth() + 1).padStart(2, '0');
  const dd = String(date.getDate()).padStart(2, '0');
  const hh = String(date.getHours()).padStart(2, '0');
  const min = String(date.getMinutes()).padStart(2, '0');
  return `SLOT_${yyyy}${mm}${dd}_${hh}${min}`;
}

async function seedTimeSlots() {
  try {
    await TimeSlot.deleteMany(); // optional: clears existing slots

    const slots = [];

    const now = new Date();
    for (let i = 0; i < 20; i++) {
      const start = new Date(now.getTime() + i * 60 * 60 * 1000); // every hour
      const end = new Date(start.getTime() + 30 * 60 * 1000); // 30 minutes per slot

      slots.push({
        slotId: generateSlotId(start),
        startTime: start,
        endTime: end,
        status: 'available',
      });
    }

    await TimeSlot.insertMany(slots);
    console.log('Seeded time slots successfully!');
  } catch (err) {
    console.error('Error seeding time slots:', err);
  }
}
