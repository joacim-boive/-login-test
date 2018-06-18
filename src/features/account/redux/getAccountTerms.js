import {
    ACCOUNT_GET_ACCOUNT_TERMS_BEGIN,
    ACCOUNT_GET_ACCOUNT_TERMS_SUCCESS,
    ACCOUNT_GET_ACCOUNT_TERMS_FAILURE,
    ACCOUNT_GET_ACCOUNT_TERMS_DISMISS_ERROR,
} from './constants';

import { get } from '../../../common/asyncAjax';

import { GET_ACCOUNT_TERMS_URL } from './urls';

export const getAccountTerms = (customerId, refCode) => async dispatch => {
    dispatch({
        type: ACCOUNT_GET_ACCOUNT_TERMS_BEGIN,
    });

    try {
        const res = await get(GET_ACCOUNT_TERMS_URL(customerId, refCode));
        dispatch({
            type: ACCOUNT_GET_ACCOUNT_TERMS_SUCCESS,
            data: res.response,
        });
    } catch (err) {
        dispatch({
            type: ACCOUNT_GET_ACCOUNT_TERMS_FAILURE,
            data: { error: err },
        });
    }
};

export const dismissGetAccountTermsError = () => ({ type: ACCOUNT_GET_ACCOUNT_TERMS_DISMISS_ERROR });

export function reducer(state, action) {
    switch (action.type) {
        case ACCOUNT_GET_ACCOUNT_TERMS_BEGIN:
            return {
                ...state,
                getAccountTermsPending: true,
                getAccountTermsError: null,
            };

        case ACCOUNT_GET_ACCOUNT_TERMS_SUCCESS:
            return {
                ...state,
                accountTerms: action.data,
                getAccountTermsPending: false,
                getAccountTermsError: null,
            };

        case ACCOUNT_GET_ACCOUNT_TERMS_FAILURE:
            return {
                ...state,
                getAccountTermsPending: false,
                getAccountTermsError: action.data.error,
            };

        case ACCOUNT_GET_ACCOUNT_TERMS_DISMISS_ERROR:
            return {
                ...state,
                getAccountTermsError: null,
            };

        default:
            return state;
    }
}
