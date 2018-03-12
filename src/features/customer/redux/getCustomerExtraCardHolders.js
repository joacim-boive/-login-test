import {
    CUSTOMER_GET_CUSTOMER_EXTRA_CARD_HOLDERS_BEGIN,
    CUSTOMER_GET_CUSTOMER_EXTRA_CARD_HOLDERS_SUCCESS,
    CUSTOMER_GET_CUSTOMER_EXTRA_CARD_HOLDERS_FAILURE,
    CUSTOMER_GET_CUSTOMER_EXTRA_CARD_HOLDERS_DISMISS_ERROR,
} from './constants';

import { get } from '../../../common/asyncAjax';

import { GET_CUSTOMER_EXTRA_CARD_HOLDERS_URL } from './urls';

export const getCustomerExtraCardHolders = customerId => async (dispatch) => {
    dispatch({
        type: CUSTOMER_GET_CUSTOMER_EXTRA_CARD_HOLDERS_BEGIN,
    });

    try {
        const res = await get(GET_CUSTOMER_EXTRA_CARD_HOLDERS_URL(customerId));
        dispatch({
            type: CUSTOMER_GET_CUSTOMER_EXTRA_CARD_HOLDERS_SUCCESS,
            data: res.response,
        });
    } catch (err) {
        dispatch({
            type: CUSTOMER_GET_CUSTOMER_EXTRA_CARD_HOLDERS_FAILURE,
            data: { error: err },
        });
    }
};

export const dismissGetCustomerExtraCardHoldersError = () => ({ type: CUSTOMER_GET_CUSTOMER_EXTRA_CARD_HOLDERS_DISMISS_ERROR });

export function reducer(state, action) {
    switch (action.type) {
        case CUSTOMER_GET_CUSTOMER_EXTRA_CARD_HOLDERS_BEGIN:
            return {
                ...state,
                getCustomerExtraCardHoldersPending: true,
                getCustomerExtraCardHoldersError: null,
            };

        case CUSTOMER_GET_CUSTOMER_EXTRA_CARD_HOLDERS_SUCCESS:
            return {
                ...state,
                customerExtraCardHolders: action.data,
                getCustomerExtraCardHoldersPending: false,
                getCustomerExtraCardHoldersError: null,
            };

        case CUSTOMER_GET_CUSTOMER_EXTRA_CARD_HOLDERS_FAILURE:
            return {
                ...state,
                getCustomerExtraCardHoldersPending: false,
                getCustomerExtraCardHoldersError: action.data.error,
            };

        case CUSTOMER_GET_CUSTOMER_EXTRA_CARD_HOLDERS_DISMISS_ERROR:
            return {
                ...state,
                getCustomerExtraCardHoldersError: null,
            };

        default:
            return state;
    }
}
