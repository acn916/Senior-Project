// ForgotPassword.test.js
import '@testing-library/jest-dom';
import React from 'react';
import { render, fireEvent, screen } from '@testing-library/react';
import ForgotPassword from './index';
import { BrowserRouter } from 'react-router-dom';
import { Account } from '../login/Account';

// Mocking necessary modules or services

describe('ForgotPassword component', () => {
  test('Submitting valid email sends reset code', async () => {
    // Mock necessary modules or services (e.g., email service)

    // Render the ForgotPassword component
    render(<BrowserRouter>
        <Account>
          <ForgotPassword />
        </Account>
      </BrowserRouter>);
    
    // Simulate user entering an email
    const emailTextbox = screen.getByRole('textbox', { name: /email address/i });
    expect(emailTextbox).toBeInTheDocument();
    fireEvent.change(emailTextbox, { target: { value: 'bingle@snail.com' } });

    // Simulate user submitting the form
    const submitButton = screen.getByText('Proceed');
    fireEvent.click(submitButton);


  });

  
  test('displays email textbox', () => {
    render(<BrowserRouter>
        <Account>
          <ForgotPassword />
        </Account>
      </BrowserRouter>);
    const emailTextbox = screen.getByRole('textbox', { name: /email address/i });
    expect(emailTextbox).toBeInTheDocument();
  });

  test('renders Password Reset label', async () => {
    render(<BrowserRouter>
        <Account>
          <ForgotPassword />
        </Account>
      </BrowserRouter>);
    const labelElement = screen.getByText(/Password Reset/i);
    expect(labelElement).toBeInTheDocument();
  });

});
