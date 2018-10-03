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
        const res = await get(GET_ACCOUNTS_URL(customerId), undefined, undefined, () => {});
        dispatch({
            type: ACCOUNT_GET_ACCOUNTS_SUCCESS,
            data: res.response.accounts,
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
            const accountsActive = action.data.filter(a => a.status === 'ACTIVE'); // eslint-disable-line
            const accountsTerminated = action.data.filter(a => a.status === 'TERMINATED'); // eslint-disable-line

            return {
                ...state,
                accounts: action.data,
                accountsActive,
                accountsTerminated,
                hasZeroAccounts: accountsActive.length === 0 && accountsTerminated.length === 0,
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
