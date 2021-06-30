import * as React from 'react';

import { css } from 'src/core/style';
import { Button } from 'src/shared/components/Button';
import { Input } from 'src/shared/components/Input';
import { Modal } from 'src/shared/components/Modal';

import { Picture } from 'src/shared/components/Picture';
import { COLOR } from 'src/shared/styles';

interface PokemonCatchModalProps {
    errorMessage?: string;
    catchStatus?: number;
    name: string;
    sprites: string;

    handleCloseModal: () => void;
    handleSave: () => void;
}

export const PokemonCatchModal = React.memo<PokemonCatchModalProps>(
    ({ errorMessage, handleCloseModal, handleSave, catchStatus: isSuccess, name, sprites }) => {
        function renderDefaultCatch({ message, title }: { message: string; title: string }) {
            return (
                <>
                    <h2>{title}</h2>
                    <div
                        css={css`
                            ${COLOR.gray_light}
                            font-size: 12px;
                            font-weight: bold;
                        `}
                    >
                        <Picture alt='Pokemon' src={sprites} />
                        <span
                            css={css`
                                text-transform: capitalize;
                                margin-bottom: 0.5rem;
                            `}
                        >
                            {name}
                        </span>{' '}
                        {message}
                    </div>
                </>
            );
        }

        function renderCaughtPokemon() {
            return (
                <>
                    {renderDefaultCatch({ message: 'has been caught', title: 'Perfect !' })}
                    <div className='my-3'>
                        <Input
                            dataTestId='InputNickname'
                            name='nickname'
                            placeholder='Give me a nickname'
                            type='text'
                            id='nickname'
                            maxLength={12}
                        />
                        <div
                            css={css`
                                color: red;
                                font-size: 10px;
                            `}
                            data-testid='ErrorMessage'
                        >
                            {errorMessage}
                        </div>
                    </div>
                    <Button className='w-100' dataTestId='SaveButton' onClick={handleSave}>
                        Save
                    </Button>
                </>
            );
        }

        function renderCaughtPokemonFailed() {
            return (
                <>
                    {renderDefaultCatch({ message: 'has run away', title: 'Oops !' })}
                    <Button
                        css={css`
                            margin-top: 0.5rem;
                        `}
                        className='w-100 py-2'
                        dataTestId='CloseButton'
                        onClick={handleCloseModal}
                    >
                        Close
                    </Button>
                </>
            );
        }

        return (
            <Modal onClose={handleCloseModal}>
                {isSuccess ? renderCaughtPokemon() : renderCaughtPokemonFailed()}
            </Modal>
        );
    }
);
