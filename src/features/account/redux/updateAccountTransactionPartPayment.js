import Ajax from '@ecster/ecster-net/lib/Ajax';

import {
    ACCOUNT_UPDATE_ACCOUNT_TRANSACTION_PART_PAYMENT_BEGIN,
    ACCOUNT_UPDATE_ACCOUNT_TRANSACTION_PART_PAYMENT_SUCCESS,
    ACCOUNT_UPDATE_ACCOUNT_TRANSACTION_PART_PAYMENT_FAILURE,
    ACCOUNT_UPDATE_ACCOUNT_TRANSACTION_PART_PAYMENT_DISMISS_ERROR,
} from './constants';

import { UPDATE_ACCOUNT_TRANSACTION_PART_PAYMENT_URL } from './urls';

export function updateAccountTransactionPartPayment(customerId, referenceId, transactionId, data) {
    return (dispatch) => { // optionally you can have getState as the second argument
        dispatch({
            type: ACCOUNT_UPDATE_ACCOUNT_TRANSACTION_PART_PAYMENT_BEGIN,
        });

        return new Promise((resolve, reject) => {
            Ajax.put({ url: UPDATE_ACCOUNT_TRANSACTION_PART_PAYMENT_URL(customerId, referenceId, transactionId) }, data)
                .then(
                    (xhr, res) => {
                        dispatch({
                            type: ACCOUNT_UPDATE_ACCOUNT_TRANSACTION_PART_PAYMENT_SUCCESS,
                            data: res.response,
                        });
                        resolve(res);
                    })
                .catch(
                    (err) => {
                        dispatch({
                            type: ACCOUNT_UPDATE_ACCOUNT_TRANSACTION_PART_PAYMENT_FAILURE,
                            data: { error: err },
                        });
                        reject(err);
                    },
                );
        });
    };
}

export function dismissUpdateAccountTransactionPartPaymentError() {
    return {
        type: ACCOUNT_UPDATE_ACCOUNT_TRANSACTION_PART_PAYMENT_DISMISS_ERROR,
    };
}

export function reducer(state, action) {
    switch (action.type) {
        case ACCOUNT_UPDATE_ACCOUNT_TRANSACTION_PART_PAYMENT_BEGIN:
            return {
                ...state,
                updateAccountTransactionPartPaymentPending: true,
                updateAccountTransactionPartPaymentError: null,
            };

        case ACCOUNT_UPDATE_ACCOUNT_TRANSACTION_PART_PAYMENT_SUCCESS:
            return {
                ...state,
                updateAccountTransactionPartPaymentPending: false,
                updateAccountTransactionPartPaymentError: null,
            };

        case ACCOUNT_UPDATE_ACCOUNT_TRANSACTION_PART_PAYMENT_FAILURE:
            return {
                ...state,
                updateAccountTransactionPartPaymentPending: false,
                updateAccountTransactionPartPaymentError: action.data.error,
            };

        case ACCOUNT_UPDATE_ACCOUNT_TRANSACTION_PART_PAYMENT_DISMISS_ERROR:
            return {
                ...state,
                updateAccountTransactionPartPaymentError: null,
            };

        default:
            return state;
    }
}
