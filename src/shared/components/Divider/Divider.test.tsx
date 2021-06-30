import { render, screen } from '@testing-library/react';
import { Divider } from './Divider';

test('renders Divider component', () => {
    render(<Divider color='black' />);

    expect(screen.getByTestId('DividerComponent')).toBeInTheDocument();
});
