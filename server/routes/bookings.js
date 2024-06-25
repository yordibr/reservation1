const express = require('express');
const router = express.Router();
const Booking = require('../models/Booking');
const nodemailer = require('nodemailer');

const maxBookings = {
  Monday: 3,
  Tuesday: 10,
  Wednesday: 10,
  Thursday: 10,
  Friday: 10,
  Saturday: 20,
  Sunday: 20
};

router.post('/', async (req, res) => {
  const { name, email, date, numberOfPeople } = req.body;
  const dayOfWeek = new Date(date).toLocaleString('en-us', { weekday: 'long' });

  try {
    // Get the total number of people already booked for the given date
    const totalBookings = await Booking.aggregate([
      { $match: { date: new Date(date) } },
      { $group: { _id: null, total: { $sum: "$numberOfPeople" } } }
    ]);

    const bookedCount = totalBookings.length > 0 ? totalBookings[0].total : 0;

    // Check if adding the new booking would exceed the limit
    if (bookedCount + numberOfPeople > maxBookings[dayOfWeek]) {
      return res.status(400).json({ message: "Booking limit exceeded" });
    }

    const newBooking = new Booking({ name, email, date, dayOfWeek, numberOfPeople });

    await newBooking.save();

    let transporter = nodemailer.createTransport({
      service: 'gmail',
      auth: {
        user: 'your-email@gmail.com',
        pass: 'your-email-password'
      }
    });

    let mailOptions = {
      from: 'your-email@gmail.com',
      to: email,
      subject: 'Booking Confirmation',
      text: `Hi ${name}, your booking for ${date} is confirmed.`
    };

    transporter.sendMail(mailOptions, (error, info) => {
      if (error) {
        console.log(error);
      } else {
        console.log('Email sent: ' + info.response);
      }
    });

    res.status(201).json(newBooking);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});

module.exports = router;