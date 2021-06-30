import { suspend } from 'src/core/chunk';

import { Loader } from 'src/shared/components/Loader';

export const MyPokemon = suspend({
    component: () => import(/* webpackChunkName: "MyPokemon" */ './index'),
    renderWhileLoading: Loader,
});
