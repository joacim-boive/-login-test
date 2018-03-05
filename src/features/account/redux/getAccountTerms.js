import Ajax from '@ecster/ecster-net/lib/Ajax';

import {
    ACCOUNT_GET_ACCOUNT_TERMS_BEGIN,
    ACCOUNT_GET_ACCOUNT_TERMS_SUCCESS,
    ACCOUNT_GET_ACCOUNT_TERMS_FAILURE,
    ACCOUNT_GET_ACCOUNT_TERMS_DISMISS_ERROR,
} from './constants';

import { GET_ACCOUNT_TERMS_URL } from './urls';

export function getAccountTerms(customerId) {
    return (dispatch) => { // optionally you can have getState as the second argument
        dispatch({
            type: ACCOUNT_GET_ACCOUNT_TERMS_BEGIN,
        });

        return new Promise((resolve, reject) => {
            Ajax.get({ url: GET_ACCOUNT_TERMS_URL(customerId) })
                .then(
                    (xhr, res) => {
                        dispatch({
                            type: ACCOUNT_GET_ACCOUNT_TERMS_SUCCESS,
                            data: res.response,
                        });
                        resolve(res);
                    })
                .catch(
                    (err) => {
                        dispatch({
                            type: ACCOUNT_GET_ACCOUNT_TERMS_FAILURE,
                            data: { error: err },
                        });
                        reject(err);
                    },
                );
        });
    };
}

export function dismissGetAccountTermsError() {
    return {
        type: ACCOUNT_GET_ACCOUNT_TERMS_DISMISS_ERROR,
    };
}

export function reducer(state, action) {
    switch (action.type) {
        case ACCOUNT_GET_ACCOUNT_TERMS_BEGIN:
            return {
                ...state,
                getAccountTermsPending: true,
                getAccountTermsError: null,
            };

        case ACCOUNT_GET_ACCOUNT_TERMS_SUCCESS:
            return {
                ...state,
                accountTerms: action.data,
                getAccountTermsPending: false,
                getAccountTermsError: null,
            };

        case ACCOUNT_GET_ACCOUNT_TERMS_FAILURE:
            return {
                ...state,
                getAccountTermsPending: false,
                getAccountTermsError: action.data.error,
            };

        case ACCOUNT_GET_ACCOUNT_TERMS_DISMISS_ERROR:
            return {
                ...state,
                getAccountTermsError: null,
            };

        default:
            return state;
    }
}
