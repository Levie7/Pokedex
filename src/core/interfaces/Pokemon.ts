export interface MyPokemon {
    name: string;
    nickname: string;
    sprites: string;
}

export interface Pokemon {
    base_experience: number;
    height: number;
    id: number;
    moves: PokemonMove[];
    name: string;
    sprites: { front_default: string };
    stats: PokemonStat[];
    types: PokemonType[];
    weight: number;
}

export interface PokemonItem {
    id: number;
    artwork: string;
    name: string;
}

export interface PokemonList {
    count: number;
    results: PokemonItem[];
}

export interface PokemonListPayload {
    limit: number;
    offset: number;
}

interface PokemonMove {
    move: { name: string };
}

interface PokemonType {
    type: { name: string };
}

interface PokemonStat {
    base_stat: number;
    stat: { name: string };
}
