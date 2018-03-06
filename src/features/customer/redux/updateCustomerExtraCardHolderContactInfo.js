import Ajax from '@ecster/ecster-net/lib/Ajax';

import {
    CUSTOMER_UPDATE_CUSTOMER_EXTRA_CARD_HOLDER_CONTACT_INFO_BEGIN,
    CUSTOMER_UPDATE_CUSTOMER_EXTRA_CARD_HOLDER_CONTACT_INFO_SUCCESS,
    CUSTOMER_UPDATE_CUSTOMER_EXTRA_CARD_HOLDER_CONTACT_INFO_FAILURE,
    CUSTOMER_UPDATE_CUSTOMER_EXTRA_CARD_HOLDER_CONTACT_INFO_DISMISS_ERROR,
} from './constants';

import { UPDATE_CUSTOMER_EXTRA_CARD_HOLDER_CONTACT_INFO_URL } from './urls';

export function updateCustomerExtraCardHolderContactInfo(customerId, data) {
    return (dispatch) => { // optionally you can have getState as the second argument
        dispatch({
            type: CUSTOMER_UPDATE_CUSTOMER_EXTRA_CARD_HOLDER_CONTACT_INFO_BEGIN,
        });

        return new Promise((resolve, reject) => {
            Ajax.put({ url: UPDATE_CUSTOMER_EXTRA_CARD_HOLDER_CONTACT_INFO_URL(customerId) }, data)
                .then(
                    (xhr, res) => {
                        dispatch({
                            type: CUSTOMER_UPDATE_CUSTOMER_EXTRA_CARD_HOLDER_CONTACT_INFO_SUCCESS,
                            data: res.response,
                        });
                        resolve(res);
                    })
                .catch(
                    (err) => {
                        dispatch({
                            type: CUSTOMER_UPDATE_CUSTOMER_EXTRA_CARD_HOLDER_CONTACT_INFO_FAILURE,
                            data: { error: err },
                        });
                        reject(err);
                    },
                );
        });
    };
}

export function dismissUpdateCustomerExtraCardHolderContactInfoError() {
    return {
        type: CUSTOMER_UPDATE_CUSTOMER_EXTRA_CARD_HOLDER_CONTACT_INFO_DISMISS_ERROR,
    };
}

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
