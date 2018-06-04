import {
    ACCOUNT_GET_ACCOUNT_TRANSACTIONS_BEGIN,
    ACCOUNT_GET_ACCOUNT_TRANSACTIONS_SUCCESS,
    ACCOUNT_GET_ACCOUNT_TRANSACTIONS_FAILURE,
    ACCOUNT_GET_ACCOUNT_TRANSACTIONS_DISMISS_ERROR,
} from './constants';

import { get } from '../../../common/asyncAjax';

import { GET_ACCOUNT_TRANSACTIONS_URL } from './urls';

export const getAccountTransactions = (customerId, referenceId, offset, maxRecords) => async dispatch => {
    dispatch({
        type: ACCOUNT_GET_ACCOUNT_TRANSACTIONS_BEGIN,
    });

    try {
        const res = await get(GET_ACCOUNT_TRANSACTIONS_URL(customerId, referenceId, offset, maxRecords));
        dispatch({
            type: ACCOUNT_GET_ACCOUNT_TRANSACTIONS_SUCCESS,
            data: res.response,
            referenceId,
        });
    } catch (err) {
        dispatch({
            type: ACCOUNT_GET_ACCOUNT_TRANSACTIONS_FAILURE,
            data: { error: err },
        });
    }
};

export const dismissGetAccountTransactionsError = () => ({ type: ACCOUNT_GET_ACCOUNT_TRANSACTIONS_DISMISS_ERROR });

export function reducer(state, action) {
    switch (action.type) {
        case ACCOUNT_GET_ACCOUNT_TRANSACTIONS_BEGIN:
            return {
                ...state,
                getAccountTransactionsPending: true,
                getAccountTransactionsError: null,
            };

        case ACCOUNT_GET_ACCOUNT_TRANSACTIONS_SUCCESS:
            return {
                ...state,
                accountTransactions: { ...state.accountTransactions, [action.referenceId]: action.data },
                getAccountTransactionsPending: false,
                getAccountTransactionsError: null,
            };

        case ACCOUNT_GET_ACCOUNT_TRANSACTIONS_FAILURE:
            return {
                ...state,
                getAccountTransactionsPending: false,
                getAccountTransactionsError: action.data.error,
            };

        case ACCOUNT_GET_ACCOUNT_TRANSACTIONS_DISMISS_ERROR:
            return {
                ...state,
                getAccountTransactionsError: null,
            };

        default:
            return state;
    }
}
