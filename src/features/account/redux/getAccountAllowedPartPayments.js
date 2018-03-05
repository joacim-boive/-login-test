import Ajax from '@ecster/ecster-net/lib/Ajax';

import {
    ACCOUNT_GET_ACCOUNT_ALLOWED_PART_PAYMENTS_BEGIN,
    ACCOUNT_GET_ACCOUNT_ALLOWED_PART_PAYMENTS_SUCCESS,
    ACCOUNT_GET_ACCOUNT_ALLOWED_PART_PAYMENTS_FAILURE,
    ACCOUNT_GET_ACCOUNT_ALLOWED_PART_PAYMENTS_DISMISS_ERROR,
} from './constants';

import { GET_ACCOUNT_ALLOWED_PART_PAYMENTS_URL } from './urls';

export function getAccountAllowedPartPayments(customerId, referenceId) {
    return (dispatch) => { // optionally you can have getState as the second argument
        dispatch({
            type: ACCOUNT_GET_ACCOUNT_ALLOWED_PART_PAYMENTS_BEGIN,
        });

        return new Promise((resolve, reject) => {
            Ajax.get({ url: GET_ACCOUNT_ALLOWED_PART_PAYMENTS_URL(customerId, referenceId) })
                .then(
                    (xhr, res) => {
                        dispatch({
                            type: ACCOUNT_GET_ACCOUNT_ALLOWED_PART_PAYMENTS_SUCCESS,
                            data: res.response,
                        });
                        resolve(res);
                    })
                .catch(
                    (err) => {
                        dispatch({
                            type: ACCOUNT_GET_ACCOUNT_ALLOWED_PART_PAYMENTS_FAILURE,
                            data: { error: err },
                        });
                        reject(err);
                    },
                );
        });
    };
}

export function dismissGetAccountAllowedPartPaymentsError() {
    return {
        type: ACCOUNT_GET_ACCOUNT_ALLOWED_PART_PAYMENTS_DISMISS_ERROR,
    };
}

export function reducer(state, action) {
    switch (action.type) {
        case ACCOUNT_GET_ACCOUNT_ALLOWED_PART_PAYMENTS_BEGIN:
            // Just after a request is sent
            return {
                ...state,
                getAccountAllowedPartPaymentsPending: true,
                getAccountAllowedPartPaymentsError: null,
            };

        case ACCOUNT_GET_ACCOUNT_ALLOWED_PART_PAYMENTS_SUCCESS:
            // The request is success
            return {
                ...state,
                accountAllowedPartPayments: action.data,
                getAccountAllowedPartPaymentsPending: false,
                getAccountAllowedPartPaymentsError: null,
            };

        case ACCOUNT_GET_ACCOUNT_ALLOWED_PART_PAYMENTS_FAILURE:
            // The request is failed
            return {
                ...state,
                getAccountAllowedPartPaymentsPending: false,
                getAccountAllowedPartPaymentsError: action.data.error,
            };

        case ACCOUNT_GET_ACCOUNT_ALLOWED_PART_PAYMENTS_DISMISS_ERROR:
            // Dismiss the request failure error
            return {
                ...state,
                getAccountAllowedPartPaymentsError: null,
            };

        default:
            return state;
    }
}
