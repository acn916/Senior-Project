import React from 'react';
import {render, screen, waitFor} from '@testing-library/react';
import Staff from './index';
import userEvent from '@testing-library/user-event';

for(let i = 0; i < 7; i++) {
  test(`handle book click ${i}`, async () => {
    render(<Staff/>);
    await waitFor(() => userEvent.click(screen.getByLabelText(`BOOK${i}`)));
  })
}
