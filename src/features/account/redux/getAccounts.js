import Ajax from '@ecster/ecster-net/lib/Ajax';

import {
    ACCOUNT_GET_ACCOUNTS_BEGIN,
    ACCOUNT_GET_ACCOUNTS_SUCCESS,
    ACCOUNT_GET_ACCOUNTS_FAILURE,
    ACCOUNT_GET_ACCOUNTS_DISMISS_ERROR,
} from './constants';

import { GET_ACCOUNTS_URL } from './urls';

export function getAccounts(customerId) {
    return (dispatch) => { // optionally you can have getState as the second argument
        dispatch({
            type: ACCOUNT_GET_ACCOUNTS_BEGIN,
        });

        return new Promise((resolve, reject) => {
            Ajax.get({ url: GET_ACCOUNTS_URL(customerId) })
                .then(
                    (xhr, res) => {
                        dispatch({
                            type: ACCOUNT_GET_ACCOUNTS_SUCCESS,
                            data: res,
                        });
                        resolve(res);
                    })
                .catch(
                    (err) => {
                        dispatch({
                            type: ACCOUNT_GET_ACCOUNTS_FAILURE,
                            data: { error: err },
                        });
                        reject(err);
                    },
                );
        });
    };
}

export function dismissGetAccountsError() {
    return {
        type: ACCOUNT_GET_ACCOUNTS_DISMISS_ERROR,
    };
}

export function reducer(state, action) {
    switch (action.type) {
        case ACCOUNT_GET_ACCOUNTS_BEGIN:
            // Just after a request is sent
            return {
                ...state,
                getAccountsPending: true,
                getAccountsError: null,
            };

        case ACCOUNT_GET_ACCOUNTS_SUCCESS:
            // The request is success
            return {
                ...state,
                getAccountsPending: false,
                getAccountsError: null,
            };

        case ACCOUNT_GET_ACCOUNTS_FAILURE:
            // The request is failed
            return {
                ...state,
                getAccountsPending: false,
                getAccountsError: action.data.error,
            };

        case ACCOUNT_GET_ACCOUNTS_DISMISS_ERROR:
            // Dismiss the request failure error
            return {
                ...state,
                getAccountsError: null,
            };

        default:
            return state;
    }
}
