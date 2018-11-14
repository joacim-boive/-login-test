import {
    ACCOUNT_GET_ACCOUNT_TRANSACTIONS_BEGIN,
    ACCOUNT_GET_ACCOUNT_TRANSACTIONS_SUCCESS,
    ACCOUNT_GET_ACCOUNT_TRANSACTIONS_FAILURE,
    ACCOUNT_GET_ACCOUNT_TRANSACTIONS_DISMISS_ERROR,
    APPLY_ACCOUNT_TRANSACTIONS_FILTER,
} from './constants';

import { get } from '../../../common/asyncAjax';

import { GET_ACCOUNT_TRANSACTIONS_URL } from './urls';

const applyAccountTransactionsFilter = filter => ({
    type: APPLY_ACCOUNT_TRANSACTIONS_FILTER,
    filter,
});

/**
 * Concatenate the array values into the source object key/value store if previous key with values exists.
 * Otherwise just add an array to the key.
 * @param source {object} Actual key value store, not a copy.
 * @param key {string} Key to placement in the object
 * @param values {array} Array of values to store
 * @param isShortList {boolean} Should we only retrieve a short list
 * @returns {{}} Returns a new object that hasn't mutated anything.
 */
const concatIfExists = (source, key, values = [], isShortList = false) => ({
    ...source,
    [key]: source[key] && !isShortList ? source[key].concat(values) : values,
});

const receivedAllTransactions = (transactions, reservedTransactions) =>
    (!transactions || transactions.length === 0) && (!reservedTransactions || reservedTransactions.length === 0);

export const getAccountTransactions = (customerId, referenceId, filter, isShortList = false, concat = true) => async (
    dispatch,
    getState
) => {
    await dispatch(applyAccountTransactionsFilter(filter));

    dispatch({
        type: ACCOUNT_GET_ACCOUNT_TRANSACTIONS_BEGIN,
    });

    const { offset, maxRecords, shortList } = getState().account.accountTransactionsFilter;

    const getNoOfRecords = isShortList ? shortList + 1 : maxRecords;

    try {
        const res = await get(GET_ACCOUNT_TRANSACTIONS_URL(customerId, referenceId, offset, getNoOfRecords));
        const reservedTransactions = res.response.transactions.filter(trans => trans.type === 'RESERVED_AMOUNT');
        const transactions = res.response.transactions.filter(trans => trans.type !== 'RESERVED_AMOUNT');
        dispatch({
            type: ACCOUNT_GET_ACCOUNT_TRANSACTIONS_SUCCESS,
            transactions,
            reservedTransactions,
            referenceId,
            isShortList,
            concat,
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
        case APPLY_ACCOUNT_TRANSACTIONS_FILTER:
            return {
                ...state,
                accountTransactionsFilter: { ...state.accountTransactionsFilter, ...action.filter },
            };
        case ACCOUNT_GET_ACCOUNT_TRANSACTIONS_BEGIN:
            return {
                ...state,
                getAccountTransactionsPending: true,
                getAccountTransactionsError: null,
                receivedAllTransactions: false,
            };

        case ACCOUNT_GET_ACCOUNT_TRANSACTIONS_SUCCESS:
            return {
                ...state,
                accountTransactions: concatIfExists(
                    action.concat ? state.accountTransactions : {},
                    action.referenceId,
                    action.transactions,
                    action.isShortList
                ),
                accountReservedTransactions: concatIfExists(
                    action.concat ? state.accountReservedTransactions : {},
                    action.referenceId,
                    action.reservedTransactions,
                    action.isShortList
                ),

                receivedAllTransactions: receivedAllTransactions(action.transactions, action.reservedTransactions),

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
