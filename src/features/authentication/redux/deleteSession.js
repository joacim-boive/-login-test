import Ajax from '@ecster/ecster-net/lib/Ajax';

import {
    AUTHENTICATION_DELETE_SESSION_BEGIN,
    AUTHENTICATION_DELETE_SESSION_SUCCESS,
    AUTHENTICATION_DELETE_SESSION_FAILURE,
    AUTHENTICATION_DELETE_SESSION_DISMISS_ERROR,
} from './constants';

import { DELETE_SESSION_URL } from './urls';

export function deleteSession(sessionKey) {
    return (dispatch) => { // optionally you can have getState as the second argument
        dispatch({
            type: AUTHENTICATION_DELETE_SESSION_BEGIN,
        });

        return new Promise((resolve, reject) => {
            Ajax.delete({url: DELETE_SESSION_URL(sessionKey)})
                .then(
                    (xhr, res) => {
                        dispatch({
                            type: AUTHENTICATION_DELETE_SESSION_SUCCESS,
                            data: res.response,
                        });
                        resolve(res);
                    })
                .catch(
                    (err) => {
                        dispatch({
                            type: AUTHENTICATION_DELETE_SESSION_FAILURE,
                            data: { error: err },
                        });
                        reject(err);
                    },
                );
        });
    };
}

export function dismissDeleteSessionError() {
    return {
        type: AUTHENTICATION_DELETE_SESSION_DISMISS_ERROR,
    };
}

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
