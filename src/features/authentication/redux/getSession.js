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

            // IN_PROGRESS (polling)

            // {
            //     "key":"5BA682D6AE5872EA45A692F348BA40ED",
            //     "ttl":1800,
            //     "authentication": {
            //         "status":"IN_PROGRESS",
            //         "type":"BANKID_MOBILE",
            //         "eid": {
            //             "pollTime":1500
            //         }
            //     }
            // }

            // VERIFIED (last poll)

            // {
            //     "key": "AF470EEB42AD6F38C0BBF1C120C826DC",
            //     "ttl": 1800,
            //     "authentication": {
            //         "status": "VERIFIED",
            //         "type": "BANKID_MOBILE"
            //     },
            //     "person": {
            //         "id": 641,
            //         "ssn": "370203-0333",
            //         "name": "Helman, Roger",
            //         "address": "Rasundavagen 35",
            //         "address2": "",
            //         "city": "SOLNA",
            //         "zip": "169 67",
            //         "country": "SE",
            //         "phone": "20150615",
            //         "cellular": "+4673533598",
            //         "email": "ölk@dgh.se"
            //     }
            // }

            return {
                ...state,
                loginStatus: {
                    isLoggedIn: action.data.authentication.status === 'VERIFIED',
                },
                loginProgress: {
                    status: action.data.authentication.status,
                    pollTime: action.data.authentication.eid.pollTime
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
