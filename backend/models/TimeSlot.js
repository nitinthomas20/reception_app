const mongoose = require('mongoose');

const timeSlotSchema = new mongoose.Schema({
slotId: { type: String, unique: true },
  startTime: Date,
  endTime: Date,
  gpId:{type: String, require: true },
  gpEmail:{type: String, require: true },
  bookedBy: { type: mongoose.Schema.Types.ObjectId, ref: 'User', default: null },
  bookedByEmail: { type: String, default: null },
  status: {
    type: String,
    enum: ['available', 'booked','pending'],
    default: 'available',
  }
});

module.exports = mongoose.model('TimeSlot', timeSlotSchema);
