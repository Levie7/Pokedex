import { ApolloClient, ApolloProvider, InMemoryCache, gql, useQuery } from '@apollo/client';

export const CLIENT = new ApolloClient({
    uri: 'https://graphql-pokeapi.vercel.app/api/graphql',
    cache: new InMemoryCache(),
});

export { ApolloProvider as GraphqlProvider };
export { gql, useQuery };
