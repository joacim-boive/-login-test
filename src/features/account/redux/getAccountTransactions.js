import Ajax from '@ecster/ecster-net/lib/Ajax';

import {
    ACCOUNT_GET_ACCOUNT_TRANSACTIONS_BEGIN,
    ACCOUNT_GET_ACCOUNT_TRANSACTIONS_SUCCESS,
    ACCOUNT_GET_ACCOUNT_TRANSACTIONS_FAILURE,
    ACCOUNT_GET_ACCOUNT_TRANSACTIONS_DISMISS_ERROR,
} from './constants';

import { GET_ACCOUNT_TRANSACTIONS_URL } from './urls';

export function getAccountTransactions(customerId, referenceId, offset, maxRecords) {
    return (dispatch) => { // optionally you can have getState as the second argument
        dispatch({
            type: ACCOUNT_GET_ACCOUNT_TRANSACTIONS_BEGIN,
        });

        return new Promise((resolve, reject) => {
            Ajax.get({url: GET_ACCOUNT_TRANSACTIONS_URL(customerId, referenceId, offset, maxRecords)})
                .then(
                    (xhr, res) => {
                        dispatch({
                            type: ACCOUNT_GET_ACCOUNT_TRANSACTIONS_SUCCESS,
                            data: res.response,
                        });
                        resolve(res);
                    })
                .catch(
                    (err) => {
                        dispatch({
                            type: ACCOUNT_GET_ACCOUNT_TRANSACTIONS_FAILURE,
                            data: { error: err },
                        });
                        reject(err);
                    },
                );
        });
    };
}

export function dismissGetAccountTransactionsError() {
    return {
        type: ACCOUNT_GET_ACCOUNT_TRANSACTIONS_DISMISS_ERROR,
    };
}

export function reducer(state, action) {
    switch (action.type) {
        case ACCOUNT_GET_ACCOUNT_TRANSACTIONS_BEGIN:
            // Just after a request is sent
            return {
                ...state,
                getAccountTransactionsPending: true,
                getAccountTransactionsError: null,
            };

        case ACCOUNT_GET_ACCOUNT_TRANSACTIONS_SUCCESS:
            // The request is success
            return {
                ...state,
                accountTransactions: action.data,
                getAccountTransactionsPending: false,
                getAccountTransactionsError: null,
            };

        case ACCOUNT_GET_ACCOUNT_TRANSACTIONS_FAILURE:
            // The request is failed
            return {
                ...state,
                getAccountTransactionsPending: false,
                getAccountTransactionsError: action.data.error,
            };

        case ACCOUNT_GET_ACCOUNT_TRANSACTIONS_DISMISS_ERROR:
            // Dismiss the request failure error
            return {
                ...state,
                getAccountTransactionsError: null,
            };

        default:
            return state;
    }
}
