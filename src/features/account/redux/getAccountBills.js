import {
    ACCOUNT_GET_ACCOUNT_BILLS_BEGIN,
    ACCOUNT_GET_ACCOUNT_BILLS_SUCCESS,
    ACCOUNT_GET_ACCOUNT_BILLS_FAILURE,
    ACCOUNT_GET_ACCOUNT_BILLS_DISMISS_ERROR,
} from './constants';

import { get } from '../../../common/asyncAjax';

import { GET_ACCOUNT_BILLS_URL } from './urls';

export const getAccountBills = (customerId, referenceId) => async (dispatch) => {
    dispatch({
        type: ACCOUNT_GET_ACCOUNT_BILLS_BEGIN,
    });

    try {
        const res = await get(GET_ACCOUNT_BILLS_URL(customerId, referenceId));
        dispatch({
            type: ACCOUNT_GET_ACCOUNT_BILLS_SUCCESS,
            data: res.response
        });
    } catch (err) {
        dispatch({
            type: ACCOUNT_GET_ACCOUNT_BILLS_FAILURE,
            data: { error: err }
        });
    }
};

export const dismissGetAccountBillsError = () => ({ type: ACCOUNT_GET_ACCOUNT_BILLS_DISMISS_ERROR });

export function reducer(state, action) {
    switch (action.type) {
        case ACCOUNT_GET_ACCOUNT_BILLS_BEGIN:
            return {
                ...state,
                getAccountBillsPending: true,
                getAccountBillsError: null,
            };

        case ACCOUNT_GET_ACCOUNT_BILLS_SUCCESS:
            return {
                ...state,
                accountBills: action.data,
                getAccountBillsPending: false,
                getAccountBillsError: null,
            };

        case ACCOUNT_GET_ACCOUNT_BILLS_FAILURE:
            return {
                ...state,
                getAccountBillsPending: false,
                getAccountBillsError: action.data.error,
            };

        case ACCOUNT_GET_ACCOUNT_BILLS_DISMISS_ERROR:
            return {
                ...state,
                getAccountBillsError: null,
            };

        default:
            return state;
    }
}
