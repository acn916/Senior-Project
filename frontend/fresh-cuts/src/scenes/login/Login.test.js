import React from 'react';
import { render, fireEvent, waitFor, screen } from '@testing-library/react';
import Login from './index';
import { BrowserRouter } from 'react-router-dom';
import { Account } from './Account';
import '@testing-library/jest-dom';

// Mock the useContext hook to provide a mock context value

describe('Login component', () => {
  test('displays email and password fields', () => {
    render(<BrowserRouter>
      <Account>
        <Login />
      </Account>
    </BrowserRouter>);
    const emailTextbox = screen.getByRole('textbox', { name: /email address/i });
    expect(emailTextbox).toBeInTheDocument();
    const passwordTextbox = screen.getByRole('textbox', { id: 'password-login' });
    expect(passwordTextbox).toBeInTheDocument();
  });

  test('does not allow login with no email and no password', async () => {
    const { getByText, getByRole } = render(<BrowserRouter>
      <Account>
        <Login />
      </Account>
    </BrowserRouter>);
    
    const submitButton = screen.getByRole('button', { name: 'Proceed' });
    fireEvent.click(submitButton);
    
    // Assert error message is displayed
    await waitFor(() => {
      expect(screen.getByText('Incorrect Email or Password, please try again')).toBeInTheDocument();
    });
  });

  test('does not allow login with email and no password', async () => {
    const { getByText, getByRole } = render(<BrowserRouter>
      <Account>
        <Login />
      </Account>
    </BrowserRouter>);

    const emailTextbox = screen.getByRole('textbox', { name: /email address/i });
    fireEvent.change(emailTextbox, { target: { value: 'bingle@snail.com' } });
    
    const submitButton = screen.getByRole('button', { name: 'Proceed' });
    fireEvent.click(submitButton);
    
    // Assert error message is displayed
    await waitFor(() => {
      expect(screen.getByText('Incorrect Email or Password, please try again')).toBeInTheDocument();
    });
  });

  test('does not allow login with no email and password', async () => {
    const { getByText, getByRole } = render(<BrowserRouter>
      <Account>
        <Login />
      </Account>
    </BrowserRouter>);

    const passwordTextbox = screen.getByRole('textbox', { id: 'password-login' });
    fireEvent.change(passwordTextbox, { target: { value: 'pass123123123' } });
    
    const submitButton = screen.getByRole('button', { name: 'Proceed' });
    fireEvent.click(submitButton);
    
    // Assert error message is displayed
    await waitFor(() => {
      expect(screen.getByText('Incorrect Email or Password, please try again')).toBeInTheDocument();
    });
  });

  test('does not allow login with wrong email and correct password', async () => {
    const { getByText, getByRole } = render(<BrowserRouter>
      <Account>
        <Login />
      </Account>
    </BrowserRouter>);

    const emailTextbox = screen.getByRole('textbox', { name: /email address/i });
    fireEvent.change(emailTextbox, { target: { value: 'bingle@snail.com' } });
    const passwordTextbox = screen.getByRole('textbox', { id: 'password-login' });
    fireEvent.change(passwordTextbox, { target: { value: 'Admin123' } });
    
    const submitButton = screen.getByRole('button', { name: 'Proceed' });
    fireEvent.click(submitButton);
    
    // Assert error message is displayed
    await waitFor(() => {
      expect(screen.getByText('Incorrect Email or Password, please try again')).toBeInTheDocument();
    });
  });

  test('does not allow login with correct email and wrong password', async () => {
    const { getByText, getByRole } = render(<BrowserRouter>
      <Account>
        <Login />
      </Account>
    </BrowserRouter>);

    const emailTextbox = screen.getByRole('textbox', { name: /email address/i });
    fireEvent.change(emailTextbox, { target: { value: 'voben21@gmail.com' } });
    const passwordTextbox = screen.getByRole('textbox', { id: 'password-login' });
    fireEvent.change(passwordTextbox, { target: { value: 'pass123123123' } });
    
    const submitButton = screen.getByRole('button', { name: 'Proceed' });
    fireEvent.click(submitButton);
    
    // Assert error message is displayed
    await waitFor(() => {
      expect(screen.getByText('Incorrect Email or Password, please try again')).toBeInTheDocument();
    });
  });
});
