import {
    AUTHENTICATION_GET_SESSION_BEGIN,
    AUTHENTICATION_GET_SESSION_SUCCESS,
    AUTHENTICATION_GET_SESSION_FAILURE,
    AUTHENTICATION_GET_SESSION_DISMISS_ERROR,
} from './constants';

import { get } from '../../../common/asyncAjax';

import { GET_SESSION_URL } from './urls';

export const getSession = sessionKey => async (dispatch) => {
    dispatch({
        type: AUTHENTICATION_GET_SESSION_BEGIN,
    });

    try {
        const res = await get(GET_SESSION_URL(sessionKey));
        dispatch({
            type: AUTHENTICATION_GET_SESSION_SUCCESS,
            data: res.response,
        });
    } catch (err) {
        dispatch({
            type: AUTHENTICATION_GET_SESSION_FAILURE,
            data: { error: err },
        });
    }
};

export const dismissGetSessionError = () => ({ type: AUTHENTICATION_GET_SESSION_DISMISS_ERROR });

export function reducer(state, action) {

    const isLoggedIn = action && action.data && action.data.authentication && action.data.authentication.status === 'VERIFIED';

    switch (action.type) {
        case AUTHENTICATION_GET_SESSION_BEGIN:
            return {
                ...state,
                getSessionPending: true,
                getSessionError: null,
            };

        case AUTHENTICATION_GET_SESSION_SUCCESS:

            return {
                ...state,
                loginStatus: {
                    sessionKey: action.data.key,
                    isLoggedIn,
                },
                loginProgress: {
                    status: action.data.authentication.status,
                    pollTime: isLoggedIn && !action.data.authentication.eid ? 0 : action.data.authentication.eid.pollTime
                },
                person: action.data.person,
                getSessionPending: false,
                getSessionError: null,
            };

        case AUTHENTICATION_GET_SESSION_FAILURE:
            return {
                ...state,
                sessionKey: undefined,
                isLoggedIn: false,
                person: {},
                getSessionPending: false,
                getSessionError: action.data.error,
            };

        case AUTHENTICATION_GET_SESSION_DISMISS_ERROR:
            return {
                ...state,
                getSessionError: null,
            };

        default:
            return state;
    }
}
