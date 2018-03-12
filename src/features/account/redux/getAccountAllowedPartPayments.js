import {
    ACCOUNT_GET_ACCOUNT_ALLOWED_PART_PAYMENTS_BEGIN,
    ACCOUNT_GET_ACCOUNT_ALLOWED_PART_PAYMENTS_SUCCESS,
    ACCOUNT_GET_ACCOUNT_ALLOWED_PART_PAYMENTS_FAILURE,
    ACCOUNT_GET_ACCOUNT_ALLOWED_PART_PAYMENTS_DISMISS_ERROR,
} from './constants';

import { get } from '../../../common/asyncAjax';

import { GET_ACCOUNT_ALLOWED_PART_PAYMENTS_URL } from './urls';

export const getAccountAllowedPartPayments = (customerId, referenceId) => async (dispatch) => {
    dispatch({
        type: ACCOUNT_GET_ACCOUNT_ALLOWED_PART_PAYMENTS_BEGIN
    });

    try {
        const res = await get(GET_ACCOUNT_ALLOWED_PART_PAYMENTS_URL(customerId, referenceId));
        dispatch({
            type: ACCOUNT_GET_ACCOUNT_ALLOWED_PART_PAYMENTS_SUCCESS,
            data: res.response,
        });
    } catch (err) {
        dispatch({
            type: ACCOUNT_GET_ACCOUNT_ALLOWED_PART_PAYMENTS_FAILURE,
            data: { error: err },
        });
    }
};

export const dismissGetAccountAllowedPartPaymentsError = () => ({ type: ACCOUNT_GET_ACCOUNT_ALLOWED_PART_PAYMENTS_DISMISS_ERROR });

export function reducer(state, action) {
    switch (action.type) {
        case ACCOUNT_GET_ACCOUNT_ALLOWED_PART_PAYMENTS_BEGIN:
            return {
                ...state,
                getAccountAllowedPartPaymentsPending: true,
                getAccountAllowedPartPaymentsError: null,
            };

        case ACCOUNT_GET_ACCOUNT_ALLOWED_PART_PAYMENTS_SUCCESS:
            return {
                ...state,
                accountAllowedPartPayments: action.data,
                getAccountAllowedPartPaymentsPending: false,
                getAccountAllowedPartPaymentsError: null,
            };

        case ACCOUNT_GET_ACCOUNT_ALLOWED_PART_PAYMENTS_FAILURE:
            return {
                ...state,
                getAccountAllowedPartPaymentsPending: false,
                getAccountAllowedPartPaymentsError: action.data.error,
            };

        case ACCOUNT_GET_ACCOUNT_ALLOWED_PART_PAYMENTS_DISMISS_ERROR:
            return {
                ...state,
                getAccountAllowedPartPaymentsError: null,
            };

        default:
            return state;
    }
}
