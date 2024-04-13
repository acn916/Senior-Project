import React from 'react';
import {render, screen, waitFor} from '@testing-library/react';
import Services from './index';
import userEvent from '@testing-library/user-event';

const services = ["Extension Fixed","Extension Installation","Extensions New Set","Extension Removal","Extension Move-up","Women's Haircut","Men's Haircut",
"Kid's Haircut","Color/ Cut/ Partial Highlight","Color/Cut/Full Highlight","Color Touch up","Color & Cut","Color Correction","Ombre/Balayage","Ombre/Balayage & Haircut",
"On-Scalp Lightener","Partial Highlight & Haircut","Partial Highlight","Baby Color","Shampoo & Blowout","Updo","Deep Conditioning Treatment","Splitend Mender",
"Bang Trim","Base Bump","Bleach Wash","Brazilian Blowout","Brazilian Blowout w/ Haircut","Brazilian Blowout Express","Color Consultation","Extension Consultation","Platinum Card Foils"]

for(let i = 0; i < 32; i++) {
  test(`service name populates ${i}`, async () => {
    render(<Services/>);
    await waitFor(() => expect(screen.getByLabelText(`${services[i]}`)).toBeInTheDocument);
  })
}
