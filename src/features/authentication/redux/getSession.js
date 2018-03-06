import Ajax from '@ecster/ecster-net/lib/Ajax';

import {
    AUTHENTICATION_GET_SESSION_BEGIN,
    AUTHENTICATION_GET_SESSION_SUCCESS,
    AUTHENTICATION_GET_SESSION_FAILURE,
    AUTHENTICATION_GET_SESSION_DISMISS_ERROR,
} from './constants';

import { GET_SESSION_URL } from './urls';

export function getSession(sessionKey) {
    return (dispatch) => { // optionally you can have getState as the second argument
        dispatch({
            type: AUTHENTICATION_GET_SESSION_BEGIN,
        });

        return new Promise((resolve, reject) => {
            Ajax.get({ url: GET_SESSION_URL(sessionKey) })
                .then(
                    (xhr, res) => {
                        dispatch({
                            type: AUTHENTICATION_GET_SESSION_SUCCESS,
                            data: res.response,
                        });
                        resolve(res);
                    })
                .catch(
                    (err) => {
                        dispatch({
                            type: AUTHENTICATION_GET_SESSION_FAILURE,
                            data: { error: err },
                        });
                        reject(err);
                    },
                );
        });
    };
}

export function dismissGetSessionError() {
    return {
        type: AUTHENTICATION_GET_SESSION_DISMISS_ERROR,
    };
}

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
                getSessionPending: false,
                getSessionError: null,
            };

        case AUTHENTICATION_GET_SESSION_FAILURE:
            return {
                ...state,
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
