import Ajax from '@ecster/ecster-net/lib/Ajax';

import {
    AUTHENTICATION_CREATE_SESSION_BEGIN,
    AUTHENTICATION_CREATE_SESSION_SUCCESS,
    AUTHENTICATION_CREATE_SESSION_FAILURE,
    AUTHENTICATION_CREATE_SESSION_DISMISS_ERROR,
} from './constants';

import { CREATE_SESSION_URL } from './urls';

export function createSession(data) {
    return (dispatch) => { // optionally you can have getState as the second argument
        dispatch({
            type: AUTHENTICATION_CREATE_SESSION_BEGIN,
        });

        return new Promise((resolve, reject) => {
            Ajax.post({url: CREATE_SESSION_URL()}, data)
                .then(
                    (xhr, res) => {
                        dispatch({
                            type: AUTHENTICATION_CREATE_SESSION_SUCCESS,
                            data: res.response,
                        });
                        resolve(res);
                    })
                .catch(
                    (err) => {
                        dispatch({
                            type: AUTHENTICATION_CREATE_SESSION_FAILURE,
                            data: { error: err },
                        });
                        reject(err);
                    },
                );
        });
    };
}

export function dismissCreateSessionError() {
    return {
        type: AUTHENTICATION_CREATE_SESSION_DISMISS_ERROR,
    };
}

export function reducer(state, action) {
    switch (action.type) {
        case AUTHENTICATION_CREATE_SESSION_BEGIN:
            // Just after a request is sent
            return {
                ...state,
                createSessionPending: true,
                createSessionError: null,
            };

        case AUTHENTICATION_CREATE_SESSION_SUCCESS:
            // The request is success
            return {
                ...state,
                createSessionPending: false,
                createSessionError: null,
            };

        case AUTHENTICATION_CREATE_SESSION_FAILURE:
            // The request is failed
            return {
                ...state,
                createSessionPending: false,
                createSessionError: action.data.error,
            };

        case AUTHENTICATION_CREATE_SESSION_DISMISS_ERROR:
            // Dismiss the request failure error
            return {
                ...state,
                createSessionError: null,
            };

        default:
            return state;
    }
}
