import Ajax from '@ecster/ecster-net/lib/Ajax';

import {
    ACCOUNT_GET_ACCOUNT_BEGIN,
    ACCOUNT_GET_ACCOUNT_SUCCESS,
    ACCOUNT_GET_ACCOUNT_FAILURE,
    ACCOUNT_GET_ACCOUNT_DISMISS_ERROR,
} from './constants';

import { GET_ACCOUNT_URL } from './urls';

export function getAccount(customerId, refcode) {
    return (dispatch) => { // optionally you can have getState as the second argument
        dispatch({
            type: ACCOUNT_GET_ACCOUNT_BEGIN,
        });

        return new Promise((resolve, reject) => {
            Ajax.get({ url: GET_ACCOUNT_URL(customerId, refcode) })
                .then(
                    (xhr, res) => {
                        dispatch({
                            type: ACCOUNT_GET_ACCOUNT_SUCCESS,
                            data: res,
                        });
                        resolve(res);
                    })
                .catch(
                    (err) => {
                        dispatch({
                            type: ACCOUNT_GET_ACCOUNT_FAILURE,
                            data: { error: err },
                        });
                        reject(err);
                    },
                );
        });
    };
}

export function dismissGetAccountError() {
    return {
        type: ACCOUNT_GET_ACCOUNT_DISMISS_ERROR,
    };
}

export function reducer(state, action) {
    switch (action.type) {
        case ACCOUNT_GET_ACCOUNT_BEGIN:
            // Just after a request is sent
            return {
                ...state,
                getAccountPending: true,
                getAccountError: null,
            };

        case ACCOUNT_GET_ACCOUNT_SUCCESS:
            // The request is success
            return {
                ...state,
                getAccountPending: false,
                getAccountError: null,
            };

        case ACCOUNT_GET_ACCOUNT_FAILURE:
            // The request is failed
            return {
                ...state,
                getAccountPending: false,
                getAccountError: action.data.error,
            };

        case ACCOUNT_GET_ACCOUNT_DISMISS_ERROR:
            // Dismiss the request failure error
            return {
                ...state,
                getAccountError: null,
            };

        default:
            return state;
    }
}
