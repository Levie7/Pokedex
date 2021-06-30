import { render, screen } from '@testing-library/react';
import React from 'react';
import { BrowserRouter } from 'react-router-dom';

import { Page } from './Page';

test('renders Page component', () => {
    render(
        <BrowserRouter>
            <Page />
        </BrowserRouter>
    );

    expect(screen.getByTestId('PageComponent')).toBeInTheDocument();
});

test('renders Page withGoBack props', () => {
    render(
        <BrowserRouter>
            <Page withGoBack />
        </BrowserRouter>
    );

    expect(screen.getByTestId('BackLinkHeader')).toBeInTheDocument();
});

test('renders Page without footer', () => {
    render(
        <BrowserRouter>
            <Page hideFooter />
        </BrowserRouter>
    );

    expect(screen.queryByText(/My Pokemon/i)).not.toBeInTheDocument();
});
