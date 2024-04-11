import React from 'react';
import {render, screen, waitFor, within} from '@testing-library/react';
import Staff from './index';
import userEvent from '@testing-library/user-event';

const staffMembers = ["Kayla Nguyen","Olen Michael","Stacie Cameron","Sil","Stafanie Pupo","Victoria Saeteurn","Starrie Le"]

for(let i = 0; i < 7; i++) {
  test(`stylist name populates ${i}`, async () => {
    render(<Staff/>);
    expect(screen.getByLabelText(`${staffMembers[i]}`)).toBeInTheDocument;
  })
  test(`handle instagram click ${i}`, async () => {
    render(<Staff/>);
    await waitFor(() => userEvent.click(screen.getByLabelText(`INSTA${i}`)));
  })
  test(`handle book click ${i}`, async () => {
    render(<Staff/>);
    await waitFor(() => userEvent.click(screen.getByLabelText(`BOOK${i}`)));
  })
}
