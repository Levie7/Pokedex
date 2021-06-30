import * as React from 'react';

import { MyPokemon } from 'src/core/interfaces';
import { RouteComponentProps } from 'src/core/route';
import { css } from 'src/core/style';

import POKEBALL_CATCH_IMAGE from 'src/shared/assets/pokeball-catch.png';
import { Button } from 'src/shared/components/Button';
import { Chip } from 'src/shared/components/Chip';
import { Divider } from 'src/shared/components/Divider';
import { EmptyMessage } from 'src/shared/components/EmptyMessage';
import { Loader } from 'src/shared/components/Loader';
import { Page } from 'src/shared/components/Page';
import { Picture } from 'src/shared/components/Picture';
import { TextExpand } from 'src/shared/components/TextExpand';
import { KEY_STORAGE } from 'src/shared/storage/storage';
import { COLOR, FLEX } from 'src/shared/styles';
import { PokemonCatchModal } from './PokemonCatchModal';

import { POKEMON_TYPE_COLOR_MAPPER } from './pokemonTypeColorMapper';
import { getPokemonDetail } from './schema.gql';

export const PokemonDetail = React.memo<any>(
    ({ location, match }: RouteComponentProps<{ name: string }>) => {
        const { loading, error, data } = getPokemonDetail({
            variables: {
                name: match.params.name,
            },
        });
        let [showModal, setShowModal] = React.useState(false);
        let [isCaught, setIsCaught] = React.useState(0);
        let [errorMessage, setErrorMessage] = React.useState('');

        if (loading) return <Loader />;
        if (error)
            return <EmptyMessage message={`Error! ${error.message}, please contact our support`} />;

        function getCovertedId(id?: number) {
            let newId = '' + id;
            let pad = '0000';

            return pad.substring(0, pad.length - newId.length) + newId;
        }

        function handleCatch() {
            let caught = Math.floor(Math.random() * 2);
            setErrorMessage('');
            setShowModal(true);
            setIsCaught(caught);
        }

        function handleCloseModal() {
            setShowModal(false);
        }

        function handleSave() {
            let myPokemonStorage = localStorage.getItem(KEY_STORAGE);
            let newPokemonNickname = (document.getElementById('nickname') as HTMLInputElement)
                .value;
            let pokemonValue = {
                name: pokemonName,
                nickname: newPokemonNickname,
                sprites: pokemonSprites,
            };

            if (myPokemonStorage) {
                let myPokemon = JSON.parse(myPokemonStorage);
                let isDuplicatePokemon = myPokemon.find(
                    (pokemon: MyPokemon) =>
                        pokemon.name === pokemonName && pokemon.nickname === newPokemonNickname
                );
                if (isDuplicatePokemon) {
                    setErrorMessage('Nickname has been used!');
                } else {
                    myPokemon.push(pokemonValue);
                    handleSetItem(myPokemon);
                }
            } else {
                handleSetItem([pokemonValue]);
            }
        }

        function handleSetItem(value: any) {
            localStorage.setItem(KEY_STORAGE, JSON.stringify(value));
            handleCloseModal();
        }

        function renderBaseInfo({ name, value }: { name: string; value: string }) {
            return (
                <div className='col-4' key={name}>
                    <div
                        css={css`
                            color: ${baseTypeColor};
                            font-size: 20px;
                        `}
                    >
                        {value}
                    </div>
                    <span
                        css={css`
                            ${COLOR.gray_light}
                            font-size: 10px;
                            text-transform: capitalize;
                        `}
                    >
                        {name}
                    </span>
                </div>
            );
        }

        let result = data?.pokemon;
        if (!result || (result && !result.id)) {
            return (
                <Page
                    customBackgroundStyle={css`
                        z-index: 1;
                    `}
                    hideFooter
                    path='/'
                    withGoBack
                >
                    <EmptyMessage message={`Pokémon is not found`} />
                </Page>
            );
        }

        let baseTypeColor = POKEMON_TYPE_COLOR_MAPPER[result.types[0].type.name];
        let pokemonSprites = result.sprites.front_default;
        let pokemonName = result.name;
        let pokemonBaseExp = result.base_experience.toString();
        let pokemonHeight = result.height / 10 + ' m';
        let pokemonWeight = result.height / 10 + ' kg';

        let baseUrl = location.state ? (location as any).state.baseUrl : '/';

        return (
            <Page
                customBackgroundStyle={css`
                    z-index: 1;
                `}
                hideFooter
                path={baseUrl}
                withGoBack
            >
                {showModal && (
                    <PokemonCatchModal
                        catchStatus={isCaught}
                        errorMessage={errorMessage}
                        name={pokemonName}
                        sprites={pokemonSprites}
                        handleSave={handleSave}
                        handleCloseModal={handleCloseModal}
                    />
                )}
                <div
                    className='px-3'
                    css={css`
                        width: 100%;
                        z-index: 2;
                        position: fixed;
                        top: 0;
                        left: 0;
                        right: 0;
                        margin-top: 3rem;
                        ${FLEX.display};
                        ${FLEX.align.center};
                        ${FLEX.justify.around};
                        ${COLOR.white};
                        @media only screen and (min-width: 600px) {
                            width: 720px;
                            margin: 3rem auto;
                        }
                    `}
                >
                    <Picture alt='Pokemon' src={pokemonSprites} width={130} />
                    <div>
                        <h1
                            css={css`
                                text-transform: capitalize;
                            `}
                        >
                            {pokemonName}
                        </h1>
                        <Chip className='w-75'>#{getCovertedId(result.id)}</Chip>
                    </div>
                </div>
                <div
                    css={css`
                        padding-top: 45vw;

                        @media only screen and (min-width: 600px) {
                            padding-top: 22vw;
                        }
                        @media only screen and (min-width: 1000px) {
                            padding-top: 12vw;
                        }
                    `}
                >
                    <div
                        css={css`
                            ${FLEX.display};
                            ${FLEX.wrap};
                            ${FLEX.justify.center};
                        `}
                    >
                        {result.types.map(({ type }) => (
                            <div
                                className='col-6 p-3'
                                css={css`
                                    ${FLEX.display};
                                    text-transform: capitalize;
                                `}
                                key={type.name}
                            >
                                <Chip
                                    customStyle={css`
                                        background: ${POKEMON_TYPE_COLOR_MAPPER[type.name]};
                                    `}
                                >
                                    {type.name}
                                </Chip>
                            </div>
                        ))}
                    </div>
                    <div
                        css={css`
                            ${FLEX.display};
                            ${FLEX.justify.around};
                            text-align: center;
                            font-weight: bold;
                        `}
                    >
                        {renderBaseInfo({ name: 'Base Experience', value: pokemonBaseExp })}
                        <Divider color={baseTypeColor} />
                        {renderBaseInfo({ name: 'Height', value: pokemonHeight })}
                        <Divider color={baseTypeColor} />
                        {renderBaseInfo({ name: 'Weight', value: pokemonWeight })}
                    </div>
                    <h5
                        className='my-3'
                        css={css`
                            text-align: center;
                            color: ${baseTypeColor};
                        `}
                    >
                        Base Stats
                    </h5>
                    <div
                        css={css`
                            ${FLEX.display};
                            ${FLEX.wrap};
                            ${FLEX.justify.around};
                            text-align: center;
                            font-weight: bold;
                        `}
                    >
                        {result.stats.map(({ base_stat, stat: { name } }) =>
                            renderBaseInfo({ name, value: base_stat.toString() })
                        )}
                    </div>
                    <h5
                        className='my-3'
                        css={css`
                            text-align: center;
                            color: ${baseTypeColor};
                        `}
                    >
                        Moves
                    </h5>
                    <TextExpand lines={15}>
                        <ul
                            className='py-4'
                            css={css`
                                ${FLEX.display};
                                ${FLEX.wrap};
                                border: 4px dashed lightgray;
                                border-radius: 20px;
                                font-size: 14px;
                            `}
                        >
                            {result.moves.map(({ move }) => (
                                <li
                                    className='col-6 p-1'
                                    css={css`
                                        display: table-cell;
                                        color: ${baseTypeColor};
                                    `}
                                    key={move.name}
                                >
                                    {move.name}
                                </li>
                            ))}
                        </ul>
                    </TextExpand>
                </div>
                <Button
                    css={css`
                        background: none;
                        box-shadow: none;
                        position: fixed;
                        bottom: 10%;
                        right: 0;
                        text-align: center;

                        @media only screen and (min-width: 1000px) {
                            right: 25%;
                        }
                    `}
                    dataTestId='CatchButton'
                    onClick={() => handleCatch()}
                >
                    <Picture alt='Pokeball Catch' src={POKEBALL_CATCH_IMAGE} width={80} />
                    <Chip
                        customStyle={css`
                            background: linear-gradient(
                                180deg,
                                rgba(91, 91, 91, 1) 0%,
                                rgba(46, 46, 46, 1) 100%
                            );
                        `}
                    >
                        Catch
                    </Chip>
                </Button>
            </Page>
        );
    }
);
