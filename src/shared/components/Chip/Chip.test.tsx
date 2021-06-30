import { render, screen } from '@testing-library/react';
import { Chip } from './Chip';

test('renders Chip component', () => {
    render(<Chip />);

    expect(screen.getByTestId('ChipComponent')).toBeInTheDocument();
});
