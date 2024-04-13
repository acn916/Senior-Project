import { render, fireEvent, waitFor, screen } from "@testing-library/react";
import '@testing-library/jest-dom';
import React from 'react';
import Request from "../index.jsx";
import { AuthProvider, AuthContext } from '../../../AuthContext.js';
import { AccountContext } from '../../login/Account.js';
import axios from 'axios';
import AxiosMockAdapter from 'axios-mock-adapter';


const axiosMock = new AxiosMockAdapter(axios);

beforeEach(() => {
  axiosMock.reset();
  jest.clearAllMocks();
});

// REQUEST PAGE
test('Displays the page and appointment information', async () => {
  // Mock AuthContext value
  const mockAuthContextValue = {
    name: 'John Doe',
    setName: jest.fn(),
  };

  // Mock session email
  const mockSession = {
    email: 'JohnDoe@example.com',
  };

  // Mock AccountContextValue and getSession() method to retrieve email
  const mockAccountContextValue = {
    getSession: jest.fn(async () => mockSession),
  };

  axiosMock.onGet('https://f3lmrt7u96.execute-api.us-west-1.amazonaws.com/appointments').reply(200, [
    { id: 1, service_id: 1, client_id: 1, staff_id: 1, notes: null, scheduled_at: '2024-04-04 16:00:00', status: 'Pending', confirmation_timestamp: '2024-04-03 15:00:00', cancellation_reason: null },
  ]);

  axiosMock.onGet('https://f3lmrt7u96.execute-api.us-west-1.amazonaws.com/service').reply(200, [
    { id: 1, name: 'Extension Fixed', description: '', duration: '0:45:00', price: 0.0 },
  ]);

  axiosMock.onGet('https://f3lmrt7u96.execute-api.us-west-1.amazonaws.com/client').reply(200, [
    { id: 1, email: 'JaneDoe@example.com', first_name: 'Jane', last_name: 'Doe', phone: '1234567890', cognito_user_id: 'client1_cognito', total_spent: null },
  ]);

  axiosMock.onGet('https://f3lmrt7u96.execute-api.us-west-1.amazonaws.com/get_all_staff').reply(200, [
    { id: 1, email: 'JohnDoe@example.com', first_name: 'John', last_name: 'Doe', phone: '1111111111', cognito_user_id: 'staff1_cognito' },
  ]);

  render(
    <AuthContext.Provider value={mockAuthContextValue}>
      <AccountContext.Provider value={mockAccountContextValue}>
        <Request />
      </AccountContext.Provider>
    </AuthContext.Provider>
  );

  // Check if elements rendered within TableBody are present
  expect(screen.getByText('Appointment Request')).toBeInTheDocument();
  expect(screen.getByText('Booking Date')).toBeInTheDocument();
  expect(screen.getByText('Guest Name')).toBeInTheDocument();
  expect(screen.getByText('Service')).toBeInTheDocument();
  expect(screen.getByText('Starting Price')).toBeInTheDocument();
  expect(screen.getByText('Appointment Date')).toBeInTheDocument();
  expect(screen.getByText('Accept / Decline / Rebook')).toBeInTheDocument();

  const bookingDate = await waitFor(() => screen.getByText('2024-04-04 16:00:00'));
  const guestName = await waitFor(() => screen.getByText('Jane Doe'));
  const service = await waitFor(() => screen.getByText('Extension Fixed'));
  const startingPrice = await waitFor(() => screen.getByText('$0'));
  const appointmentDate = await waitFor(() => screen.getByText('2024-04-03 15:00:00'));
  const acceptButton = await waitFor(() => screen.getByText('Accept'));
  const declineButton = await waitFor(() => screen.getByText('Decline'));
  const rebookButton = await waitFor(() => screen.getByText('Rebook'));

  expect(bookingDate).toBeInTheDocument();
  expect(guestName).toBeInTheDocument();
  expect(service).toBeInTheDocument();
  expect(startingPrice).toBeInTheDocument();
  expect(appointmentDate).toBeInTheDocument();
  expect(acceptButton).toBeInTheDocument();
  expect(declineButton).toBeInTheDocument();
  expect(rebookButton).toBeInTheDocument();
});


