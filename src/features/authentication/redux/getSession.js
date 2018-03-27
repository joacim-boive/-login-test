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
                session: action.data,
                isLoggedIn: true,
                getSessionPending: false,
                getSessionError: null,
            };

        case AUTHENTICATION_GET_SESSION_FAILURE:
            return {
                ...state,
                isLoggedIn: false,
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
