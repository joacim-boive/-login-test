import Ajax from '@ecster/ecster-net/lib/Ajax';

import {
    ACCOUNT_DELETE_ACCOUNT_BEGIN,
    ACCOUNT_DELETE_ACCOUNT_SUCCESS,
    ACCOUNT_DELETE_ACCOUNT_FAILURE,
    ACCOUNT_DELETE_ACCOUNT_DISMISS_ERROR,
} from './constants';

import { DELETE_CUSTOMER_ACCOUNT_URL } from './urls';

export function deleteAccount(customerId, referenceId) {
    return (dispatch) => { // optionally you can have getState as the second argument
        dispatch({
            type: ACCOUNT_DELETE_ACCOUNT_BEGIN,
        });

        return new Promise((resolve, reject) => {
            const url = DELETE_CUSTOMER_ACCOUNT_URL(customerId, referenceId);

            Ajax.delete({ url }).then(
                (res) => {
                    dispatch({
                        type: ACCOUNT_DELETE_ACCOUNT_SUCCESS,
                        data: res,
                    });
                    resolve(res);
                },
                (err) => {
                    dispatch({
                        type: ACCOUNT_DELETE_ACCOUNT_FAILURE,
                        data: { error: err },
                    });
                    reject(err);
                },
            );
        });
    };
}

export function dismissDeleteCustomerAccountError() {
    return {
        type: ACCOUNT_DELETE_ACCOUNT_DISMISS_ERROR,
    };
}

export function reducer(state, action) {
    switch (action.type) {
        case ACCOUNT_DELETE_ACCOUNT_BEGIN:
            // Just after a request is sent
            return {
                ...state,
                deleteCustomerAccountPending: true,
                deleteCustomerAccountError: null,
            };

        case ACCOUNT_DELETE_ACCOUNT_SUCCESS:
            // The request is success
            return {
                ...state,
                deleteCustomerAccountPending: false,
                deleteCustomerAccountError: null,
            };

        case ACCOUNT_DELETE_ACCOUNT_FAILURE:
            // The request is failed
            return {
                ...state,
                deleteCustomerAccountPending: false,
                deleteCustomerAccountError: action.data.error,
            };

        case ACCOUNT_DELETE_ACCOUNT_DISMISS_ERROR:
            // Dismiss the request failure error
            return {
                ...state,
                deleteCustomerAccountError: null,
            };

        default:
            return state;
    }
}
