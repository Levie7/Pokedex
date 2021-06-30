import { render, screen } from '@testing-library/react';
import React from 'react';
import { BrowserRouter } from 'react-router-dom';

import { Link } from './Link';

test('renders Link component', () => {
    render(
        <BrowserRouter>
            <Link to='/' />
        </BrowserRouter>
    );

    expect(screen.getByTestId('LinkComponent')).toBeInTheDocument();
});
