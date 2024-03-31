import {render, screen} from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import React from 'react'
import '@testing-library/jest-dom'
import {App} from '...../App'
import {BrowserRouter} from 'react-router-dom'

//Staff Page Testing
let stylists = ["Kayla Nguyen", "Olen Michael", "Stacie Cameron", "Sil", "Stafanie Pupo", "Victoria Saeturn", "Starrie Le"];
for(let i = 0; i < stylists.length(); i++) {
  test('stylist populates correctly', async () => {
    render(<App />, {wrapper: BrowserRouter});
    const user = userEvent.setup();
    await user.click(screen.getByText('Staff'));
    expect(screen.getByText(stylists[i])).toBeInTheDocument();
  })
}

test('navigate to instagram from staff', async () => {
  render(<App />, {wrapper: BrowserRouter});
  const user = userEvent.setup();
  await user.click(screen.getByText('Our Stylists'));
  expect(screen.getByText('Instagram')).toBeInTheDocument();
})

test('navigate to booking from staff', async () => {
  render(<App />, {wrapper: BrowserRouter});
  const user = userEvent.setup();
  await user.click(screen.getByText('Our Stylists'));
  expect(screen.getByText('Schedule an Appointment')).toBeInTheDocument();
})

