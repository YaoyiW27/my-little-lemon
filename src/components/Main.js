import React from 'react';
import { Routes, Route } from 'react-router-dom';
import BookingForm from './BookingForm';
import ConfirmedBooking from './ConfirmedBooking';
import OrderOnline from './OrderOnline';
import { submitAPI } from '../services/api';

const Main = () => {
  const submitForm = async (formData) => {
    try {
      const success = await submitAPI(formData);
      return success;
    } catch (error) {
      console.error('Error submitting form:', error);
      return false;
    }
  };

  return (
    <main>
      <Routes>
        <Route path="/booking" element={<BookingForm submitForm={submitForm} />} />
        <Route path="/booking-confirmed" element={<ConfirmedBooking />} />
        <Route path="/order" element={<OrderOnline />} />
      </Routes>
    </main>
  );
};

export default Main;