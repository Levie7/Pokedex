import { render, screen } from '@testing-library/react';
import { BrowserRouter } from 'react-router-dom';
import { PokemonCatchModal } from './PokemonCatchModal';

let props = {
    isSuccess: 0,
    name: 'charmender',
    sprites: 'http:charmender.png',
    handleCloseModal: jest.fn(),
    handleSave: jest.fn(),
};

test('when show PokemonCatchModalFail', () => {
    render(
        <BrowserRouter>
            <PokemonCatchModal {...props} />
        </BrowserRouter>
    );

    expect(screen.getByText(/Oops/i)).toBeInTheDocument();
});
