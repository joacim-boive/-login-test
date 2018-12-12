import { applyMiddleware, compose, createStore } from 'redux';
import thunk from 'redux-thunk';
import { routerMiddleware } from 'react-router-redux';

import { persistReducer, persistStore } from 'redux-persist';
import storage from 'redux-persist/lib/storage/session';
import autoMergeLevel2 from 'redux-persist/lib/stateReconciler/autoMergeLevel2';
import rootReducer from './rootReducer';
import history from './history';

const persistConfig = {
    key: 'root',
    storage,
    stateReconciler: autoMergeLevel2,
};

const router = routerMiddleware(history);

// NOTE: Do not change middlewares declaration pattern since rekit plugins may register middlewares to it.
const middlewares = [thunk, router];

let devToolsExtension = f => f;

/* istanbul ignore if  */
if (window.EcsterConfig.environment === 'development') {
    const { createLogger } = require('redux-logger');

    const logger = createLogger({ collapsed: true });
    middlewares.push(logger);

    // eslint-disable-next-line no-underscore-dangle
    if (window.__REDUX_DEVTOOLS_EXTENSION__) {
        // eslint-disable-next-line no-underscore-dangle
        devToolsExtension = window.__REDUX_DEVTOOLS_EXTENSION__() || compose;
    }
}

const pReducer = persistReducer(persistConfig, rootReducer);

const store = createStore(
    pReducer,
    compose(
        applyMiddleware(...middlewares),
        devToolsExtension
    )
);

// Don't remove this as this is what actually persists changes to disk.
// We can also utilize this to only render the GUI once the store is available:
// https://github.com/rt2zz/redux-persist/blob/master/docs/PersistGate.md
export const persistor = persistStore(store);

export default function configureStore() {
    // Don't to hot reloading here - it's not supported for stores anyway
    return store;
}
