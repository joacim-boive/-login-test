import { createStore, applyMiddleware, compose } from 'redux';
import thunk from 'redux-thunk';
import { routerMiddleware } from 'react-router-redux';
import history from './history';
import rootReducer from './rootReducer';
import { saveReduxState, removeReduxState } from './sessionStoredState';

const router = routerMiddleware(history);

// NOTE: Do not change middleares delaration pattern since rekit plugins may register middlewares to it.
const middlewares = [thunk, router];

let devToolsExtension = f => f;

/* istanbul ignore if  */
if (window.ECSTER_CONFIG_ENVIRONMENT === 'development') {
    const { createLogger } = require('redux-logger');

    const logger = createLogger({ collapsed: true });
    middlewares.push(logger);

    if (window.devToolsExtension) {
        devToolsExtension = window.devToolsExtension();
    }
}

export default function configureStore(initialState) {
    const store = createStore(
        rootReducer,
        initialState,
        compose(
            applyMiddleware(...middlewares),
            devToolsExtension
        )
    );

    store.subscribe(() => {
        const state = store.getState();
        const isLoggedIn =
            state.authentication &&
            state.authentication.loginStatus &&
            state.authentication.loginStatus.isLoggedIn === true;

        if (isLoggedIn) {
            saveReduxState(state); // read by authorization/redux/initialState
        } else {
            removeReduxState();
        }
    });

    /* istanbul ignore if  */
    if (module.hot) {
        // Enable Webpack hot module replacement for reducers
        module.hot.accept('./rootReducer', () => {
            const nextRootReducer = require('./rootReducer').default; // eslint-disable-line
            store.replaceReducer(nextRootReducer);
        });
    }
    return store;
}
