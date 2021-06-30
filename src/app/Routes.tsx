import React from 'react';

import { Route, Router } from 'src/core/route';

import { MyPokemon } from './pages/MyPokemon/chunk';
import { PokemonDetail } from './pages/PokemonDetail/chunk';
import { PokemonList } from './pages/PokemonList/chunk';

export const Routes = () => (
    <Router>
        <Route component={PokemonList} exact path='/' />
        <Route component={MyPokemon} exact path='/my-pokemon' />
        <Route component={PokemonDetail} exact path='/:name' />
    </Router>
);
