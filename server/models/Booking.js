const mongoose = require('mongoose');

const bookingSchema = new mongoose.Schema({
  name: String,
  email: String,
  date: Date,
  dayOfWeek: String,
  numberOfPeople: Number
});

module.exports = mongoose.model('Booking', bookingSchema);