import {
    CUSTOMER_GET_CUSTOMER_BEGIN,
    CUSTOMER_GET_CUSTOMER_SUCCESS,
    CUSTOMER_GET_CUSTOMER_FAILURE,
    CUSTOMER_GET_CUSTOMER_DISMISS_ERROR,
} from './constants';

import { get } from '../../../common/asyncAjax';

import { GET_CUSTOMER_URL } from './urls';

export const getCustomer = customerId => async dispatch => {
    dispatch({
        type: CUSTOMER_GET_CUSTOMER_BEGIN,
    });

    try {
        const res = await get(GET_CUSTOMER_URL(customerId));
        dispatch({
            type: CUSTOMER_GET_CUSTOMER_SUCCESS,
            data: res.response,
        });
    } catch (err) {
        dispatch({
            type: CUSTOMER_GET_CUSTOMER_FAILURE,
            data: { error: err },
        });
    }
};

export const dismissGetCustomerError = () => ({ type: CUSTOMER_GET_CUSTOMER_DISMISS_ERROR });

export function reducer(state, action) {
    switch (action.type) {
        case CUSTOMER_GET_CUSTOMER_BEGIN:
            return {
                ...state,
                getCustomerPending: true,
                getCustomerError: null,
            };

        case CUSTOMER_GET_CUSTOMER_SUCCESS:
            return {
                ...state,
                customer: action.data,
                getCustomerPending: false,
                getCustomerError: null,
            };

        case CUSTOMER_GET_CUSTOMER_FAILURE:
            return {
                ...state,
                getCustomerPending: false,
                getCustomerError: action.data.error,
            };

        case CUSTOMER_GET_CUSTOMER_DISMISS_ERROR:
            return {
                ...state,
                getCustomerError: null,
            };

        default:
            return state;
    }
}
