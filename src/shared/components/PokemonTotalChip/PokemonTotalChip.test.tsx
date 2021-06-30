import { render, screen } from '@testing-library/react';
import { PokemonTotalChip } from './PokemonTotalChip';

test('renders PokemonTotalChip component', () => {
    render(<PokemonTotalChip value='10' />);

    expect(screen.getByTestId('PokemonTotalChipComponent')).toBeInTheDocument();
});
