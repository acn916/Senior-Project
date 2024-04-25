import { render, waitFor, act, screen } from "@testing-library/react";
import '@testing-library/jest-dom';
import React from 'react';
import Dashboard from "../index.jsx";
import { AuthProvider, AuthContext } from '../../../AuthContext.js';
import { AccountContext } from '../../login/Account.js';
import axios from 'axios';
import AxiosMockAdapter from 'axios-mock-adapter';

const axiosMock = new AxiosMockAdapter(axios);

beforeEach(() => {
    axiosMock.reset();
    jest.clearAllMocks();
});
test('Dashboard loads all the days of the week', async () => {
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
axiosMock.onGet('https://f3lmrt7u96.execute-api.us-west-1.amazonaws.com/get_all_staff').reply(200, [
    { id: 1, email: 'JohnDoe@example.com', first_name: 'John', last_name: 'Doe', phone: '1111111111', cognito_user_id: 'staff1_cognito' },
]);
// Mock API responses
axiosMock.onGet('https://f3lmrt7u96.execute-api.us-west-1.amazonaws.com/dashboard').reply(200, [
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

axiosMock.onGet(`https://f3lmrt7u96.execute-api.us-west-1.amazonaws.com/has_email`).reply(200, [{email: 'JohnDoe@example.com'}]);


// Render the Dashboard component within the test environment
render(
 <AuthContext.Provider value={mockAuthContextValue}>
     <AccountContext.Provider value={mockAccountContextValue}>
         <Dashboard />
     </AccountContext.Provider>
 </AuthContext.Provider>
);

expect(screen.getByText('Sun')).toBeInTheDocument();
expect(screen.getByText('Mon')).toBeInTheDocument();
expect(screen.getByText('Tue')).toBeInTheDocument();
expect(screen.getByText('Wed')).toBeInTheDocument();
expect(screen.getByText('Thu')).toBeInTheDocument();
expect(screen.getByText('Fri')).toBeInTheDocument();
expect(screen.getByText('Sat')).toBeInTheDocument();

})


test('Dashboard loads the available appointments', async () => {
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

  // Mock API responses
  axiosMock.onGet('https://f3lmrt7u96.execute-api.us-west-1.amazonaws.com/dashboard').reply(200, [
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

  axiosMock.onGet(`https://f3lmrt7u96.execute-api.us-west-1.amazonaws.com/has_email`).reply(200, [{email: 'JohnDoe@example.com'}]);
  
  // Render the Dashboard component within the test environment
  render(
    <AuthContext.Provider value={mockAuthContextValue}>
         <AccountContext.Provider value={mockAccountContextValue}>
             <Dashboard />
         </AccountContext.Provider>
    </AuthContext.Provider>
  );
});

test('Dashboard loads the staff members', async () => {

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

  axiosMock.onGet('https://f3lmrt7u96.execute-api.us-west-1.amazonaws.com/get_all_staff').reply(200, [
        { id: 1, email: 'JohnDoe@example.com', first_name: 'John', last_name: 'Doe', phone: '1111111111', cognito_user_id: 'staff1_cognito' },
  ]);
  // Mock API responses
  axiosMock.onGet('https://f3lmrt7u96.execute-api.us-west-1.amazonaws.com/dashboard').reply(200, [
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

  axiosMock.onGet(`https://f3lmrt7u96.execute-api.us-west-1.amazonaws.com/has_email`).reply(200, [{email: 'JohnDoe@example.com'}]);
  

   // Render the Dashboard component within the test environment
   render(
    <AuthContext.Provider value={mockAuthContextValue}>
         <AccountContext.Provider value={mockAccountContextValue}>
             <Dashboard />
         </AccountContext.Provider>
    </AuthContext.Provider>
  );    
})

