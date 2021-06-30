import { suspend } from 'src/core/chunk';

import { Loader } from 'src/shared/components/Loader';

export const PokemonDetail = suspend({
    component: () => import(/* webpackChunkName: "PokemonDetail" */ './index'),
    renderWhileLoading: Loader,
});
