import { render, fireEvent, waitFor, screen } from "@testing-library/react";
import '@testing-library/jest-dom';
import React from 'react';
import Request from "./index.jsx";
import Accept from "./Accept.jsx";
import Decline from "./Decline.jsx";
import Rebook from "./Rebook.jsx";
import { AuthProvider, AuthContext } from '../../AuthContext';
import { AccountContext } from '../login/Account.js';
import axios from 'axios'; // Import axios for mocking HTTP requests

//ACCEPT
describe('Accept component', () => {
  it('renders without crashing', () => {
    const handleConfirmMock = jest.fn(); // Mock the handleConfirm function

    render(
      <Accept id={1} handleConfirm={handleConfirmMock} />
    );

    // Check if certain elements are present in the rendered component
    expect(screen.getByText('Accept')).toBeInTheDocument();
    
    // Simulate clicking the "Accept" button and check if it opens the modal
    fireEvent.click(screen.getByText('Accept'));
    expect(screen.getByText('Confirm Appointment')).toBeInTheDocument();
    expect(screen.getByText('Confirm')).toBeInTheDocument();
    expect(screen.getByText('Back')).toBeInTheDocument();

    // Simulate clicking the "Back" button in the modal
    fireEvent.click(screen.getByText('Back'));
    expect(screen.queryByText('Confirm Appointment')).not.toBeInTheDocument();

    // Simulate clicking the "Confirm" button in the modal
    fireEvent.click(screen.getByText('Accept'));
    fireEvent.click(screen.getByText('Confirm'));
    expect(handleConfirmMock).toHaveBeenCalledWith(1);
  });
});


//DECLINE
describe('Decline component', () => {
  it('renders without crashing', () => {
    const handleDenyMock = jest.fn(); // Mock the handleDeny function

    render(
      <Decline id={1} handleDeny={handleDenyMock} />
    );

    // Check if certain elements are present in the rendered component
    expect(screen.getByText('Decline')).toBeInTheDocument();
    
    // Simulate clicking the "Decline" button and check if it opens the modal
    fireEvent.click(screen.getByText('Decline'));
    expect(screen.getByText('Decline Appointment')).toBeInTheDocument();

    // Simulate clicking the "Back" button in the modal
    fireEvent.click(screen.getByText('Back'));
    expect(screen.queryByText('Decline Appointment')).not.toBeInTheDocument();

    // Simulate clicking the "Confirm" button in the modal
    fireEvent.click(screen.getByText('Decline'));
    fireEvent.click(screen.getByText('Confirm'));
    expect(handleDenyMock).toHaveBeenCalledWith(1);
  });
});

//REBOOK
// Mock necessary dependencies
jest.mock('dayjs', () => () => ({
    format: jest.fn(),
  }));
  jest.mock('@mui/x-date-pickers/AdapterDayjs', () => ({
    AdapterDayjs: jest.fn(),
  }));
  jest.mock('@mui/x-date-pickers/LocalizationProvider', () => ({
    LocalizationProvider: jest.fn(),
  }));
  jest.mock('axios', () => ({
    get: jest.fn(),
    put: jest.fn(),
  }));
  
  describe('Rebook component', () => {
    it('renders without crashing', () => {
      // Mock props
      const mockProps = {
        id: 1,
        service_id: 1,
        scheduled_at: '2024-04-01T08:00:00',
        client_id: 1,
        clients: [{ id: 1, first_name: 'John', last_name: 'Doe' }],
        services: [{ id: 1, name: 'Service 1' }],
        handleRebook: jest.fn(),
      };
  
      render(<Rebook {...mockProps} />);
  
      // Simulate click event on Rebook button to open modal
      fireEvent.click(screen.getByText('Rebook'));
  
      // Check if modal content is rendered
      expect(screen.getByText('Rebook Appointment')).toBeInTheDocument();
      expect(screen.getByText('Name')).toBeInTheDocument();
      expect(screen.getByText('Services')).toBeInTheDocument();
      expect(screen.getByText('Date')).toBeInTheDocument();
      expect(screen.getByText('Time')).toBeInTheDocument();
      expect(screen.getByText('Back')).toBeInTheDocument();
      expect(screen.getByRole('button', {name: 'Rebook'})).toBeInTheDocument();
  
      expect(screen.getByDisplayValue('John Doe')).toBeInTheDocument();
      expect(screen.getByText('Service 1')).toBeInTheDocument();

      fireEvent.click(screen.getByText('Back'));
      expect(screen.queryByText('Rebook Appointment')).not.toBeInTheDocument();
      
    });
  });

jest.mock('axios');

//REQUEST PAGE
// Mock AuthContext value
const mockAuthContextValue = {
  name: 'John Doe', // Provide a mock value for the 'name' property
  setName: jest.fn(), // Mock setName function if needed
};

// Mock AccountContext value
const mockAccountContextValue = {
  getSession: jest.fn(), // Mock getSession function
  email: 'JohnDoe@example.com'
};

describe('Request component', () => {
  beforeEach(() => {
    axios.get.mockResolvedValue({
      data: [
        { id: 1, confirmation_timestamp: '2022-01-01', client_id: 1, service_id: 1, scheduled_at: '2022-01-02', status: 'Pending', staff_id: 1 },
        { id: 2, confirmation_timestamp: '2022-01-03', client_id: 2, service_id: 2, scheduled_at: '2022-01-04', status: 'Pending', staff_id: 2 },
      ],
    });
    axios.put.mockResolvedValue({});
  });

  test('renders Request component with mock data', async () => {
    render(
      <AuthContext.Provider value={mockAuthContextValue}>
        <AccountContext.Provider value={mockAccountContextValue}>
          <Request />
        </AccountContext.Provider>
      </AuthContext.Provider>
    );

    // Check if certain elements are present
    expect(screen.getByText('Appointment Request')).toBeInTheDocument();
    expect(screen.getByText('Booking Date')).toBeInTheDocument();
    expect(screen.getByText('Guest Name')).toBeInTheDocument();
    expect(screen.getByText('Service')).toBeInTheDocument();
    expect(screen.getByText('Starting Price')).toBeInTheDocument();
    expect(screen.getByText('Appointment Date')).toBeInTheDocument();
    expect(screen.getByText('Accept / Decline / Rebook')).toBeInTheDocument();
  });
});
