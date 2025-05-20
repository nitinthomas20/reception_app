const express = require('express');
const router = express.Router();
const TimeSlot = require('../models/TimeSlot');
const auth = require('../middleware/authMiddleware');
const Home = require('../models/Home')
const Service =require('../models/Services');
const Professional = require('../models/Professional');
const User = require('../models/User');
// GET /api/bookings/available — available slots = future slots not booked
router.get('/available', async (req, res) => {
    try {
      const slots = await TimeSlot.find({ status: 'available' });
      res.json(slots);
    } catch (err) {
      res.status(500).json({ message: 'Server error' });
    }
  });

  router.get('/available/:professionalId', async (req, res) => {
    try {
      const slots = await TimeSlot.find({ status: 'available' ,gpId: req.params.professionalId });
      res.json(slots);
    } catch (err) {
      res.status(500).json({ message: 'Server error' });
    }
  });
  router.get('/available/:gpEmail', async (req, res) => {
    try {
      const slots = await TimeSlot.find({gpEmail: req.params.gpEmail });
      console.log(req.params.gpEmail)
      res.json(slots);
    } catch (err) {
      res.status(500).json({ message: 'Server error' });
    }
  });
  router.get('/home', async (req, res) => {
    try {
      const slots = await Home.findOne().select('description');
      res.json(slots);
    } catch (err) {
      res.status(500).json({ message: 'Server error' });
    }
  });
  router.get('/service', async (req, res) => {
    try {
      const services = await Service.find();
      res.json(services);
    } catch (err) {
      res.status(500).json({ message: 'Server error' });
    }
  });
  router.get('/service/:serviceId', async (req, res) => {
    try {
      const services = await Service.findOne({id: req.params.serviceId});
      res.json(services);
    } catch (err) {
      res.status(500).json({ message: 'Server error' });
    }
  });
  router.get('/service/:serviceId/professionals', async (req, res) => {
    try {
      const services = await Professional.find({serviceId: req.params.serviceId});
      res.json(services);
    } catch (err) {
      res.status(500).json({ message: 'Server error' });
    }
  });

  router.get('/professionals/:professionalId', async (req, res) => {
    try {
      const services = await Professional.find({id: req.params.professionalId});
      res.json(services);
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
  router.get('/gpending/:gpId', async (req, res) => {
    try {
      const slots = await TimeSlot.find({ status: 'pending', gpId: req.params.gpId });
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
    console.log('my_booking_email',email);
    try {
      const myBookings = await TimeSlot.find({ bookedByEmail: email });
      res.json(myBookings);
    } catch (err) {
      res.status(500).json({ message: 'Error fetching bookings' });
    }
  });
  router.post('/gp-bookings', async (req, res) => {
   
    const { email } = req.body;
    console.log('my_booking_email',email);
    try {
      const myBookings = await TimeSlot.find({ gpEmail: email });
      res.json(myBookings);
    } catch (err) {
      res.status(500).json({ message: 'Error fetching bookings' });
    }
  });
  router.post('/member', async (req, res) => {
    const { email } = req.body;
    try {
      const slots = await User.find({ email: email });
      res.json(slots);
    } catch (err) {
      res.status(500).json({ message: 'Server error' ,err});
    }
  });
  router.post('/setmember', async (req, res) => {
    const { email } = req.body;
  
    try {
      const updatedUser = await User.findOneAndUpdate(
        { email: email },              // Match user by email
        { $set: { member: 1 } },       // Update `member` field to 1
        { new: true }                  // Return the updated document
      );
  
      if (!updatedUser) {
        return res.status(404).json({ message: 'User not found' });
      }
  
      res.json(updatedUser);
    } catch (err) {
      res.status(500).json({ message: 'Server error', err });
    }
  });
  


// POST /api/bookings/book
router.post('/book', async (req, res) => {
    const { slotId,email } = req.body;
    console.log(slotId)
    try {
      const slot = await TimeSlot.findOne({slotId});
      console.log(res.body)
      if (!slot) return res.status(404).json({ message: 'Slot not found' });
      if (slot.status !== 'available') return res.status(400).json({ message: 'Slot already booked' });
  
      slot.status = 'pending';
      slot.bookedByEmail= email;
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

router.post('/gpcancel', async (req, res) => {
    const { slotId } = req.body;
    console.log(slotId)
    try {
      const slot = await TimeSlot.findOne({slotId});
      console.log(res.body)
      if (!slot) return res.status(404).json({ message: 'Slot not found' });
  
      slot.status = 'available';
      // Ensure auth middleware sets req.user
    
      await slot.save();
  
      res.json({ message: 'Slot confirmed successfully', slot });
    } catch (err) {
      res.status(500).json({ message: 'Server error',err });
    }
  });

module.exports = router;
