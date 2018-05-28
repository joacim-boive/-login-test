import {
    ACCOUNT_GET_ACCOUNTS_BEGIN,
    ACCOUNT_GET_ACCOUNTS_SUCCESS,
    ACCOUNT_GET_ACCOUNTS_FAILURE,
    ACCOUNT_GET_ACCOUNTS_DISMISS_ERROR,
} from './constants';

import { get } from '../../../common/asyncAjax';

import { GET_ACCOUNTS_URL } from './urls';

export const getAccounts = customerId => async dispatch => {
    dispatch({
        type: ACCOUNT_GET_ACCOUNTS_BEGIN,
    });
    try {
        const res = await get(GET_ACCOUNTS_URL(customerId), {}, null, () => {});
        dispatch({
            type: ACCOUNT_GET_ACCOUNTS_SUCCESS,
            data: res.response,
        });
    } catch (err) {
        dispatch({
            type: ACCOUNT_GET_ACCOUNTS_FAILURE,
            data: { error: err },
        });
    }
};

export const dismissGetAccountsError = () => ({ type: ACCOUNT_GET_ACCOUNTS_DISMISS_ERROR });

export function reducer(state, action) {
    switch (action.type) {
        case ACCOUNT_GET_ACCOUNTS_BEGIN:
            return {
                ...state,
                getAccountsPending: true,
                getAccountsError: null,
            };

        case ACCOUNT_GET_ACCOUNTS_SUCCESS:
            return {
                ...state,
                accounts: action.data,
                getAccountsPending: false,
                getAccountsError: null,
            };

        case ACCOUNT_GET_ACCOUNTS_FAILURE:
            return {
                ...state,
                getAccountsPending: false,
                getAccountsError: action.data.error,
            };

        case ACCOUNT_GET_ACCOUNTS_DISMISS_ERROR:
            return {
                ...state,
                getAccountsError: null,
            };

        default:
            return state;
    }
}
