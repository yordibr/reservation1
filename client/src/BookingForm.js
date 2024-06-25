import React, { useState } from 'react';
import axios from 'axios';

const BookingForm = () => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [date, setDate] = useState('');
  const [numberOfPeople, setNumberOfPeople] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();

    const booking = { name, email, date, numberOfPeople: parseInt(numberOfPeople) };

    try {
      await axios.post('http://localhost:5000/api/bookings', booking);
      alert('Booking confirmed');
    } catch (err) {
      alert(err.response.data.message);
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <label>Name:</label>
      <input type="text" value={name} onChange={(e) => setName(e.target.value)} required />
      <label>Email:</label>
      <input type="email" value={email} onChange={(e) => setEmail(e.target.value)} required />
      <label>Date:</label>
      <input type="date" value={date} onChange={(e) => setDate(e.target.value)} required />
      <label>Number of People:</label>
      <input type="number" value={numberOfPeople} onChange={(e) => setNumberOfPeople(e.target.value)} required />
      <button type="submit">Book</button>
    </form>
  );
};

export default BookingForm;