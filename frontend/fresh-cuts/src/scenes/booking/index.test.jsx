import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import '@testing-library/jest-dom';
import userEvent from '@testing-library/user-event';
import Booking from './index';

// Test to check if the Booking component renders without crashing
test('renders Booking component without crashing', () => {
  render(<Booking />);
  expect(screen.getByText(/Schedule an Appointment/i)).toBeInTheDocument();
});

// Test to select a stylist
test('allows the user to select a stylist', async () => {
  render(<Booking />);
  const stylistSelect = screen.getByLabelText(/Select a Stylist/i);
  userEvent.click(stylistSelect);
  const stylistOption = await screen.findByRole('option', { name: 'Kayla Nguyen' });
  userEvent.click(stylistOption);
  expect(stylistSelect.value).toBe('1');
});

// Test to select a service
test('allows the user to select a service', async () => {
  render(<Booking />);
  const serviceSelect = screen.getByLabelText(/Select One or More Services/i);
  userEvent.click(serviceSelect);
  const serviceOption = await screen.findByRole('option', { name: 'Baby Color' });
  userEvent.click(serviceOption);
  // Close the select dropdown
  userEvent.click(document.body);
  expect(serviceSelect).toHaveValue('Baby Color');
});