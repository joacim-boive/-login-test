import {
    ACCOUNT_GET_ACCOUNT_LIMIT_RAISE_TERMS_BEGIN,
    ACCOUNT_GET_ACCOUNT_LIMIT_RAISE_TERMS_SUCCESS,
    ACCOUNT_GET_ACCOUNT_LIMIT_RAISE_TERMS_FAILURE,
    ACCOUNT_GET_ACCOUNT_LIMIT_RAISE_TERMS_DISMISS_ERROR,
} from './constants';

import { get } from '../../../common/asyncAjax';

import { GET_ACCOUNT_LIMIT_RAISE_TERMS_URL } from './urls';

export const getAccountLimitRaiseTerms = (country, lang) => async (dispatch) => {
    dispatch({
        type: ACCOUNT_GET_ACCOUNT_LIMIT_RAISE_TERMS_BEGIN,
    });

    try {
        const res = await get(GET_ACCOUNT_LIMIT_RAISE_TERMS_URL(country, lang));
        dispatch({
            type: ACCOUNT_GET_ACCOUNT_LIMIT_RAISE_TERMS_SUCCESS,
            data: res.response,
        });
    } catch (err) {
        dispatch({
            type: ACCOUNT_GET_ACCOUNT_LIMIT_RAISE_TERMS_FAILURE,
            data: { error: err },
        });
    }
};

export const dismissGetAccountLimitRaiseTermsError = () => ({ type: ACCOUNT_GET_ACCOUNT_LIMIT_RAISE_TERMS_DISMISS_ERROR });

export function reducer(state, action) {
    switch (action.type) {
        case ACCOUNT_GET_ACCOUNT_LIMIT_RAISE_TERMS_BEGIN:
            return {
                ...state,
                getAccountLimitRaiseTermsPending: true,
                getAccountLimitRaiseTermsError: null,
            };

        case ACCOUNT_GET_ACCOUNT_LIMIT_RAISE_TERMS_SUCCESS:
            return {
                ...state,
                accountLimitRaiseTerms: action.data,
                getAccountLimitRaiseTermsPending: false,
                getAccountLimitRaiseTermsError: null,
            };

        case ACCOUNT_GET_ACCOUNT_LIMIT_RAISE_TERMS_FAILURE:
            return {
                ...state,
                getAccountLimitRaiseTermsPending: false,
                getAccountLimitRaiseTermsError: action.data.error,
            };

        case ACCOUNT_GET_ACCOUNT_LIMIT_RAISE_TERMS_DISMISS_ERROR:
            return {
                ...state,
                getAccountLimitRaiseTermsError: null,
            };

        default:
            return state;
    }
}
