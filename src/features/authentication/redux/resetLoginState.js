import { AUTHENTICATION_RESET_LOGIN_STATE } from './constants';
import { loginStatus, loginProgress } from './initialState';

export function resetLoginState() {
    return {
        type: AUTHENTICATION_RESET_LOGIN_STATE,
    };
}

export function reducer(state, action) {
    const nextState = {
        ...state,
        loginStatus,
        loginProgress,
    };
    switch (action.type) {
        case AUTHENTICATION_RESET_LOGIN_STATE:
            return nextState;

        default:
            return state;
    }
}
