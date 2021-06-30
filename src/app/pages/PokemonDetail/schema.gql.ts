import { gql, useQuery } from 'src/core/graphql';
import { Pokemon } from 'src/core/interfaces';

export const GET_POKEMON_DETAIL = gql`
    query pokemon($name: String!) {
        pokemon(name: $name) {
            height
            base_experience
            id
            moves {
                move {
                    name
                }
            }
            name
            sprites {
                front_default
            }
            stats {
                base_stat
                stat {
                    name
                }
            }
            types {
                type {
                    name
                }
            }
            weight
        }
    }
`;

export const getPokemonDetail = (options: any) =>
    useQuery<{ pokemon: Pokemon }>(GET_POKEMON_DETAIL, options);
