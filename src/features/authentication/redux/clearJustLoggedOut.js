import { AUTHENTICATION_CLEAR_JUST_LOGGED_OUT } from './constants';

export const clearJustLoggedOut = () => ({
    type: AUTHENTICATION_CLEAR_JUST_LOGGED_OUT,
});

// don't ES6 this one, rekit gets lost /joli44
export function reducer(state, action) {
    switch (action.type) {
        case AUTHENTICATION_CLEAR_JUST_LOGGED_OUT:
            return {
                ...state,
                loginStatus: { ...state.loginStatus, justLoggedOut: false },
            };

        default:
            return state;
    }
}
