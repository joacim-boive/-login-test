import { Ajax } from '@ecster/ecster-net';

import {
    ACCOUNT_DELETE_CUSTOMER_ACCOUNT_BEGIN,
    ACCOUNT_DELETE_CUSTOMER_ACCOUNT_SUCCESS,
    ACCOUNT_DELETE_CUSTOMER_ACCOUNT_FAILURE,
    ACCOUNT_DELETE_CUSTOMER_ACCOUNT_DISMISS_ERROR,
} from './constants';
import { DELETE_CUSTOMER_ACCOUNT_URL } from './urls';

// Rekit uses redux-thunk for async actions by default: https://github.com/gaearon/redux-thunk
// If you prefer redux-saga, you can use rekit-plugin-redux-saga: https://github.com/supnate/rekit-plugin-redux-saga
export function deleteCustomerAccount(customerId, referenceId) {
    return (dispatch) => { // optionally you can have getState as the second argument
        dispatch({
            type: ACCOUNT_DELETE_CUSTOMER_ACCOUNT_BEGIN,
        });

        // Return a promise so that you could control UI flow without states in the store.
        // For example: after submit a form, you need to redirect the page to another when succeeds or show some errors message if fails.
        // It's hard to use state to manage it, but returning a promise allows you to easily achieve it.
        // e.g.: handleSubmit() { this.props.actions.submitForm(data).then(()=> {}).catch(() => {}); }
        const promise = new Promise((resolve, reject) => {
            const url = DELETE_CUSTOMER_ACCOUNT_URL(customerId, referenceId);
            Ajax.delete({ url }).then(
                (res) => {
                    dispatch({
                        type: ACCOUNT_DELETE_CUSTOMER_ACCOUNT_SUCCESS,
                        data: res,
                    });
                    resolve(res);
                },
                // Use rejectHandler as the second argument so that render errors won't be caught.
                (err) => {
                    dispatch({
                        type: ACCOUNT_DELETE_CUSTOMER_ACCOUNT_FAILURE,
                        data: { error: err },
                    });
                    reject(err);
                },
            );
        });

        return promise;
    };
}

// Async action saves request error by default, this method is used to dismiss the error info.
// If you don't want errors to be saved in Redux store, just ignore this method.
export function dismissDeleteCustomerAccountError() {
    return {
        type: ACCOUNT_DELETE_CUSTOMER_ACCOUNT_DISMISS_ERROR,
    };
}

export function reducer(state, action) {
    switch (action.type) {
        case ACCOUNT_DELETE_CUSTOMER_ACCOUNT_BEGIN:
            // Just after a request is sent
            return {
                ...state,
                deleteCustomerAccountPending: true,
                deleteCustomerAccountError: null,
            };

        case ACCOUNT_DELETE_CUSTOMER_ACCOUNT_SUCCESS:
            // The request is success
            return {
                ...state,
                deleteCustomerAccountPending: false,
                deleteCustomerAccountError: null,
            };

        case ACCOUNT_DELETE_CUSTOMER_ACCOUNT_FAILURE:
            // The request is failed
            return {
                ...state,
                deleteCustomerAccountPending: false,
                deleteCustomerAccountError: action.data.error,
            };

        case ACCOUNT_DELETE_CUSTOMER_ACCOUNT_DISMISS_ERROR:
            // Dismiss the request failure error
            return {
                ...state,
                deleteCustomerAccountError: null,
            };

        default:
            return state;
    }
}
