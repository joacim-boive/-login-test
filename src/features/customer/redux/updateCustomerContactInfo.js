import {
    CUSTOMER_UPDATE_CUSTOMER_CONTACT_INFO_BEGIN,
    CUSTOMER_UPDATE_CUSTOMER_CONTACT_INFO_SUCCESS,
    CUSTOMER_UPDATE_CUSTOMER_CONTACT_INFO_FAILURE,
    CUSTOMER_UPDATE_CUSTOMER_CONTACT_INFO_DISMISS_ERROR,
} from './constants';

import { put } from '../../../common/asyncAjax';

import { UPDATE_CUSTOMER_CONTACT_INFO_URL } from './urls';
import { getCustomer } from './getCustomer';

export const updateCustomerContactInfo = (customerId, data) => async dispatch => {
    dispatch({
        type: CUSTOMER_UPDATE_CUSTOMER_CONTACT_INFO_BEGIN,
    });

    try {
        const res = await put(UPDATE_CUSTOMER_CONTACT_INFO_URL(customerId), data);
        dispatch({
            type: CUSTOMER_UPDATE_CUSTOMER_CONTACT_INFO_SUCCESS,
            data: res.response,
        });
        dispatch(getCustomer(customerId));
    } catch (err) {
        dispatch({
            type: CUSTOMER_UPDATE_CUSTOMER_CONTACT_INFO_FAILURE,
            data: { error: err },
        });
    }
};

export const dismissUpdateCustomerContactInfoError = () => ({
    type: CUSTOMER_UPDATE_CUSTOMER_CONTACT_INFO_DISMISS_ERROR,
});

export function reducer(state, action) {
    switch (action.type) {
        case CUSTOMER_UPDATE_CUSTOMER_CONTACT_INFO_BEGIN:
            return {
                ...state,
                updateCustomerContactInfoPending: true,
                updateCustomerContactInfoError: null,
            };

        case CUSTOMER_UPDATE_CUSTOMER_CONTACT_INFO_SUCCESS:
            return {
                ...state,
                updateCustomerContactInfoPending: false,
                updateCustomerContactInfoError: null,
            };

        case CUSTOMER_UPDATE_CUSTOMER_CONTACT_INFO_FAILURE:
            return {
                ...state,
                updateCustomerContactInfoPending: false,
                updateCustomerContactInfoError: action.data.error,
            };

        case CUSTOMER_UPDATE_CUSTOMER_CONTACT_INFO_DISMISS_ERROR:
            return {
                ...state,
                updateCustomerContactInfoError: null,
            };

        default:
            return state;
    }
}
