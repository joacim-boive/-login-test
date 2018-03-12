import {
    CUSTOMER_UPDATE_CUSTOMER_EXTRA_CARD_HOLDER_CONTACT_INFO_BEGIN,
    CUSTOMER_UPDATE_CUSTOMER_EXTRA_CARD_HOLDER_CONTACT_INFO_SUCCESS,
    CUSTOMER_UPDATE_CUSTOMER_EXTRA_CARD_HOLDER_CONTACT_INFO_FAILURE,
    CUSTOMER_UPDATE_CUSTOMER_EXTRA_CARD_HOLDER_CONTACT_INFO_DISMISS_ERROR,
} from './constants';

import { put } from '../../../common/asyncAjax';

import { UPDATE_CUSTOMER_EXTRA_CARD_HOLDER_CONTACT_INFO_URL } from './urls';

export const updateCustomerExtraCardHolderContactInfo = (customerId, data) => async (dispatch) => {
    dispatch({
        type: CUSTOMER_UPDATE_CUSTOMER_EXTRA_CARD_HOLDER_CONTACT_INFO_BEGIN,
    });

    try {
        const res = await put(UPDATE_CUSTOMER_EXTRA_CARD_HOLDER_CONTACT_INFO_URL(customerId), data);
        dispatch({
            type: CUSTOMER_UPDATE_CUSTOMER_EXTRA_CARD_HOLDER_CONTACT_INFO_SUCCESS,
            data: res.response,
        });
    } catch (err) {
        dispatch({
            type: CUSTOMER_UPDATE_CUSTOMER_EXTRA_CARD_HOLDER_CONTACT_INFO_FAILURE,
            data: { error: err },
        });
    }
};

export const dismissUpdateCustomerExtraCardHolderContactInfoError = () => ({ type: CUSTOMER_UPDATE_CUSTOMER_EXTRA_CARD_HOLDER_CONTACT_INFO_DISMISS_ERROR });

export function reducer(state, action) {
    switch (action.type) {
        case CUSTOMER_UPDATE_CUSTOMER_EXTRA_CARD_HOLDER_CONTACT_INFO_BEGIN:
            return {
                ...state,
                updateCustomerExtraCardHolderContactInfoPending: true,
                updateCustomerExtraCardHolderContactInfoError: null,
            };

        case CUSTOMER_UPDATE_CUSTOMER_EXTRA_CARD_HOLDER_CONTACT_INFO_SUCCESS:
            return {
                ...state,
                updateCustomerExtraCardHolderContactInfoPending: false,
                updateCustomerExtraCardHolderContactInfoError: null,
            };

        case CUSTOMER_UPDATE_CUSTOMER_EXTRA_CARD_HOLDER_CONTACT_INFO_FAILURE:
            return {
                ...state,
                updateCustomerExtraCardHolderContactInfoPending: false,
                updateCustomerExtraCardHolderContactInfoError: action.data.error,
            };

        case CUSTOMER_UPDATE_CUSTOMER_EXTRA_CARD_HOLDER_CONTACT_INFO_DISMISS_ERROR:
            return {
                ...state,
                updateCustomerExtraCardHolderContactInfoError: null,
            };

        default:
            return state;
    }
}