// ACCEPT BUTTON
test('Status changes to Confirmed after pressing Confirm in the Accept button popup', async () => {
  const mockAuthContextValue = {
    name: 'John Doe',
    setName: jest.fn(),
  };

  const mockSession = {
    email: 'JohnDoe@example.com',
  };

  const mockAccountContextValue = {
    getSession: jest.fn(async () => mockSession),
  };

  axiosMock.onGet('https://f3lmrt7u96.execute-api.us-west-1.amazonaws.com/appointments').reply(200, [
    { id: 1, service_id: 1, client_id: 1, staff_id: 1, notes: null, scheduled_at: '2024-04-04 16:00:00', status: 'Pending', confirmation_timestamp: '2024-04-03 15:00:00', cancellation_reason: null },
  ]);

  axiosMock.onGet('https://f3lmrt7u96.execute-api.us-west-1.amazonaws.com/service').reply(200, [
    { id: 1, name: 'Extension Fixed', description: '', duration: '0:45:00', price: 0.0 },
  ]);

  axiosMock.onGet('https://f3lmrt7u96.execute-api.us-west-1.amazonaws.com/client').reply(200, [
    { id: 1, email: 'JaneDoe@example.com', first_name: 'Jane', last_name: 'Doe', phone: '1234567890', cognito_user_id: 'client1_cognito', total_spent: null },
  ]);

  axiosMock.onGet('https://f3lmrt7u96.execute-api.us-west-1.amazonaws.com/get_all_staff').reply(200, [
    { id: 1, email: 'JohnDoe@example.com', first_name: 'John', last_name: 'Doe', phone: '1111111111', cognito_user_id: 'staff1_cognito' },
  ]);

  axiosMock.onPut('https://f3lmrt7u96.execute-api.us-west-1.amazonaws.com/appointment/1').reply(200, [
    { status: 'Confirmed'},
  ]);

  render(
    <AuthContext.Provider value={mockAuthContextValue}>
      <AccountContext.Provider value={mockAccountContextValue}>
        <Request />
      </AccountContext.Provider>
    </AuthContext.Provider>
  );

  // Check if elements rendered within TableBody are present
  expect(screen.getByText('Accept / Decline / Rebook')).toBeInTheDocument();

  const acceptButton = await waitFor(() => screen.getByText('Accept'));
  const declineButton = await waitFor(() => screen.getByText('Decline'));
  const rebookButton = await waitFor(() => screen.getByText('Rebook'));

  expect(acceptButton).toBeInTheDocument();
  expect(declineButton).toBeInTheDocument();
  expect(rebookButton).toBeInTheDocument();

  // Check if certain elements are present in the rendered component
  expect(screen.getByRole('button', {name: 'Accept'})).toBeInTheDocument();
  
  // Simulate clicking the "Accept" button and check if it opens the modal
  await waitFor(() => fireEvent.click(screen.getByRole('button', {name: 'Accept'})));
  expect(screen.getByText('Confirm Appointment')).toBeInTheDocument();
  expect(screen.getByText('Confirm')).toBeInTheDocument();
  expect(screen.getByText('Back')).toBeInTheDocument();

  // Simulate clicking the "Confirm" button in the modal
  await waitFor(() => fireEvent.click(screen.getByText('Confirm')));

  // Obtains the put information and expects the status of appointment to change to Confirmed
  await waitFor(() => {
    const putRequests = axiosMock.history.put;
    expect(putRequests.length).toBe(1);
    const requestData = JSON.parse(putRequests[0].data);
    expect(requestData[0].status).toEqual('Confirmed');
  });
});


