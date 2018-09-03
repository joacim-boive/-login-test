// Rekit uses a new approach to organizing actions and reducers. That is
// putting related actions and reducers in one file. See more at:
// https://medium.com/@nate_wang/a-new-approach-for-managing-redux-actions-91c26ce8b5da

import { AUTHENTICATION_REMOVE_SESSION } from './constants';
import { loginStatus, loginProgress } from './initialState';

// TODO: rename to something better, resetLoginState or soemthing... /joli44 2018-09
// rename using rekit studio
export function removeSession() {
    return {
        type: AUTHENTICATION_REMOVE_SESSION,
    };
}

export function reducer(state, action) {
    switch (action.type) {
        case AUTHENTICATION_REMOVE_SESSION:
            return {
                ...state,
                loginStatus,
                loginProgress,
            };

        default:
            return state;
    }
}
