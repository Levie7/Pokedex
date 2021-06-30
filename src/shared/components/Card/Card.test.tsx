import { render, screen } from '@testing-library/react';
import { Card } from './Card';

test('renders Card component', () => {
    render(<Card />);

    expect(screen.getByTestId('CardComponent')).toBeInTheDocument();
});
