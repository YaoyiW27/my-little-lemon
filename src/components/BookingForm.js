import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { fetchAPI } from '../services/api';

const BookingForm = ({ submitForm }) => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    date: '',
    time: '',
    guests: '',
    occasion: ''
  });
  const [availableTimes, setAvailableTimes] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);

  // initial fetch
  useEffect(() => {
    const today = new Date().toISOString().split('T')[0];
    fetchAvailableTimes(today);
  }, []);

  // get available times from API
  const fetchAvailableTimes = async (date) => {
    setIsLoading(true);
    setError(null);
    try {
      const times = await fetchAPI(date);
      setAvailableTimes(times);
    } catch (err) {
      setError('Failed to fetch available times');
    } finally {
      setIsLoading(false);
    }
  };

  // handle date change
  const handleDateChange = async (e) => {
    const newDate = e.target.value;
    setFormData({ ...formData, date: newDate, time: '' }); // Reset time when date changes
    await fetchAvailableTimes(newDate);
  };

  // handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const success = await submitForm(formData);
      if (success) {
        navigate('/booking-confirmed', { state: { bookingData: formData } });
      }
    } catch (err) {
      setError('Failed to submit booking');
    }
  };

  return (
    <div className="booking-form-container">
      <h1>Reserve a Table</h1>
      <h2>Book your Little Lemon experience</h2>
      
      {error && <div className="error-message" role="alert">{error}</div>}
      
      <form onSubmit={handleSubmit} data-testid="booking-form">
        <div className="form-field">
          <label htmlFor="date">Choose date</label>
          <input
            type="date"
            id="date"
            value={formData.date}
            onChange={handleDateChange}
            required
            min={new Date().toISOString().split('T')[0]}
          />
        </div>

        <div className="form-field">
          <label htmlFor="time">Choose time</label>
          <select
            id="time"
            value={formData.time}
            onChange={(e) => setFormData({...formData, time: e.target.value})}
            required
            disabled={isLoading || !formData.date}
          >
            <option value="">Select a time</option>
            {availableTimes.map((time) => (
              <option key={time} value={time}>{time}</option>
            ))}
          </select>
          {isLoading && <span>Loading available times...</span>}
        </div>

        <div className="form-field">
          <label htmlFor="guests">Number of guests</label>
          <input
            type="number"
            id="guests"
            min="1"
            max="10"
            value={formData.guests}
            onChange={(e) => setFormData({...formData, guests: e.target.value})}
            required
          />
        </div>

        <div className="form-field">
          <label htmlFor="occasion">Occasion</label>
          <select
            id="occasion"
            value={formData.occasion}
            onChange={(e) => setFormData({...formData, occasion: e.target.value})}
            required
          >
            <option value="">Select an occasion</option>
            <option value="Birthday">Birthday</option>
            <option value="Anniversary">Anniversary</option>
            <option value="Business">Business</option>
          </select>
        </div>

        <button 
          type="submit" 
          className="submit-button"
          disabled={isLoading || !formData.date || !formData.time}
        >
          Complete Reservation
        </button>
      </form>
    </div>
  );
};

export default BookingForm;