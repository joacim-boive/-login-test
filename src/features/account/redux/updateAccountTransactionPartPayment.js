import {
    ACCOUNT_UPDATE_ACCOUNT_TRANSACTION_PART_PAYMENT_BEGIN,
    ACCOUNT_UPDATE_ACCOUNT_TRANSACTION_PART_PAYMENT_SUCCESS,
    ACCOUNT_UPDATE_ACCOUNT_TRANSACTION_PART_PAYMENT_FAILURE,
    ACCOUNT_UPDATE_ACCOUNT_TRANSACTION_PART_PAYMENT_DISMISS_ERROR,
} from './constants';

import { put } from '../../../common/asyncAjax';

import { UPDATE_ACCOUNT_TRANSACTION_PART_PAYMENT_URL } from './urls';

export const updateAccountTransactionPartPayment = (customerId, referenceId, transactionId, data) => async (dispatch) => {
    dispatch({
        type: ACCOUNT_UPDATE_ACCOUNT_TRANSACTION_PART_PAYMENT_BEGIN,
    });

    try {
        const res = await put(UPDATE_ACCOUNT_TRANSACTION_PART_PAYMENT_URL(customerId, referenceId, transactionId), data);
        dispatch({
            type: ACCOUNT_UPDATE_ACCOUNT_TRANSACTION_PART_PAYMENT_SUCCESS,
            data: res.response,
        });
    } catch (err) {
        dispatch({
            type: ACCOUNT_UPDATE_ACCOUNT_TRANSACTION_PART_PAYMENT_FAILURE,
            data: { error: err },
        });
    }
};

export const dismissUpdateAccountTransactionPartPaymentError = () => ({ type: ACCOUNT_UPDATE_ACCOUNT_TRANSACTION_PART_PAYMENT_DISMISS_ERROR });

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
