import React from 'react';
import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom';
import { BrowserRouter as Router } from 'react-router-dom'; // Needed for Link components
import Home from './index'; // Adjust the import path according to your file structure

describe('Home Component', () => {
  // Renders the component before each test
  const renderComponent = () => render(
    <Router>
      <Home />
    </Router>
  );

  test('should display the main image', () => {
    renderComponent();
    const mainImage = screen.getByAltText('Red Salon Art');
    expect(mainImage).toBeInTheDocument();
  });

  test('should display the booking button with correct navigation link', () => {
    renderComponent();
    const bookingButton = screen.getByRole('link', { name: 'Book Now' });
    expect(bookingButton).toBeInTheDocument();
    expect(bookingButton.closest('a')).toHaveAttribute('href', '/booking');
  });

  test('should display business hours and check for correct opening times', () => {
    renderComponent();
    expect(screen.getByText('Business Hours')).toBeInTheDocument();
    expect(screen.getByText('Tuesday')).toBeInTheDocument();
  
    const matchingTimes = screen.getAllByText('9:00AM - 8:00PM');
    expect(matchingTimes.length).toBeGreaterThan(0);
  });

  test('should display payment methods accepted', () => {
    renderComponent();
    expect(screen.getByText('Payment Methods Accepted')).toBeInTheDocument();
    expect(screen.getByText('Visa and MasterCard, Discover, Debit Card, Cash')).toBeInTheDocument();
  });

  // Add more tests as necessary to cover your component functionality
});
