import React from 'react';
import BookingForm from '../components/BookingForm';

const BookingPage = ({ submitForm }) => {
  return (
    <div className="booking-page">
      <h1>Reserve Your Table</h1>
      <BookingForm submitForm={submitForm} />
    </div>
  );
};

export default BookingPage;