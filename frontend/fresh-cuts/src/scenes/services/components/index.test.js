import {render, screen} from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import React from 'react'
import '@testing-library/jest-dom'
import {App} from '...../App'
import {BrowserRouter} from 'react-router-dom'

//Service Page Testing
let services = ["Extenstions Fixed", "Extension Installation", "Extensions New Set", "Extension Removal", "Extension Move-Up", "Women's Haircut", 
"Men's Haircut", "Kid's Haircut", "Color/ Cut/ Partial Highlight", "Color/ Cut/ Full Highlight", "Color Touch Up", "Color & Cut", "Color Correction",
"Ombre/Balayage", "Ombre/Balayage & Haircut", "On-Scalp Lightener", "Partial Highlight & Haircut", "Partial Highlight", "Baby Color", "Shampoo & Blowout",
"Updo", "Deep Conditioning Treatment", "Splitend Mender", "Bang Trim", "Base Bump", "Bleach Wash", "Brazilian Blowout", "Brazilian Blowout w/ Haircut",
"Brazilian Blowout Express", "Color Consultation", "Extension Consultation", "Platinum Card Foils"];
for(let i = 0; i < services.length(); i++) {
  test('service populates correctly', async () => {
    render(<App />, {wrapper: BrowserRouter});
    const user = userEvent.setup();
    await user.click(screen.getByText('Services'));
    expect(screen.getByText(services[i])).toBeInTheDocument();
  })
}

test('navigate to booking from services', async () => {
  render(<App />, {wrapper: BrowserRouter})
  const user = userEvent.setup()
  await user.click(screen.getByText('Our Services'))
  expect(screen.getByText('Schedule an Appointment')).toBeInTheDocument()
})

