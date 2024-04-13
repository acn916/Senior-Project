import React from 'react';
import {render, screen, waitFor} from '@testing-library/react';
import Staff from './index';

const staffMembers = ["Kayla Nguyen","Olen Michael","Stacie Cameron","Sil","Stafanie Pupo","Victoria Saeteurn","Starrie Le"]

for(let i = 0; i < 7; i++) {
  test(`stylist name populates ${i}`, async () => {
    render(<Staff/>);
    await waitFor(() => expect(screen.getByLabelText(`${staffMembers[i]}`)).toBeInTheDocument);
  })
}
