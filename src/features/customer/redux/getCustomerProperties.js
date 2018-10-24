import {
    CUSTOMER_GET_CUSTOMER_PROPERTIES_BEGIN,
    CUSTOMER_GET_CUSTOMER_PROPERTIES_SUCCESS,
    CUSTOMER_GET_CUSTOMER_PROPERTIES_FAILURE,
    CUSTOMER_GET_CUSTOMER_PROPERTIES_DISMISS_ERROR,
} from './constants';

import { get } from '../../../common/asyncAjax';

import { GET_CUSTOMER_PROPERTIES_URL } from './urls';

export const getCustomerProperties = (customerId, property) => async dispatch => {
    dispatch({
        type: CUSTOMER_GET_CUSTOMER_PROPERTIES_BEGIN,
    });

    try {
        const res = await get(GET_CUSTOMER_PROPERTIES_URL(customerId, property));
        dispatch({
            type: CUSTOMER_GET_CUSTOMER_PROPERTIES_SUCCESS,
            property,
            data: res.response,
        });
    } catch (err) {
        dispatch({
            type: CUSTOMER_GET_CUSTOMER_PROPERTIES_FAILURE,
            data: { error: err },
        });
    }
};

export const dismissGetCustomerPropertiesError = () => ({ type: CUSTOMER_GET_CUSTOMER_PROPERTIES_DISMISS_ERROR });

export function reducer(state, action) {
    switch (action.type) {
        case CUSTOMER_GET_CUSTOMER_PROPERTIES_BEGIN:
            return {
                ...state,
                getCustomerPropertiesPending: true,
                getCustomerPropertiesError: null,
            };

        case CUSTOMER_GET_CUSTOMER_PROPERTIES_SUCCESS:
            return {
                ...state,
                [action.property]: action.data.properties[0].value,
                getCustomerPropertiesPending: false,
                getCustomerPropertiesError: null,
            };

        case CUSTOMER_GET_CUSTOMER_PROPERTIES_FAILURE:
            return {
                ...state,
                getCustomerPropertiesPending: false,
                getCustomerPropertiesError: action.data.error,
            };

        case CUSTOMER_GET_CUSTOMER_PROPERTIES_DISMISS_ERROR:
            return {
                ...state,
                getCustomerPropertiesError: null,
            };

        default:
            return state;
    }
}
