const express = require('express');
const router = express.Router();
const TimeSlot = require('../models/TimeSlot');
const auth = require('../middleware/authMiddleware');

// GET /api/bookings/available — available slots = future slots not booked
router.get('/available', async (req, res) => {
    try {
      const slots = await TimeSlot.find({ status: 'available' });
      res.json(slots);
    } catch (err) {
      res.status(500).json({ message: 'Server error' });
    }
  });
  router.get('/pending', async (req, res) => {
    try {
      const slots = await TimeSlot.find({ status: 'pending' });
      res.json(slots);
    } catch (err) {
      res.status(500).json({ message: 'Server error' });
    }
  });
  

// GET /api/bookings/my-bookings
// router.get('/my-bookings', async (req, res) => {
//   try {
//     const bookings = await Booking.find({ user: req.user._id });
//     res.json(bookings);
//   } catch (err) {
//     res.status(500).json({ message: 'Server error' });
//   }
// });

router.get('/my-bookings', async (req, res) => {
   
    const { email } = req.query;
  
    try {
      const myBookings = await TimeSlot.find({ bookedByEmail: email });
      res.json(myBookings);
    } catch (err) {
      res.status(500).json({ message: 'Error fetching bookings' });
    }
  });


// POST /api/bookings/book
router.post('/book', async (req, res) => {
    const { slotId } = req.body;
    console.log(slotId)
    try {
      const slot = await TimeSlot.findOne({slotId});
      console.log(res.body)
      if (!slot) return res.status(404).json({ message: 'Slot not found' });
      if (slot.status !== 'available') return res.status(400).json({ message: 'Slot already booked' });
  
      slot.status = 'pending';
      slot.bookedByEmail= 'nitin@example.com';
      // Ensure auth middleware sets req.user
    
      await slot.save();
  
      res.json({ message: 'Slot booked successfully', slot });
    } catch (err) {
      res.status(500).json({ message: 'Server error',err });
    }
  });
  router.post('/gpbook', async (req, res) => {
    const { slotId } = req.body;
    console.log(slotId)
    try {
      const slot = await TimeSlot.findOne({slotId});
      console.log(res.body)
      if (!slot) return res.status(404).json({ message: 'Slot not found' });
      if (slot.status !== 'pending') return res.status(400).json({ message: 'Slot already booked' });
  
      slot.status = 'booked';
      // Ensure auth middleware sets req.user
    
      await slot.save();
  
      res.json({ message: 'Slot confirmed successfully', slot });
    } catch (err) {
      res.status(500).json({ message: 'Server error',err });
    }
  });
  

module.exports = router;
