import { LocalStorageMock } from '@react-mock/localstorage';
import { fireEvent, render, screen } from '@testing-library/react';
import { BrowserRouter } from 'react-router-dom';

import { KEY_STORAGE } from 'src/shared/storage/storage';

import { MyPokemon } from './MyPokemon';

const KEY_VALUE = '[{"name":"ivysaur","nickname":"ivy","sprites":"http"}]';

describe('when entering MyPokemon page', () => {
    it('should render MyPokemon page', () => {
        render(
            <BrowserRouter>
                <MyPokemon />
            </BrowserRouter>
        );

        expect(screen.getByTestId('MyPokemonPage')).toBeInTheDocument();
    });

    describe('when localStorage is empty', () => {
        it('should show MyPokemon page with empty message component', () => {
            render(
                <LocalStorageMock>
                    <BrowserRouter>
                        <MyPokemon />
                    </BrowserRouter>
                </LocalStorageMock>
            );

            expect(screen.getByTestId('EmptyMessageComponent')).toBeInTheDocument();
        });
    });

    describe('when localStorage has data', () => {
        it('should show MyPokemon list', () => {
            render(
                <LocalStorageMock
                    items={{
                        [KEY_STORAGE]: KEY_VALUE,
                    }}
                >
                    <BrowserRouter>
                        <MyPokemon />
                    </BrowserRouter>
                </LocalStorageMock>
            );

            expect(window.localStorage.getItem(KEY_STORAGE)).toBe(KEY_VALUE);
            expect(screen.getByTestId('PokemonCardComponent')).toBeInTheDocument();
        });
    });

    describe('when trying to release pokemon', () => {
        it('should show confirmation modal', () => {
            render(
                <LocalStorageMock
                    items={{
                        [KEY_STORAGE]: KEY_VALUE,
                    }}
                >
                    <BrowserRouter>
                        <MyPokemon />
                    </BrowserRouter>
                </LocalStorageMock>
            );
            let releaseConfirmationButton = screen.getByTestId('ReleaseConfirmationButton');
            fireEvent.click(releaseConfirmationButton);

            expect(screen.getByTestId('ModalComponent')).toBeInTheDocument();
        });

        describe('when click cancel release button', () => {
            it('should close confirmation modal and MyPokemon data is not change', () => {
                render(
                    <LocalStorageMock
                        items={{
                            [KEY_STORAGE]: KEY_VALUE,
                        }}
                    >
                        <BrowserRouter>
                            <MyPokemon />
                        </BrowserRouter>
                    </LocalStorageMock>
                );

                let releaseConfirmationButton = screen.getByTestId('ReleaseConfirmationButton');
                fireEvent.click(releaseConfirmationButton);
                let cancelReleaseButton = screen.getByTestId('CancelReleaseButton');
                fireEvent.click(cancelReleaseButton);

                expect(screen.queryByText('ModalComponent')).not.toBeInTheDocument();
                expect(window.localStorage.getItem(KEY_STORAGE)).toBe(KEY_VALUE);
            });
        });

        describe('when click release button', () => {
            it('should close confirmation modal and MyPokemon data is changed', () => {
                render(
                    <LocalStorageMock
                        items={{
                            [KEY_STORAGE]: KEY_VALUE,
                        }}
                    >
                        <BrowserRouter>
                            <MyPokemon />
                        </BrowserRouter>
                    </LocalStorageMock>
                );

                let releaseConfirmationButton = screen.getByTestId('ReleaseConfirmationButton');
                fireEvent.click(releaseConfirmationButton);
                let releaseButton = screen.getByTestId('ReleaseButton');
                fireEvent.click(releaseButton);

                expect(screen.queryByText('ModalComponent')).not.toBeInTheDocument();
                expect(window.localStorage.getItem(KEY_STORAGE)).toBe('[]');
            });
        });
    });
});
