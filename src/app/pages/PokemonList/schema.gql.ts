import { gql, useQuery } from 'src/core/graphql';
import { PokemonList } from 'src/core/interfaces';

export const GET_POKEMONS = gql`
    query pokemons($limit: Int, $offset: Int) {
        pokemons(limit: $limit, offset: $offset) {
            count
            results {
                name
                artwork
            }
        }
    }
`;

export const GetPokemons = (options: any) =>
    useQuery<{ pokemons: PokemonList }>(GET_POKEMONS, options);
