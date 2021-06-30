import * as React from 'react';

import { MyPokemon as MyPokemonProps } from 'src/core/interfaces';
import { Link } from 'src/core/route';
import { css } from 'src/core/style';

import { Button } from 'src/shared/components/Button';
import { Chip } from 'src/shared/components/Chip';
import { EmptyMessage } from 'src/shared/components/EmptyMessage';
import { Modal } from 'src/shared/components/Modal';
import { Page } from 'src/shared/components/Page';
import { PokemonCard } from 'src/shared/components/PokemonCard';
import { PokemonTotalChip } from 'src/shared/components/PokemonTotalChip';
import { KEY_STORAGE } from 'src/shared/storage/storage';
import { FLEX } from 'src/shared/styles';

export const MyPokemon = React.memo<any>(() => {
    let myPokemonStorage = localStorage.getItem(KEY_STORAGE);
    let [showModal, setShowModal] = React.useState(false);
    let [selectedPokemon, setPokemon] = React.useState({ name: '', nickname: '' });

    if (!myPokemonStorage || (myPokemonStorage && !JSON.parse(myPokemonStorage).length)) {
        return (
            <Page dataTestId='MyPokemonPage'>
                <EmptyMessage message={`My Pokémon list is empty, let's catch some`} />
            </Page>
        );
    }

    let myPokemon = JSON.parse(myPokemonStorage);

    function handleCloseModal() {
        setShowModal(false);
    }

    function handleRelease({ name, nickname }: { name: string; nickname: string }) {
        setShowModal(true);
        setPokemon({ name, nickname });
    }

    function setRelease() {
        myPokemonStorage = localStorage.getItem(KEY_STORAGE);
        myPokemon = JSON.parse(myPokemonStorage!);

        let newMyPokemon = myPokemon.filter(
            (pokemon: MyPokemonProps) =>
                pokemon.name !== selectedPokemon.name ||
                pokemon.nickname !== selectedPokemon.nickname
        );
        localStorage.setItem(KEY_STORAGE, JSON.stringify(newMyPokemon));
        handleCloseModal();
    }

    function renderTotalChip() {
        return <PokemonTotalChip value={`Total: ${myPokemon.length}`} />;
    }

    return (
        <Page dataTestId='MyPokemonPage' header='My Pokémon' customHeader={renderTotalChip()}>
            {showModal && (
                <Modal onClose={handleCloseModal}>
                    <div
                        className='my-4 px-3'
                        css={css`
                            font-weight: bold;
                        `}
                    >
                        Are you sure want to release{' '}
                        <span
                            css={css`
                                text-transform: capitalize;
                            `}
                        >
                            {selectedPokemon.nickname}
                        </span>{' '}
                        ?
                    </div>
                    <Button
                        className='w-100'
                        dataTestId='CancelReleaseButton'
                        onClick={handleCloseModal}
                    >
                        Cancel
                    </Button>
                    <Button
                        className='w-100 my-2'
                        dataTestId='ReleaseButton'
                        onClick={setRelease}
                        textOnly
                    >
                        Release
                    </Button>
                </Modal>
            )}
            <div
                className='mb-5'
                css={css`
                    ${FLEX.display};
                    ${FLEX.wrap};
                    padding-top: 15vw;

                    @media only screen and (min-width: 600px) {
                        padding-top: 5vw;
                    }
                `}
            >
                {myPokemon.map((pokemon: MyPokemonProps) => (
                    <div
                        className='col-4 col-sm-3 p-2'
                        css={css`
                            ${FLEX.display};
                            ${FLEX.align.center};
                            ${FLEX.direction.column};
                        `}
                        key={pokemon.name + '-' + pokemon.nickname}
                    >
                        <Link
                            css={css`
                                ${FLEX.display};
                                font-size: 10px;
                            `}
                            to={{ pathname: `/${pokemon.name}`, state: { baseUrl: '/my-pokemon' } }}
                        >
                            <PokemonCard
                                name={pokemon.nickname}
                                image={{ alt: pokemon.name, src: pokemon.sprites }}
                            />
                        </Link>
                        <Button
                            className='w-100'
                            css={css`
                                background: none;
                                box-shadow: none;
                                margin-top: 0.25rem;
                            `}
                            dataTestId='ReleaseConfirmationButton'
                            onClick={() =>
                                handleRelease({ name: pokemon.name, nickname: pokemon.nickname })
                            }
                        >
                            <Chip
                                customStyle={css`
                                    background: linear-gradient(
                                        180deg,
                                        rgba(91, 91, 91, 1) 0%,
                                        rgba(46, 46, 46, 1) 100%
                                    );
                                `}
                            >
                                Release
                            </Chip>
                        </Button>
                    </div>
                ))}
            </div>
        </Page>
    );
});
