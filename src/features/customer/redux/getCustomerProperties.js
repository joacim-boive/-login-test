import Ajax from '@ecster/ecster-net/lib/Ajax';

import {
    CUSTOMER_GET_CUSTOMER_PROPERTIES_BEGIN,
    CUSTOMER_GET_CUSTOMER_PROPERTIES_SUCCESS,
    CUSTOMER_GET_CUSTOMER_PROPERTIES_FAILURE,
    CUSTOMER_GET_CUSTOMER_PROPERTIES_DISMISS_ERROR,
} from './constants';

import { GET_CUSTOMER_PROPERTIES_URL } from './urls';

export function getCustomerProperties(customerId, property) {
    return (dispatch) => { // optionally you can have getState as the second argument
        dispatch({
            type: CUSTOMER_GET_CUSTOMER_PROPERTIES_BEGIN,
        });

        return new Promise((resolve, reject) => {
            Ajax.get({url: GET_CUSTOMER_PROPERTIES_URL(customerId, property)})
                .then(
                    (xhr, res) => {
                        dispatch({
                            type: CUSTOMER_GET_CUSTOMER_PROPERTIES_SUCCESS,
                            data: res.response,
                        });
                        resolve(res);
                    })
                .catch(
                    (err) => {
                        dispatch({
                            type: CUSTOMER_GET_CUSTOMER_PROPERTIES_FAILURE,
                            data: { error: err },
                        });
                        reject(err);
                    },
                );
        });
    };
}

export function dismissGetCustomerPropertiesError() {
    return {
        type: CUSTOMER_GET_CUSTOMER_PROPERTIES_DISMISS_ERROR,
    };
}

export function reducer(state, action) {
    switch (action.type) {
        case CUSTOMER_GET_CUSTOMER_PROPERTIES_BEGIN:
            // Just after a request is sent
            return {
                ...state,
                getCustomerPropertiesPending: true,
                getCustomerPropertiesError: null,
            };

        case CUSTOMER_GET_CUSTOMER_PROPERTIES_SUCCESS:
            // The request is success
            return {
                ...state,
                getCustomerPropertiesPending: false,
                getCustomerPropertiesError: null,
            };

        case CUSTOMER_GET_CUSTOMER_PROPERTIES_FAILURE:
            // The request is failed
            return {
                ...state,
                getCustomerPropertiesPending: false,
                getCustomerPropertiesError: action.data.error,
            };

        case CUSTOMER_GET_CUSTOMER_PROPERTIES_DISMISS_ERROR:
            // Dismiss the request failure error
            return {
                ...state,
                getCustomerPropertiesError: null,
            };

        default:
            return state;
    }
}
