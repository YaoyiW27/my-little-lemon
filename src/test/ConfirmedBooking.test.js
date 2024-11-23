import { render, screen } from '@testing-library/react';
import { BrowserRouter } from 'react-router-dom';
import ConfirmedBooking from '../ConfirmedBooking';

describe('ConfirmedBooking', () => {
  test('renders booking confirmation message', () => {
    render(
      <BrowserRouter>
        <ConfirmedBooking />
      </BrowserRouter>
    );
    
    expect(screen.getByText('Booking Confirmed!')).toBeInTheDocument();
    expect(screen.getByText('Thank you for choosing Little Lemon!')).toBeInTheDocument();
  });

  test('displays booking details when provided', () => {
    const mockLocation = {
      state: {
        bookingData: {
          date: '2024-11-24',
          time: '18:00',
          guests: '4',
          occasion: 'Birthday'
        }
      }
    };

    render(
      <BrowserRouter>
        <ConfirmedBooking />
      </BrowserRouter>
    );
    
    // Add more specific assertions based on your actual implementation
    expect(screen.getByText(/Booking Details:/i)).toBeInTheDocument();
  });
});