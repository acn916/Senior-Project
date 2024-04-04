import React from 'react';
import { render, fireEvent, waitFor } from '@testing-library/react';
import CustomStyledLayout from '../CustomAppointmentForm'; // Assuming this is your appointment form component
import '@testing-library/jest-dom';


describe('CustomStyledLayout', () => {
  it('renders all form fields correctly', () => {
    const { getByLabelText } = render(<CustomStyledLayout />);
    
    expect(getByLabelText('Name')).toBeInTheDocument();
    expect(getByLabelText('Email')).toBeInTheDocument();
    expect(getByLabelText('Start Date')).toBeInTheDocument();
    expect(getByLabelText('End Date')).toBeInTheDocument();
    expect(getByLabelText('Stylist')).toBeInTheDocument();
    expect(getByLabelText('Select Services')).toBeInTheDocument();
    expect(getByLabelText('Notes')).toBeInTheDocument();
  });

  it('updates name and email correctly', async () => {
    const { getByLabelText } = render(<CustomStyledLayout />);
    const nameInput = getByLabelText('Name');
    const emailInput = getByLabelText('Email');
    
    // Check initial values
    expect(nameInput).toHaveValue('');
    expect(emailInput).toHaveValue('');
    

    fireEvent.change(nameInput, { target: { value: 'John Doe' } });
    fireEvent.change(emailInput, { target: { value: 'john@example.com' } });
  

    await waitFor(() => {
      expect(nameInput).toHaveValue('John Doe');
      expect(emailInput).toHaveValue('john@example.com');
     
    });
  });
 

});
