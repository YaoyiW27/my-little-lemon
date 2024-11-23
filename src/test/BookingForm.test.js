import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import BookingForm from '../BookingForm';

// Mock the API functions
global.fetchAPI = jest.fn();
global.submitAPI = jest.fn();

describe('BookingForm', () => {
  beforeEach(() => {
    // Reset mocks before each test
    fetchAPI.mockReset();
    submitAPI.mockReset();
    
    // Default mock implementation
    fetchAPI.mockResolvedValue(['17:00', '18:00', '19:00']);
    submitAPI.mockResolvedValue(true);
  });

  test('updates available times when date is selected', async () => {
    render(<BookingForm />);
    
    const dateInput = screen.getByLabelText('Choose date');
    const newDate = '2024-11-24';
    
    // Simulate date selection
    fireEvent.change(dateInput, { target: { value: newDate } });
    
    // Verify that fetchAPI was called with the new date
    expect(fetchAPI).toHaveBeenCalledWith(newDate);
    
    // Wait for the time options to be updated
    await waitFor(() => {
      const timeSelect = screen.getByLabelText('Choose time');
      expect(timeSelect.options.length).toBeGreaterThan(1);
    });
  });

  test('displays loading state while fetching times', async () => {
    fetchAPI.mockImplementation(() => new Promise(resolve => setTimeout(resolve, 100)));
    
    render(<BookingForm />);
    
    fireEvent.change(screen.getByLabelText('Choose date'), {
      target: { value: '2024-11-24' }
    });
    
    expect(screen.getByText('Loading available times...')).toBeInTheDocument();
    
    await waitFor(() => {
      expect(screen.queryByText('Loading available times...')).not.toBeInTheDocument();
    });
  });

  test('submits form with correct data', async () => {
    render(<BookingForm />);
    
    // Fill out the form
    fireEvent.change(screen.getByLabelText('Choose date'), {
      target: { value: '2024-11-24' }
    });
    
    await waitFor(() => {
      fireEvent.change(screen.getByLabelText('Choose time'), {
        target: { value: '17:00' }
      });
    });
    
    fireEvent.change(screen.getByLabelText('Number of guests'), {
      target: { value: '4' }
    });
    
    fireEvent.change(screen.getByLabelText('Occasion'), {
      target: { value: 'Birthday' }
    });
    
    // Submit the form
    fireEvent.submit(screen.getByTestId('booking-form'));
    
    // Verify that submitAPI was called with the correct data
    await waitFor(() => {
      expect(submitAPI).toHaveBeenCalledWith({
        date: '2024-11-24',
        time: '17:00',
        guests: '4',
        occasion: 'Birthday'
      });
    });
  });

  test('displays error message when API call fails', async () => {
    fetchAPI.mockRejectedValue(new Error('API Error'));

    render(<BookingForm />);
    
    fireEvent.change(screen.getByLabelText('Choose date'), {
      target: { value: '2024-11-24' }
    });
    
    await waitFor(() => {
      expect(screen.getByRole('alert')).toHaveTextContent('Failed to fetch available times');
    });
  });
});