// DECLINE BUTTON
test('Status changes to Declined after pressing Confirm in the Decline button popup', async () => {
  const mockAuthContextValue = {
    name: 'John Doe',
    setName: jest.fn(),
  };

  const mockSession = {
    email: 'JohnDoe@example.com',
  };

  const mockAccountContextValue = {
    getSession: jest.fn(async () => mockSession),
  };

  axiosMock.onGet('https://f3lmrt7u96.execute-api.us-west-1.amazonaws.com/appointments').reply(200, [
    { id: 1, service_id: 1, client_id: 1, staff_id: 1, notes: null, scheduled_at: '2024-04-04 16:00:00', status: 'Pending', confirmation_timestamp: '2024-04-03 15:00:00', cancellation_reason: null },
  ]);

  axiosMock.onGet('https://f3lmrt7u96.execute-api.us-west-1.amazonaws.com/service').reply(200, [
    { id: 1, name: 'Extension Fixed', description: '', duration: '0:45:00', price: 0.0 },
  ]);

  axiosMock.onGet('https://f3lmrt7u96.execute-api.us-west-1.amazonaws.com/client').reply(200, [
    { id: 1, email: 'JaneDoe@example.com', first_name: 'Jane', last_name: 'Doe', phone: '1234567890', cognito_user_id: 'client1_cognito', total_spent: null },
  ]);

  axiosMock.onGet('https://f3lmrt7u96.execute-api.us-west-1.amazonaws.com/get_all_staff').reply(200, [
    { id: 1, email: 'JohnDoe@example.com', first_name: 'John', last_name: 'Doe', phone: '1111111111', cognito_user_id: 'staff1_cognito' },
  ]);

  axiosMock.onPut('https://f3lmrt7u96.execute-api.us-west-1.amazonaws.com/appointment/1').reply(200, [
    { status: 'Cancelled'},
  ]);

  render(
    <AuthContext.Provider value={mockAuthContextValue}>
      <AccountContext.Provider value={mockAccountContextValue}>
        <Request />
      </AccountContext.Provider>
    </AuthContext.Provider>
  );

  // Check if elements rendered within TableBody are present
  expect(screen.getByText('Accept / Decline / Rebook')).toBeInTheDocument();

  const acceptButton = await waitFor(() => screen.getByText('Accept'));
  const declineButton = await waitFor(() => screen.getByText('Decline'));
  const rebookButton = await waitFor(() => screen.getByText('Rebook'));

  expect(acceptButton).toBeInTheDocument();
  expect(declineButton).toBeInTheDocument();
  expect(rebookButton).toBeInTheDocument();

  // Check if certain elements are present in the rendered component
  expect(screen.getByRole('button', {name: 'Decline'})).toBeInTheDocument();
  
  // Simulate clicking the "Decline" button and check if it opens the modal
  await waitFor(() => fireEvent.click(screen.getByRole('button', {name: 'Decline'})));
  expect(screen.getByText('Decline Appointment')).toBeInTheDocument();
  expect(screen.getByText('Confirm')).toBeInTheDocument();
  expect(screen.getByText('Back')).toBeInTheDocument();

  // Simulate clicking the "Confirm" button in the modal
  await waitFor(() => fireEvent.click(screen.getByText('Confirm')));

  // Obtains the put information and expects the status of appointment to change to Cancelled
  await waitFor(() => {
    const putRequests = axiosMock.history.put;
    expect(putRequests.length).toBe(1);
    const requestData = JSON.parse(putRequests[0].data);
    expect(requestData[0].status).toEqual('Cancelled');
  });
});


