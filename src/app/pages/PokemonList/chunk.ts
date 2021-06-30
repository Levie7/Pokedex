import { suspend } from 'src/core/chunk';

import { Loader } from 'src/shared/components/Loader';

export const PokemonList = suspend({
    component: () => import(/* webpackChunkName: "PokemonList" */ './index'),
    renderWhileLoading: Loader,
});
