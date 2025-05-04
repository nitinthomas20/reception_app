const mongoose = require('mongoose');
const { v4: uuidv4 } = require('uuid');

const professionalSchema = new mongoose.Schema({
  name: String,
  photoUrl: String,
  shortDescription: String,
  detailedDescription: String,
  serviceId: String,
  availableTimeSlots: [
    {
      startTime: Date,
      endTime: Date,
      status: { type: String, default: 'available' }
    }
  ]
});

const Professional = mongoose.model('Professional', professionalSchema);

// Connect to MongoDB
mongoose.connect('mongodb://127.0.0.1:27017/gpbooking', {
  useNewUrlParser: true,
  useUnifiedTopology: true
});

// Hardcoded service IDs (from your JSON)
const services = [
  {
    id: '6fba20e4-5923-4b93-a797-7c08fb21db7a',
    name: 'General Practitioner'
  },
  {
    id: '6a69ccd1-ef06-48ff-b285-6d93c4ba2005',
    name: 'Fitness Coaching'
  },
  {
    id: 'cea9608e-f2cd-45c2-acac-8b284c11f172',
    name: 'Nutrition Consultation'
  },
  {
    id: '4d5f060b-63ae-46fb-b21f-bb120899bebb',
    name: 'Mental Health Support'
  },
  {
    id: '1c54ba34-1cee-44ed-88dc-c87af16be159',
    name: 'Physiotherapy'
  }
];

// Utility to generate 3 random time slots per professional
function generateTimeSlots() {
  const slots = [];
  const now = new Date();

  for (let i = 1; i <= 3; i++) {
    const startTime = new Date(now.getTime() + i * 86400000 + 9 * 3600000); // i days from now at 9 AM
    const endTime = new Date(startTime.getTime() + 60 * 60 * 1000); // 1-hour slot
    slots.push({ startTime, endTime, status: 'available' });
  }

  return slots;
}

async function seed() {
  try {
    await Professional.deleteMany({}); // clear old entries

    for (const service of services) {
      for (let i = 1; i <= 5; i++) {
        const prof = new Professional({
          name: `${service.name} Specialist ${i}`,
          photoUrl: `https://randomuser.me/api/portraits/med/men/${Math.floor(Math.random() * 90)}.jpg`,
          shortDescription: `Experienced ${service.name.toLowerCase()} professional.`,
          detailedDescription: `This professional has over ${i + 2} years of experience in the ${service.name} domain and has served hundreds of clients.`,
          serviceId: service.id,
          availableTimeSlots: generateTimeSlots()
        });

        await prof.save();
      }
    }

    console.log('✅ Seeded professionals successfully.');
  } catch (err) {
    console.error('❌ Error seeding professionals:', err);
  } finally {
    mongoose.disconnect();
  }
}

seed();
