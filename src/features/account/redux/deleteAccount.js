import {
    ACCOUNT_DELETE_ACCOUNT_BEGIN,
    ACCOUNT_DELETE_ACCOUNT_SUCCESS,
    ACCOUNT_DELETE_ACCOUNT_FAILURE,
    ACCOUNT_DELETE_ACCOUNT_DISMISS_ERROR,
} from './constants';

import { del } from '../../../common/asyncAjax';

import { DELETE_ACCOUNT_URL } from './urls';

export const deleteAccount = (customerId, referenceId) => async dispatch => {
    dispatch({
        type: ACCOUNT_DELETE_ACCOUNT_BEGIN,
    });

    try {
        const res = await del(DELETE_ACCOUNT_URL(customerId, referenceId));
        dispatch({
            type: ACCOUNT_DELETE_ACCOUNT_SUCCESS,
            data: res.response,
        });
    } catch (err) {
        dispatch({
            type: ACCOUNT_DELETE_ACCOUNT_FAILURE,
            data: { error: err },
        });
    }
};

export const dismissDeleteAccountError = () => ({ type: ACCOUNT_DELETE_ACCOUNT_DISMISS_ERROR });

export function reducer(state, action) {
    switch (action.type) {
        case ACCOUNT_DELETE_ACCOUNT_BEGIN:
            return {
                ...state,
                deleteAccountPending: true,
                deleteAccountError: null,
            };

        case ACCOUNT_DELETE_ACCOUNT_SUCCESS:
            return {
                ...state,
                deleteAccountPending: false,
                deleteAccountError: null,
            };

        case ACCOUNT_DELETE_ACCOUNT_FAILURE:
            return {
                ...state,
                deleteAccountPending: false,
                deleteAccountError: action.data.error,
            };

        case ACCOUNT_DELETE_ACCOUNT_DISMISS_ERROR:
            return {
                ...state,
                deleteAccountError: null,
            };

        default:
            return state;
    }
}
