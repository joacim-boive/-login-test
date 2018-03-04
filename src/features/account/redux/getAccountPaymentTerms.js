import Ajax from '@ecster/ecster-net/lib/Ajax';

import {
    ACCOUNT_GET_ACCOUNT_PAYMENT_TERMS_BEGIN,
    ACCOUNT_GET_ACCOUNT_PAYMENT_TERMS_SUCCESS,
    ACCOUNT_GET_ACCOUNT_PAYMENT_TERMS_FAILURE,
    ACCOUNT_GET_ACCOUNT_PAYMENT_TERMS_DISMISS_ERROR,
} from './constants';

import { GET_ACCOUNT_PAYMENT_TERMS_URL } from './urls';

export function getAccountPaymentTerms(country, lang) {
    return (dispatch) => { // optionally you can have getState as the second argument
        dispatch({
            type: ACCOUNT_GET_ACCOUNT_PAYMENT_TERMS_BEGIN,
        });

        return new Promise((resolve, reject) => {
            Ajax.get({url: GET_ACCOUNT_PAYMENT_TERMS_URL(country, lang)})
                .then(
                    (xhr, res) => {
                        dispatch({
                            type: ACCOUNT_GET_ACCOUNT_PAYMENT_TERMS_SUCCESS,
                            data: res,
                        });
                        resolve(res);
                    })
                .catch(
                    (err) => {
                        dispatch({
                            type: ACCOUNT_GET_ACCOUNT_PAYMENT_TERMS_FAILURE,
                            data: { error: err },
                        });
                        reject(err);
                    },
                );
        });
    };
}

export function dismissGetAccountPaymentTermsError() {
    return {
        type: ACCOUNT_GET_ACCOUNT_PAYMENT_TERMS_DISMISS_ERROR,
    };
}

export function reducer(state, action) {
    switch (action.type) {
        case ACCOUNT_GET_ACCOUNT_PAYMENT_TERMS_BEGIN:
            // Just after a request is sent
            return {
                ...state,
                getAccountPaymentTermsPending: true,
                getAccountPaymentTermsError: null,
            };

        case ACCOUNT_GET_ACCOUNT_PAYMENT_TERMS_SUCCESS:
            // The request is success
            return {
                ...state,
                getAccountPaymentTermsPending: false,
                getAccountPaymentTermsError: null,
            };

        case ACCOUNT_GET_ACCOUNT_PAYMENT_TERMS_FAILURE:
            // The request is failed
            return {
                ...state,
                getAccountPaymentTermsPending: false,
                getAccountPaymentTermsError: action.data.error,
            };

        case ACCOUNT_GET_ACCOUNT_PAYMENT_TERMS_DISMISS_ERROR:
            // Dismiss the request failure error
            return {
                ...state,
                getAccountPaymentTermsError: null,
            };

        default:
            return state;
    }
}
