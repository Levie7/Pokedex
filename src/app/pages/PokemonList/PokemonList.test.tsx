import { MockedProvider } from '@apollo/client/testing';
import { ApolloProvider } from '@apollo/client';
import { LocalStorageMock } from '@react-mock/localstorage';
import { cleanup, fireEvent, render, screen } from '@testing-library/react';
import { createMockClient } from 'mock-apollo-client';
import { Provider } from 'react-redux';
import { BrowserRouter } from 'react-router-dom';
import { KEY_STORAGE } from 'src/shared/storage/storage';
import { store } from 'src/shared/storage/store';

import { PokemonList } from './PokemonList';
import { GET_POKEMONS } from './schema.gql';

const KEY_VALUE = '[{"name":"ivysaur","nickname":"ivy","sprites":"http"}]';

let mockClient = createMockClient();
let mockPokemons = {
    count: 2,
    results: [
        {
            name: 'bulbasaur',
            artwork: 'http://bulbasaur.png',
        },
        {
            name: 'charmender',
            artwork: 'http://charmender.png',
        },
    ],
};

mockClient.setRequestHandler(GET_POKEMONS, () =>
    Promise.resolve({ data: { pokemons: mockPokemons } })
);

afterEach(cleanup);
test('when entering PokemonList page', () => {
    render(
        <Provider store={store}>
            <ApolloProvider client={mockClient}>
                <BrowserRouter>
                    <PokemonList />
                </BrowserRouter>
            </ApolloProvider>
        </Provider>
    );

    expect(screen.getByTestId('LoaderComponent')).toBeInTheDocument();
});

test('when data is loaded, it should update pokemon count', () => {
    render(
        <Provider store={store}>
            <ApolloProvider client={mockClient}>
                <BrowserRouter>
                    <PokemonList />
                </BrowserRouter>
            </ApolloProvider>
        </Provider>
    );

    expect(screen.queryByText('0 / 2')).toBeInTheDocument();
});

test('when data is loaded, it should get owned pokemon from localStorage', () => {
    render(
        <Provider store={store}>
            <ApolloProvider client={mockClient}>
                <LocalStorageMock
                    items={{
                        [KEY_STORAGE]: KEY_VALUE,
                    }}
                >
                    <BrowserRouter>
                        <PokemonList />
                    </BrowserRouter>
                </LocalStorageMock>
            </ApolloProvider>
        </Provider>
    );

    expect(screen.queryByText('1 / 2')).toBeInTheDocument();
    expect(window.localStorage.getItem(KEY_STORAGE)).toBe(KEY_VALUE);
});

test('when trying to load more pokemon', () => {
    render(
        <Provider store={store}>
            <ApolloProvider client={mockClient}>
                <LocalStorageMock
                    items={{
                        [KEY_STORAGE]: KEY_VALUE,
                    }}
                >
                    <BrowserRouter>
                        <PokemonList />
                    </BrowserRouter>
                </LocalStorageMock>
            </ApolloProvider>
        </Provider>
    );

    let loadMoreButton = screen.getByTestId('LoadMoreButton');
    fireEvent.click(loadMoreButton);

    expect(screen.queryByText('1 / 2')).toBeInTheDocument();
});

test('when requesting has an error', async () => {
    render(
        <Provider store={store}>
            <MockedProvider mocks={[]} addTypename={false}>
                <BrowserRouter>
                    <PokemonList />
                </BrowserRouter>
            </MockedProvider>
        </Provider>
    );
    await new Promise((resolve) => setTimeout(resolve, 0));

    expect(screen.getByText(/Error!/i)).toBeInTheDocument();
});
