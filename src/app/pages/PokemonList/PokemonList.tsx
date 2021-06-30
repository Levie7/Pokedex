import * as React from 'react';
import { useDispatch, useSelector } from 'react-redux';

import { PokemonItem, PokemonList as PokemonListProps } from 'src/core/interfaces';
import { css } from 'src/core/style';
import { Button } from 'src/shared/components/Button';

import { EmptyMessage } from 'src/shared/components/EmptyMessage';
import { Link } from 'src/shared/components/Link';
import { Loader } from 'src/shared/components/Loader';
import { Page } from 'src/shared/components/Page';
import { PokemonCard } from 'src/shared/components/PokemonCard';
import { PokemonTotalChip } from 'src/shared/components/PokemonTotalChip';
import { KEY_STORAGE } from 'src/shared/storage/storage';
import { BACKGROUND, FLEX } from 'src/shared/styles';

import { getPokemons } from './schema.gql';
import { fetchPokemons } from './pokemonsReducer';

const LIMIT = 20;

export const PokemonList = React.memo<any>(() => {
    let [page, setPage] = React.useState(0);
    let { error, data, loading, fetchMore } = getPokemons({
        variables: {
            limit: LIMIT,
            offset: 0,
        },
        onCompleted(data: { pokemons: PokemonListProps }) {
            let result = data?.pokemons;
            dispatch(fetchPokemons(result.results));
        },
    });

    let pokemonList: PokemonItem[] = useSelector((state: any) => state.pokemonList.pokemons);
    let dispatch = useDispatch();

    if (loading) return <Loader />;
    if (error)
        return <EmptyMessage message={`Error! ${error.message}, please contact our support`} />;

    let result = data?.pokemons;
    if (!pokemonList.length || (result && !result.count)) {
        return <EmptyMessage message={`Pokémon list is empty, please contact our support`} />;
    }

    let myPokemonStorage = localStorage.getItem(KEY_STORAGE);
    let myPokemon = 0;
    if (myPokemonStorage) {
        myPokemon = JSON.parse(myPokemonStorage).length;
    }

    function handleLoadMore() {
        setPage((page += LIMIT));

        fetchMore({
            variables: {
                limit: LIMIT,
                offset: page,
            },
            updateQuery: (prev, { fetchMoreResult }) => {
                dispatch(fetchPokemons(fetchMoreResult?.pokemons.results));

                return Object.assign({}, prev, {
                    pokemons: { ...prev.pokemons, ...fetchMoreResult?.pokemons },
                });
            },
        });
    }

    function renderOwnedChip(result?: PokemonListProps) {
        return <PokemonTotalChip value={`${myPokemon} / ${result?.count}`} />;
    }

    return (
        <Page dataTestId='PokemonListPage' customHeader={renderOwnedChip(result)}>
            <div
                className='p-2 mb-5'
                css={css`
                    ${FLEX.display};
                    ${FLEX.wrap};
                    margin-top: 15vw;

                    @media only screen and (min-width: 600px) {
                        margin-top: 5vw;
                    }
                `}
            >
                {pokemonList.map(({ artwork, name }, index) => (
                    <Link
                        className='col-6 col-sm-3 p-2'
                        css={css`
                            ${FLEX.display};
                        `}
                        to={`/${name}`}
                        key={index}
                    >
                        <PokemonCard name={name} image={{ alt: name, src: artwork }} />
                    </Link>
                ))}
                <Button
                    className='w-100'
                    css={css`
                        ${BACKGROUND.gray_light}
                    `}
                    dataTestId='LoadMoreButton'
                    onClick={handleLoadMore}
                >
                    Load More
                </Button>
            </div>
        </Page>
    );
});
