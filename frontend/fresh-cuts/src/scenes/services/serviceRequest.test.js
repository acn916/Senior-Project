import React from 'react';
import {render, screen, waitFor} from '@testing-library/react';
import Services from './index';
import userEvent from '@testing-library/user-event';

for(let i = 0; i < 32; i++) {
  test(`handle request click ${i}`, async () => {
    render(<Services/>);
    await waitFor(() => userEvent.click(screen.getByLabelText(`REQUEST${i+1}`)));
  })
}
