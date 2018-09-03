import {
    AUTHENTICATION_DELETE_SESSION_BEGIN,
    AUTHENTICATION_DELETE_SESSION_SUCCESS,
    AUTHENTICATION_DELETE_SESSION_FAILURE,
    AUTHENTICATION_DELETE_SESSION_DISMISS_ERROR,
} from './constants';

import { del } from '../../../common/asyncAjax';

import { DELETE_SESSION_URL } from './urls';

export const deleteSession = sessionKey => async dispatch => {
    dispatch({
        type: AUTHENTICATION_DELETE_SESSION_BEGIN,
    });

    try {
        const res = await del(DELETE_SESSION_URL(sessionKey));
        dispatch({
            type: AUTHENTICATION_DELETE_SESSION_SUCCESS,
            data: res.response,
        });
    } catch (err) {
        dispatch({
            type: AUTHENTICATION_DELETE_SESSION_FAILURE,
            data: { error: err },
        });
    }
};

export const dismissDeleteSessionError = () => ({ type: AUTHENTICATION_DELETE_SESSION_DISMISS_ERROR });

export function reducer(state, action) {
    switch (action.type) {
        case AUTHENTICATION_DELETE_SESSION_BEGIN:
            return {
                ...state,
                deleteSessionPending: true,
                deleteSessionError: null,
            };

        case AUTHENTICATION_DELETE_SESSION_SUCCESS:
            return {
                ...state,
                deleteSessionPending: false,
                deleteSessionError: null,
            };

        case AUTHENTICATION_DELETE_SESSION_FAILURE:
            return {
                ...state,
                deleteSessionPending: false,
                deleteSessionError: action.data.error,
            };

        case AUTHENTICATION_DELETE_SESSION_DISMISS_ERROR:
            return {
                ...state,
                deleteSessionError: null,
            };

        default:
            return state;
    }
}
