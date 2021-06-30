import { render, screen } from '@testing-library/react';
import { Input } from './Input';

test('renders Input component', () => {
    render(<Input type='text' />);

    expect(screen.getByTestId('InputComponent')).toBeInTheDocument();
});
