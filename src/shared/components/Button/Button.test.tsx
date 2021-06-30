import { render, screen } from '@testing-library/react';
import { Button } from './Button';

test('renders Button component', () => {
    render(<Button />);

    expect(screen.getByTestId('ButtonComponent')).toBeInTheDocument();
});

test('renders Button text only component', () => {
    render(<Button textOnly />);

    expect(screen.getByTestId('ButtonComponent')).toHaveStyle(
        'background: none, box-shadow: none, color: black'
    );
});
