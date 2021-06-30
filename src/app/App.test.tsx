import { render, screen } from '@testing-library/react';
import { App } from './App';

test('renders pokedex app', () => {
    render(<App />);

    expect(screen.getByText(/Pokédex/i)).toBeInTheDocument();
});