// REBOOK BUTTON
test('Rebook: change the time and date of appointment', async () => {
  const mockAuthContextValue = {
    name: 'John Doe',
    setName: jest.fn(),
  };

  const mockSession = {
    email: 'JohnDoe@example.com',
  };

  const mockAccountContextValue = {
    getSession: jest.fn(async () => mockSession),
  };

  axiosMock.onGet('https://f3lmrt7u96.execute-api.us-west-1.amazonaws.com/appointments').reply(200, [
    { id: 1, service_id: 1, client_id: 1, staff_id: 1, notes: null, scheduled_at: '2024-04-04 16:00:00', status: 'Pending', confirmation_timestamp: '2024-04-03 15:00:00', cancellation_reason: null },
  ]);

  axiosMock.onGet('https://f3lmrt7u96.execute-api.us-west-1.amazonaws.com/service').reply(200, [
    { id: 1, name: 'Extension Fixed', description: '', duration: '0:45:00', price: 0.0 }, { id: 2, name: 'Haircut', description: '', duration: '0:50:00', price: 50.0},
  ]);

  axiosMock.onGet('https://f3lmrt7u96.execute-api.us-west-1.amazonaws.com/client').reply(200, [
    { id: 1, email: 'JaneDoe@example.com', first_name: 'Jane', last_name: 'Doe', phone: '1234567890', cognito_user_id: 'client1_cognito', total_spent: null },
  ]);

  axiosMock.onGet('https://f3lmrt7u96.execute-api.us-west-1.amazonaws.com/get_all_staff').reply(200, [
    { id: 1, email: 'JohnDoe@example.com', first_name: 'John', last_name: 'Doe', phone: '1111111111', cognito_user_id: 'staff1_cognito' },
  ]);

  axiosMock.onPut('https://f3lmrt7u96.execute-api.us-west-1.amazonaws.com/appointment/1').reply(200, [
    { service_id: 1, scheduled_at: '2024-05-04 18:00:00' },
  ]);

  render(
    <AuthContext.Provider value={mockAuthContextValue}>
      <AccountContext.Provider value={mockAccountContextValue}>
        <Request />
      </AccountContext.Provider>
    </AuthContext.Provider>
  );

  // Check if elements rendered within TableBody are present
  expect(screen.getByText('Accept / Decline / Rebook')).toBeInTheDocument();

  const acceptButton = await waitFor(() => screen.getByText('Accept'));
  const declineButton = await waitFor(() => screen.getByText('Decline'));
  const rebookButton = await waitFor(() => screen.getByText('Rebook'));

  expect(acceptButton).toBeInTheDocument();
  expect(declineButton).toBeInTheDocument();
  expect(rebookButton).toBeInTheDocument();

  // Check if certain elements are present in the rendered component
  expect(screen.getByRole('button', {name: 'Rebook'})).toBeInTheDocument();
  
  // Simulate clicking the "Accept" button and check if it opens the modal
  await waitFor(() => fireEvent.click(screen.getByRole('button', {name: 'Rebook'})));
  expect(screen.getByText('Rebook Appointment')).toBeInTheDocument();
  expect(screen.getByText('Name')).toBeInTheDocument();
  expect(screen.getByText('Services')).toBeInTheDocument();
  expect(screen.getByText('Date')).toBeInTheDocument();
  expect(screen.getByText('Time')).toBeInTheDocument();
  expect(screen.getByRole('button', {name: 'Back'})).toBeInTheDocument();
  expect(screen.getByRole('button', {name: 'Rebook'})).toBeInTheDocument();

  // The information below are the current values in the modal
  const name = await waitFor(() => screen.getByDisplayValue('Jane Doe'));
  const service = await waitFor(() => screen.getByDisplayValue(1));
  const date = await waitFor(() => screen.getByDisplayValue('04/04/2024'));
  const time = await waitFor(() => screen.getByDisplayValue('04:00 PM'));

  expect(name).toBeInTheDocument();
  expect(service).toBeInTheDocument();
  expect(date).toBeInTheDocument();
  expect(time).toBeInTheDocument();

  // Changes the selected date
  fireEvent.change(date, { target: { value: '05/04/2024'}});
  expect(date.value).toBe('05/04/2024');

  // Changes the selected time
  fireEvent.change(time, { target: { value: '06:00 PM'}});
  expect(time.value).toBe('06:00 PM');

  // Simulate clicking the "Confirm" button in the modal
  await waitFor(() => fireEvent.click(screen.getByRole('button', {name: 'Rebook'})));

  // Obtains the put information and expects the scheduled_at value of appointment to change to new date/time
  await waitFor(() => {
    const putRequests = axiosMock.history.put;
    expect(putRequests.length).toBe(1);
    const requestData = JSON.parse(putRequests[0].data);
    expect(requestData[0].scheduled_at).toEqual('2024-05-04 18:00:00');
  });

  // Checks that old scheduled_at is NOT in the Table and is replaced by new scheduled_at value
  await waitFor(() => expect(screen.queryByText('2024-04-04 16:00:00')).not.toBeInTheDocument());
  await waitFor(() => expect(screen.getByText('2024-05-04 18:00:00')).toBeInTheDocument());
});