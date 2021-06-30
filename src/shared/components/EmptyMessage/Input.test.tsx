import { render, screen } from '@testing-library/react';
import { EmptyMessage } from './EmptyMessage';

test('renders EmptyMessage component', () => {
    render(<EmptyMessage message='oops' />);

    expect(screen.getByTestId('EmptyMessageComponent')).toBeInTheDocument();
});
