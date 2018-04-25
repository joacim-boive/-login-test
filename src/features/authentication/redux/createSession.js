import {
    AUTHENTICATION_CREATE_SESSION_BEGIN,
    AUTHENTICATION_CREATE_SESSION_SUCCESS,
    AUTHENTICATION_CREATE_SESSION_FAILURE,
    AUTHENTICATION_CREATE_SESSION_DISMISS_ERROR,
} from './constants';

import { post, setOrigin, setSessionKey } from '../../../common/asyncAjax';

import { CREATE_SESSION_URL } from './urls';

export const createSession = data => async dispatch => {
    dispatch({
        type: AUTHENTICATION_CREATE_SESSION_BEGIN,
    });

    try {
        setOrigin('mypages'); // TODO: this is the first ajax call, but maybe move to app startup?
        const res = await post(CREATE_SESSION_URL(), data);
        setSessionKey(res.response.key);

        dispatch({
            type: AUTHENTICATION_CREATE_SESSION_SUCCESS,
            data: res.response,
        });
    } catch (err) {
        dispatch({
            type: AUTHENTICATION_CREATE_SESSION_FAILURE,
            data: { error: err },
        });
    }
};

export const dismissCreateSessionError = () => ({ type: AUTHENTICATION_CREATE_SESSION_DISMISS_ERROR });

export function reducer(state, action) {
    switch (action.type) {
        case AUTHENTICATION_CREATE_SESSION_BEGIN:
            return {
                ...state,
                createSessionPending: true,
                createSessionError: null,
            };

        case AUTHENTICATION_CREATE_SESSION_SUCCESS:
            return {
                ...state,
                loginStatus: {
                    sessionKey: action.data.key,
                },
                loginProgress: {
                    status: action.data.authentication.status,
                    pollTime: action.data.authentication.eid.pollTime,
                    startURL: action.data.authentication.eid.startURL,
                },

                createSessionPending: false,
                createSessionError: null,
            };

        case AUTHENTICATION_CREATE_SESSION_FAILURE:
            return {
                ...state,
                createSessionPending: false,
                createSessionError: action.data.error,
            };

        case AUTHENTICATION_CREATE_SESSION_DISMISS_ERROR:
            return {
                ...state,
                createSessionError: null,
            };

        default:
            return state;
    }
}
