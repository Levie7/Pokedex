import { render, screen } from '@testing-library/react';
import { Picture } from './Picture';

test('renders Picture component', () => {
    render(<Picture alt='test picture' />);

    expect(screen.getByTestId('PictureComponent')).toBeInTheDocument();
});
