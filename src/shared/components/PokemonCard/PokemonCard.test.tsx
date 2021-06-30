import { render, screen } from '@testing-library/react';
import { PokemonCard } from './PokemonCard';

test('renders PokemonCard component', () => {
    render(<PokemonCard name='Bulbasaur' image={{ alt: 'Bulbasaur', src: '/' }} />);

    expect(screen.getByTestId('PokemonCardComponent')).toBeInTheDocument();
});
