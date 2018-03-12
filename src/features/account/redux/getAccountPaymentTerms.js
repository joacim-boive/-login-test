import {
    ACCOUNT_GET_ACCOUNT_PAYMENT_TERMS_BEGIN,
    ACCOUNT_GET_ACCOUNT_PAYMENT_TERMS_SUCCESS,
    ACCOUNT_GET_ACCOUNT_PAYMENT_TERMS_FAILURE,
    ACCOUNT_GET_ACCOUNT_PAYMENT_TERMS_DISMISS_ERROR,
} from './constants';

import { get } from '../../../common/asyncAjax';

import { GET_ACCOUNT_PAYMENT_TERMS_URL } from './urls';

export const getAccountPaymentTerms = (country, lang) => async (dispatch) => {
    dispatch({
        type: ACCOUNT_GET_ACCOUNT_PAYMENT_TERMS_BEGIN,
    });

    try {
        const res = await get(GET_ACCOUNT_PAYMENT_TERMS_URL(country, lang));
        dispatch({
            type: ACCOUNT_GET_ACCOUNT_PAYMENT_TERMS_SUCCESS,
            data: res.response,
        });
    } catch (err) {
        dispatch({
            type: ACCOUNT_GET_ACCOUNT_PAYMENT_TERMS_FAILURE,
            data: { error: err },
        });
    }
};

export const dismissGetAccountPaymentTermsError = () => ({ type: ACCOUNT_GET_ACCOUNT_PAYMENT_TERMS_DISMISS_ERROR });

export function reducer(state, action) {
    switch (action.type) {
        case ACCOUNT_GET_ACCOUNT_PAYMENT_TERMS_BEGIN:
            return {
                ...state,
                getAccountPaymentTermsPending: true,
                getAccountPaymentTermsError: null,
            };

        case ACCOUNT_GET_ACCOUNT_PAYMENT_TERMS_SUCCESS:
            return {
                ...state,
                accountPaymentTerms: action.data,
                getAccountPaymentTermsPending: false,
                getAccountPaymentTermsError: null,
            };

        case ACCOUNT_GET_ACCOUNT_PAYMENT_TERMS_FAILURE:
            return {
                ...state,
                getAccountPaymentTermsPending: false,
                getAccountPaymentTermsError: action.data.error,
            };

        case ACCOUNT_GET_ACCOUNT_PAYMENT_TERMS_DISMISS_ERROR:
            return {
                ...state,
                getAccountPaymentTermsError: null,
            };

        default:
            return state;
    }
}
