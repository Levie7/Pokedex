import { MockedProvider } from '@apollo/client/testing';
import { ApolloProvider } from '@apollo/client';
import { LocalStorageMock } from '@react-mock/localstorage';
import { cleanup, fireEvent, render, screen } from '@testing-library/react';
import { createMockClient } from 'mock-apollo-client';
import { Provider } from 'react-redux';
import { BrowserRouter } from 'react-router-dom';
import { store } from 'src/shared/storage/store';

import { PokemonDetail } from './PokemonDetail';
import { GET_POKEMON_DETAIL } from './schema.gql';
import { KEY_STORAGE } from 'src/shared/storage/storage';

const KEY_VALUE = '[{"name":"ivysaur","nickname":"ivy","sprites":"http"}]';
const MOCK_MATH = Object.create(global.Math);
MOCK_MATH.floor = () => 1;
global.Math = MOCK_MATH;

let mockClient = createMockClient();
let emptyClient = createMockClient();
let mockPokemon = {
    height: 20,
    base_experience: 20,
    id: 1,
    moves: [
        {
            move: {
                name: 'asd',
            },
        },
    ],
    name: 'ivysaur',
    sprites: {
        front_default: 'http//ivysaur.png',
    },
    stats: [
        {
            base_stat: 3,
            stat: {
                name: 'hp',
            },
        },
    ],
    types: [
        {
            type: {
                name: 'fire',
            },
        },
    ],
    weight: 10,
};
let props = {
    location: { state: '/my-pokemon' },
    match: { params: { name: 'ivysaur' } },
};
let locationStatelessProps = {
    location: { pathname: '/' },
    match: { params: { name: 'ivysaur' } },
};
let emptyResultProps = {
    match: { params: { name: 'ivy' } },
};

mockClient.setRequestHandler(GET_POKEMON_DETAIL, () =>
    Promise.resolve({ data: { pokemon: mockPokemon } })
);
emptyClient.setRequestHandler(GET_POKEMON_DETAIL, () => Promise.resolve({ data: undefined }));

afterEach(cleanup);

test('when entering PokemonDetail page', () => {
    render(
        <Provider store={store}>
            <ApolloProvider client={mockClient}>
                <BrowserRouter>
                    <PokemonDetail {...props} />
                </BrowserRouter>
            </ApolloProvider>
        </Provider>
    );

    expect(screen.getByTestId('LoaderComponent')).toBeInTheDocument();
});

test('when data is loaded, it should show pokemon detail', () => {
    render(
        <Provider store={store}>
            <ApolloProvider client={mockClient}>
                <BrowserRouter>
                    <PokemonDetail {...props} />
                </BrowserRouter>
            </ApolloProvider>
        </Provider>
    );

    expect(screen.queryByText(/ivysaur/i)).toBeInTheDocument();
});

test('when data is loaded, and does not have location state', () => {
    render(
        <Provider store={store}>
            <ApolloProvider client={mockClient}>
                <BrowserRouter>
                    <PokemonDetail {...locationStatelessProps} />
                </BrowserRouter>
            </ApolloProvider>
        </Provider>
    );

    expect(screen.queryByText(/ivysaur/i)).toBeInTheDocument();
});

test('when data is loaded, but its empty', () => {
    render(
        <Provider store={store}>
            <ApolloProvider client={emptyClient}>
                <BrowserRouter>
                    <PokemonDetail {...emptyResultProps} />
                </BrowserRouter>
            </ApolloProvider>
        </Provider>
    );

    expect(screen.queryByText(/ivy/i)).not.toBeInTheDocument();
});

test('when trying to catch pokemon, it should show modal component', () => {
    render(
        <Provider store={store}>
            <ApolloProvider client={mockClient}>
                <BrowserRouter>
                    <PokemonDetail {...props} />
                </BrowserRouter>
            </ApolloProvider>
        </Provider>
    );

    let catchButton = screen.getByTestId('CatchButton');
    fireEvent.click(catchButton);

    expect(screen.getByText(/Perfect/i)).toBeInTheDocument();
    expect(screen.getByTestId('ModalComponent')).toBeInTheDocument();
});

test('when trying to save first pokemon', () => {
    render(
        <Provider store={store}>
            <ApolloProvider client={mockClient}>
                <BrowserRouter>
                    <PokemonDetail {...props} />
                </BrowserRouter>
            </ApolloProvider>
        </Provider>
    );

    let catchButton = screen.getByTestId('CatchButton');
    fireEvent.click(catchButton);

    let saveButton = screen.getByTestId('SaveButton');
    fireEvent.click(saveButton);

    expect(screen.queryByTestId('ModalComponent')).not.toBeInTheDocument();
});

test('when trying to save second', () => {
    render(
        <Provider store={store}>
            <ApolloProvider client={mockClient}>
                <LocalStorageMock
                    items={{
                        [KEY_STORAGE]: KEY_VALUE,
                    }}
                >
                    <BrowserRouter>
                        <PokemonDetail {...props} />
                    </BrowserRouter>
                </LocalStorageMock>
            </ApolloProvider>
        </Provider>
    );

    let catchButton = screen.getByTestId('CatchButton');
    fireEvent.click(catchButton);

    let saveButton = screen.getByTestId('SaveButton');
    fireEvent.click(saveButton);

    expect(screen.queryByTestId('ModalComponent')).not.toBeInTheDocument();
});

test('when trying to save second, but the nickname is duplicate', () => {
    render(
        <Provider store={store}>
            <ApolloProvider client={mockClient}>
                <LocalStorageMock
                    items={{
                        [KEY_STORAGE]: KEY_VALUE,
                    }}
                >
                    <BrowserRouter>
                        <PokemonDetail {...props} />
                    </BrowserRouter>
                </LocalStorageMock>
            </ApolloProvider>
        </Provider>
    );

    let catchButton = screen.getByTestId('CatchButton');
    fireEvent.click(catchButton);

    let inputNickname = screen.getByTestId('InputNickname');
    fireEvent.change(inputNickname, { target: { value: 'ivy' } });

    let saveButton = screen.getByTestId('SaveButton');
    fireEvent.click(saveButton);

    expect(screen.queryByTestId('ErrorMessage')).toBeInTheDocument();
    expect(screen.queryByTestId('ModalComponent')).toBeInTheDocument();
});

test('when requesting has an error', async () => {
    render(
        <Provider store={store}>
            <MockedProvider mocks={[]} addTypename={false}>
                <BrowserRouter>
                    <PokemonDetail {...props} />
                </BrowserRouter>
            </MockedProvider>
        </Provider>
    );
    await new Promise((resolve) => setTimeout(resolve, 0));

    expect(screen.getByText(/Error!/i)).toBeInTheDocument();
});
