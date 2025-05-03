const mongoose = require('mongoose');
const Home = require('./models/Home'); // adjust the path if needed

// Replace with your actual MongoDB URI
const MONGO_URI = 'mongodb://localhost:27017/gpbooking';

async function seedHomeData() {
  try {
    await mongoose.connect(MONGO_URI, { useNewUrlParser: true, useUnifiedTopology: true });

    // Optional: clear existing entries
    await Home.deleteMany({});

    // Insert sample description
    const homeDescription = new Home({
      description: "Welcome to our health & wellness service portal. Book appointments with GPs, fitness coaches, and more—trusted professionals, all in one place."
    });

    await homeDescription.save();

    console.log("Home data inserted successfully.");
    mongoose.disconnect();
  } catch (err) {
    console.error("Error seeding home data:", err);
  }
}

seedHomeData();
