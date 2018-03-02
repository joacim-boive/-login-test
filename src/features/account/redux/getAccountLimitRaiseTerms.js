import { Ajax } from '@ecster/ecster-net';

import {
    ACCOUNT_GET_ACCOUNT_LIMIT_RAISE_TERMS_BEGIN,
    ACCOUNT_GET_ACCOUNT_LIMIT_RAISE_TERMS_SUCCESS,
    ACCOUNT_GET_ACCOUNT_LIMIT_RAISE_TERMS_FAILURE,
    ACCOUNT_GET_ACCOUNT_LIMIT_RAISE_TERMS_DISMISS_ERROR,
} from './constants';

import { GET_ACCOUNT_LIMIT_RAISE_TERMS_URL } from './urls';

// Rekit uses redux-thunk for async actions by default: https://github.com/gaearon/redux-thunk
// If you prefer redux-saga, you can use rekit-plugin-redux-saga: https://github.com/supnate/rekit-plugin-redux-saga
export function getAccountLimitRaiseTerms(country, lang) {
    return (dispatch) => { // optionally you can have getState as the second argument
        dispatch({
            type: ACCOUNT_GET_ACCOUNT_LIMIT_RAISE_TERMS_BEGIN,
        });

        // Return a promise so that you could control UI flow without states in the store.
        // For example: after submit a form, you need to redirect the page to another when succeeds or show some errors message if fails.
        // It's hard to use state to manage it, but returning a promise allows you to easily achieve it.
        // e.g.: handleSubmit() { this.props.actions.submitForm(data).then(()=> {}).catch(() => {}); }
        const promise = new Promise((resolve, reject) => {
            // doRequest is a placeholder Promise. You should replace it with your own logic.
            // See the real-word example at:  https://github.com/supnate/rekit/blob/master/src/features/home/redux/fetchRedditReactjsList.js
            // args.error here is only for test coverage purpose.
            Ajax.get({ url: GET_ACCOUNT_LIMIT_RAISE_TERMS_URL(country, lang) }).then(
                (res) => {
                    dispatch({
                        type: ACCOUNT_GET_ACCOUNT_LIMIT_RAISE_TERMS_SUCCESS,
                        data: res,
                    });
                    resolve(res);
                },
                // Use rejectHandler as the second argument so that render errors won't be caught.
                (err) => {
                    dispatch({
                        type: ACCOUNT_GET_ACCOUNT_LIMIT_RAISE_TERMS_FAILURE,
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
export function dismissGetAccountLimitRaiseTermsError() {
    return {
        type: ACCOUNT_GET_ACCOUNT_LIMIT_RAISE_TERMS_DISMISS_ERROR,
    };
}

export function reducer(state, action) {
    switch (action.type) {
        case ACCOUNT_GET_ACCOUNT_LIMIT_RAISE_TERMS_BEGIN:
            // Just after a request is sent
            return {
                ...state,
                getAccountLimitRaiseTermsPending: true,
                getAccountLimitRaiseTermsError: null,
            };

        case ACCOUNT_GET_ACCOUNT_LIMIT_RAISE_TERMS_SUCCESS:
            // The request is success
            return {
                ...state,
                getAccountLimitRaiseTermsPending: false,
                getAccountLimitRaiseTermsError: null,
            };

        case ACCOUNT_GET_ACCOUNT_LIMIT_RAISE_TERMS_FAILURE:
            // The request is failed
            return {
                ...state,
                getAccountLimitRaiseTermsPending: false,
                getAccountLimitRaiseTermsError: action.data.error,
            };

        case ACCOUNT_GET_ACCOUNT_LIMIT_RAISE_TERMS_DISMISS_ERROR:
            // Dismiss the request failure error
            return {
                ...state,
                getAccountLimitRaiseTermsError: null,
            };

        default:
            return state;
    }
}
