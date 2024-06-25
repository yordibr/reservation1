const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
require('dotenv').config();

const app = express();
const port = process.env.PORT || 5000;

app.use(cors());
app.use(express.json());

mongoose.connect(process.env.MONGO_URI).then(() => {
  console.log("MongoDB connected");
}).catch(err => {
  console.error("MongoDB connection error:", err);
});

// Root route
app.get('/', (req, res) => {
  res.send('Welcome to the Booking API');
});

// Import Routes
const bookingsRoute = require('./routes/bookings');
app.use('/api/bookings', bookingsRoute);

app.listen(port, () => {
  console.log(`Server is running on port: ${port}`);
});