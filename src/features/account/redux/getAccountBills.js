import Ajax from '@ecster/ecster-net/lib/Ajax';

import {
    ACCOUNT_GET_ACCOUNT_BILLS_BEGIN,
    ACCOUNT_GET_ACCOUNT_BILLS_SUCCESS,
    ACCOUNT_GET_ACCOUNT_BILLS_FAILURE,
    ACCOUNT_GET_ACCOUNT_BILLS_DISMISS_ERROR,
} from './constants';

import { GET_ACCOUNT_BILLS_URL } from './urls';

export function getAccountBills(customerId, referenceId) {
    return (dispatch) => { // optionally you can have getState as the second argument
        dispatch({
            type: ACCOUNT_GET_ACCOUNT_BILLS_BEGIN,
        });

        return new Promise((resolve, reject) => {
            Ajax.get({url: GET_ACCOUNT_BILLS_URL(customerId, referenceId)})
                .then(
                    (xhr, res) => {
                        dispatch({
                            type: ACCOUNT_GET_ACCOUNT_BILLS_SUCCESS,
                            data: res.response,
                        });
                        resolve(res);
                    })
                .catch(
                    (err) => {
                        dispatch({
                            type: ACCOUNT_GET_ACCOUNT_BILLS_FAILURE,
                            data: { error: err },
                        });
                        reject(err);
                    },
                );
        });
    };
}

export function dismissGetAccountBillsError() {
    return {
        type: ACCOUNT_GET_ACCOUNT_BILLS_DISMISS_ERROR,
    };
}

export function reducer(state, action) {
    switch (action.type) {
        case ACCOUNT_GET_ACCOUNT_BILLS_BEGIN:
            return {
                ...state,
                getAccountBillsPending: true,
                getAccountBillsError: null,
            };

        case ACCOUNT_GET_ACCOUNT_BILLS_SUCCESS:
            return {
                ...state,
                accountBills: action.data,
                getAccountBillsPending: false,
                getAccountBillsError: null,
            };

        case ACCOUNT_GET_ACCOUNT_BILLS_FAILURE:
            return {
                ...state,
                getAccountBillsPending: false,
                getAccountBillsError: action.data.error,
            };

        case ACCOUNT_GET_ACCOUNT_BILLS_DISMISS_ERROR:
            return {
                ...state,
                getAccountBillsError: null,
            };

        default:
            return state;
    }
}
