import React from 'react';
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import '@testing-library/jest-dom';
import Booking from './index';
import axios from 'axios';
import { MemoryRouter, Routes, Route } from 'react-router-dom';
import userEvent from '@testing-library/user-event';

// Mock axios and useNavigate
jest.mock('axios');
jest.mock('react-router-dom', () => ({
  ...jest.requireActual('react-router-dom'),
  useNavigate: () => jest.fn(),
}));

describe('Booking Component Tests', () => {
  beforeEach(() => {
    axios.get.mockResolvedValueOnce({
      data: [
        "09:00",
        "09:30",
        "10:00",
        "10:30"
    ],
    });
  });

  test('renders without crashing', async () => {
    render(<MemoryRouter><Booking /></MemoryRouter>);

    expect(screen.getByText('Select a Stylist')).toBeInTheDocument();
    expect(screen.getByText('Select One or More Services')).toBeInTheDocument();

    const datePicker = screen.getByLabelText('Start Date');
    expect(datePicker).toBeInTheDocument();

    const bookingButton = screen.getByRole('button', { name: 'Search' });
    expect(bookingButton).toBeInTheDocument();

  });

  test('initializes state correctly', () => {
    const { getByLabelText } = render(<MemoryRouter><Booking /></MemoryRouter>);
  
    const today = new Date();
    // Format the date as MM/DD/YYYY
    const formattedDate = (today.getMonth() + 1).toString().padStart(2, '0') + '/' + 
                          today.getDate().toString().padStart(2, '0') + '/' + 
                          today.getFullYear().toString();
  
    // Check initial state through the form elements
    expect(getByLabelText('Start Date')).toHaveValue(formattedDate);
  });

  test('handles user interaction and navigation correctly', async () => {
    const { getByText, getByLabelText, findByText } =  render(
        <MemoryRouter initialEntries={['/booking']}>
          <Routes>
            <Route path="/booking" element={<Booking />} />
          </Routes>
        </MemoryRouter>
      );
  
    // Open the stylist dropdown
    await userEvent.click(getByLabelText('Select a Stylist'));
    // Wait for and select the stylist
    const stylistOption = await screen.findByText('John Doe');
    await userEvent.click(stylistOption);
  
    // Open the services dropdown
    await userEvent.click(getByLabelText('Select One or More Services'));
    // Wait for and select the service
    const serviceOption = await screen.findByText('Extension Removal');
    await userEvent.click(serviceOption);
  
    await userEvent.click(screen.getByText('Search'));
  
    const timeSlotButton = await screen.findByText('9:00 AM');
    expect(userEvent.click(timeSlotButton));
  });

});
