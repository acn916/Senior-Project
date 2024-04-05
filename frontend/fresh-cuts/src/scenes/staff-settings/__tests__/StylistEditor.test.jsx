import { render, waitFor, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import '@testing-library/jest-dom';
import axios from 'axios';
import AxiosMockAdapter from 'axios-mock-adapter';
import StylistEditor from '../StylistEditor';

// Mock Axios
const axiosMock = new AxiosMockAdapter(axios);

// Reset mocks before each test
beforeEach(() => {
    axiosMock.reset();
    jest.clearAllMocks();
});

test('Displays all staff members fetched from the API', async () => {
    axiosMock.onGet('https://f3lmrt7u96.execute-api.us-west-1.amazonaws.com/get_all_staff').reply(200, [
        { id: 1, first_name: 'Fred', last_name: 'Cruikshank', email: 'fredcruik@example.com', phone: '1234567890', cognito_user_id: 'walejlq4tjlk' },
    ]);

    render(<StylistEditor />);

    const staffMember = await waitFor(() => screen.getByText('Fred'));
    expect(staffMember).toBeInTheDocument();
});

test('Adds a new staff member and displays it on the frontend', async () => {
    axiosMock.onGet('https://f3lmrt7u96.execute-api.us-west-1.amazonaws.com/get_all_staff').reply(200, [
        { id: 1, first_name: 'Fred', last_name: 'Cruikshank', email: 'fredcruik@example.com', phone: '1234567890', cognito_user_id: 'walejlq4tjlk' },
    ]);

    axiosMock.onPost('https://f3lmrt7u96.execute-api.us-west-1.amazonaws.com/client').reply(200, {
        id: 'newId',
        cognito_user_id: 'xyz789',
    });

    render(<StylistEditor />);

    // Mock user clicking the "Add" button to open popup
    await waitFor(() => userEvent.click(screen.getByLabelText('add')));

    // // Enter details into the form fields
    userEvent.type(screen.getByTestId('firstnametextfield'), 'Evel');
    userEvent.type(screen.getByTestId('lastnametextfield'), 'Knievel');
    userEvent.type(screen.getByTestId('emailtextfield'), 'evelKnievel@example.com');
    userEvent.type(screen.getByTestId('phonenumbertextfield'), '0987654321');

    // // Mock user clicking the "Save" button to submit form
    await waitFor(() => userEvent.click(screen.getByLabelText('save')));

    await waitFor(() => {
        const postRequests = axiosMock.history.post;
        expect(postRequests.length).toBe(1);
        expect(JSON.parse(postRequests[0].data)).toEqual(expect.objectContaining({
            email: 'evelKnievel@example.com',
            first_name: 'Evel',
            last_name: 'Knievel',
            phone: '0987654321',
        }));
    });
});

test('Deletes a member and updates in the database', async () => {
    axiosMock.onGet('https://f3lmrt7u96.execute-api.us-west-1.amazonaws.com/get_all_staff').reply(200, [
        { id: 1, first_name: 'Harry', last_name: 'Potter', email: 'jane.doe@example.com', phone: '9876543210', cognito_user_id: 'abc123' },
    ]);

    axiosMock.onDelete('https://f3lmrt7u96.execute-api.us-west-1.amazonaws.com/client').reply(200);

    render(<StylistEditor />);

    // Wait for the mock data to be displayed
    await waitFor(() => screen.getByText('Harry'));

    // Mock user clicking the "Delete" icon
    await waitFor(() => userEvent.click(screen.getAllByLabelText('delete')[0]));

    // // Mock user clicking the "Delete" button on the Dialog
    await waitFor(() => userEvent.click(screen.getByLabelText('deletepopupbutton')));

    await waitFor(() => {
        const deleteRequests = axiosMock.history.delete;
        expect(deleteRequests.length).toBe(1);
        expect(JSON.parse(deleteRequests[0].data)).toEqual({
            user_id: 1,
        });
    });
});