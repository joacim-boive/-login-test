import Ajax from '@ecster/ecster-net/lib/Ajax';

import {
    CUSTOMER_GET_CUSTOMER_EXTRA_CARD_HOLDERS_BEGIN,
    CUSTOMER_GET_CUSTOMER_EXTRA_CARD_HOLDERS_SUCCESS,
    CUSTOMER_GET_CUSTOMER_EXTRA_CARD_HOLDERS_FAILURE,
    CUSTOMER_GET_CUSTOMER_EXTRA_CARD_HOLDERS_DISMISS_ERROR,
} from './constants';

import { GET_CUSTOMER_EXTRA_CARD_HOLDERS_URL } from './urls';

export function getCustomerExtraCardHolders(customerId) {
    return (dispatch) => { // optionally you can have getState as the second argument
        dispatch({
            type: CUSTOMER_GET_CUSTOMER_EXTRA_CARD_HOLDERS_BEGIN,
        });

        return new Promise((resolve, reject) => {
            Ajax.get({ url: GET_CUSTOMER_EXTRA_CARD_HOLDERS_URL(customerId) })
                .then(
                    (xhr, res) => {
                        dispatch({
                            type: CUSTOMER_GET_CUSTOMER_EXTRA_CARD_HOLDERS_SUCCESS,
                            data: res.response,
                        });
                        resolve(res);
                    })
                .catch(
                    (err) => {
                        dispatch({
                            type: CUSTOMER_GET_CUSTOMER_EXTRA_CARD_HOLDERS_FAILURE,
                            data: { error: err },
                        });
                        reject(err);
                    },
                );
        });
    };
}

export function dismissGetCustomerExtraCardHoldersError() {
    return {
        type: CUSTOMER_GET_CUSTOMER_EXTRA_CARD_HOLDERS_DISMISS_ERROR,
    };
}

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
