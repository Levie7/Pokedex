import { Provider } from 'react-redux';

import { CLIENT, GraphqlProvider } from 'src/core/graphql';

import { store } from 'src/shared/storage/store';

import { Routes } from './Routes';

export const App = () => {
    return (
        <Provider store={store}>
            <GraphqlProvider client={CLIENT}>
                <Routes />
            </GraphqlProvider>
        </Provider>
    );
};
