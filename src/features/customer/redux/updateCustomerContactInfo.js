import Ajax from '@ecster/ecster-net/lib/Ajax';

import {
    CUSTOMER_UPDATE_CUSTOMER_CONTACT_INFO_BEGIN,
    CUSTOMER_UPDATE_CUSTOMER_CONTACT_INFO_SUCCESS,
    CUSTOMER_UPDATE_CUSTOMER_CONTACT_INFO_FAILURE,
    CUSTOMER_UPDATE_CUSTOMER_CONTACT_INFO_DISMISS_ERROR,
} from './constants';

import {UPDATE_CUSTOMER_CONTACT_INFO_URL} from './urls';

export function updateCustomerContactInfo(customerId, data) {
    return (dispatch) => { // optionally you can have getState as the second argument
        dispatch({
            type: CUSTOMER_UPDATE_CUSTOMER_CONTACT_INFO_BEGIN,
        });

        return new Promise((resolve, reject) => {
            Ajax.put({url: UPDATE_CUSTOMER_CONTACT_INFO_URL(customerId)}, data).then(
                (res) => {
                    dispatch({
                        type: CUSTOMER_UPDATE_CUSTOMER_CONTACT_INFO_SUCCESS,
                        data: res,
                    });
                    resolve(res);
                },
                (err) => {
                    dispatch({
                        type: CUSTOMER_UPDATE_CUSTOMER_CONTACT_INFO_FAILURE,
                        data: {error: err},
                    });
                    reject(err);
                },
            );
        });
    };
}

export function dismissUpdateCustomerContactInfoError() {
    return {
        type: CUSTOMER_UPDATE_CUSTOMER_CONTACT_INFO_DISMISS_ERROR,
    };
}

export function reducer(state, action) {
    switch (action.type) {
        case CUSTOMER_UPDATE_CUSTOMER_CONTACT_INFO_BEGIN:
            // Just after a request is sent
            return {
                ...state,
                updateCustomerContactInfoPending: true,
                updateCustomerContactInfoError: null,
            };

        case CUSTOMER_UPDATE_CUSTOMER_CONTACT_INFO_SUCCESS:
            // The request is success
            return {
                ...state,
                updateCustomerContactInfoPending: false,
                updateCustomerContactInfoError: null,
            };

        case CUSTOMER_UPDATE_CUSTOMER_CONTACT_INFO_FAILURE:
            // The request is failed
            return {
                ...state,
                updateCustomerContactInfoPending: false,
                updateCustomerContactInfoError: action.data.error,
            };

        case CUSTOMER_UPDATE_CUSTOMER_CONTACT_INFO_DISMISS_ERROR:
            // Dismiss the request failure error
            return {
                ...state,
                updateCustomerContactInfoError: null,
            };

        default:
            return state;
    }
}
