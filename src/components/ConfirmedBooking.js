import React from 'react';
import { useLocation } from 'react-router-dom';

const ConfirmedBooking = () => {
  const location = useLocation();
  const bookingData = location.state?.bookingData;

  return (
    <div className="confirmation-container">
      <div className="confirmation-card">
        <div className="card-header">
          <h1 className="card-title">Booking Confirmed!</h1>
        </div>
        <div className="card-content">
          <div className="confirmation-message">
            <p>Thank you for choosing Little Lemon!</p>
            <p>Your table has been successfully reserved.</p>
          </div>
          
          {bookingData && (
            <div className="booking-details">
              <h3>Booking Details:</h3>
              <ul>
                <li>Date: {bookingData.date}</li>
                <li>Time: {bookingData.time}</li>
                <li>Number of Guests: {bookingData.guests}</li>
                <li>Occasion: {bookingData.occasion}</li>
              </ul>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default ConfirmedBooking;