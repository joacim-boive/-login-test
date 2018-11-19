// This is the root reducer of the feature. It is used for:
//   1. Load reducers from each action in the feature and process them one by one.
//      Note that this part of code is mainly maintained by Rekit, you usually don't need to edit them.
//   2. Write cross-topic reducers. If a reducer is not bound to some specific action.
//      Then it could be written here.
// Learn more from the introduction of this approach:
// https://medium.com/@nate_wang/a-new-approach-for-managing-redux-actions-91c26ce8b5da.

import initialState from './initialState';
import { reducer as deleteSessionReducer } from './deleteSession';
import { reducer as createSessionReducer } from './createSession';
import { reducer as getSessionReducer } from './getSession';
import { reducer as setNextRouteReducer } from './setNextRoute';
import { reducer as clearNextRouteReducer } from './clearNextRoute';
import { reducer as removeSessionReducer } from './removeSession';
import { reducer as clearJustLoggedOutReducer } from './clearJustLoggedOut';

const reducers = [
    deleteSessionReducer,
    createSessionReducer,
    getSessionReducer,
    setNextRouteReducer,
    clearNextRouteReducer,
    removeSessionReducer,
    clearJustLoggedOutReducer,
];

export default function reducer(state = initialState, action) {
    let nextState;
    switch (action.type) {
        // Handle cross-topic actions here
        case 'CLEAR_STATE':
            console.log('auth: Clear state: ', initialState);
            nextState = initialState;
            nextState.loginStatus = nextState.loginStatus || {};
            nextState.loginStatus.justLoggedOut = true;
            break;
        default:
            nextState = state;
            break;
    }
    return reducers.reduce((s, r) => r(s, action), nextState);
}
