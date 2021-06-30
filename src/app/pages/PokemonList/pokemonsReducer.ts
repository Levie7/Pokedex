import { createSlice } from '@reduxjs/toolkit';
import { PokemonItem } from 'src/core/interfaces';

const INITIAL_STATE: { pokemons: PokemonItem[] } = { pokemons: [] };

export const pokemons = createSlice({
    name: 'fetchPokemons',
    initialState: INITIAL_STATE,
    reducers: {
        fetchPokemons: (state, action) => {
            state.pokemons = [...state.pokemons, ...action.payload];
        },
    },
});

export const { fetchPokemons } = pokemons.actions;

export default pokemons.reducer;
