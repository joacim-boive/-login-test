import {
    ACCOUNT_UPDATE_ACCOUNT_BEGIN,
    ACCOUNT_UPDATE_ACCOUNT_SUCCESS,
    ACCOUNT_UPDATE_ACCOUNT_FAILURE,
    ACCOUNT_UPDATE_ACCOUNT_DISMISS_ERROR,
} from './constants';

import { put } from '../../../common/asyncAjax';

import { UPDATE_ACCOUNT_URL } from './urls';

export const updateAccount = (customerId, referenceId, data) => async dispatch => {
    dispatch({
        type: ACCOUNT_UPDATE_ACCOUNT_BEGIN,
    });

    try {
        const res = await put(UPDATE_ACCOUNT_URL(customerId, referenceId), data);
        dispatch({
            type: ACCOUNT_UPDATE_ACCOUNT_SUCCESS,
            data: res.response,
        });
    } catch (err) {
        dispatch({
            type: ACCOUNT_UPDATE_ACCOUNT_FAILURE,
            data: { error: err },
        });
    }
};

export const dismissUpdateAccountError = () => ({ type: ACCOUNT_UPDATE_ACCOUNT_DISMISS_ERROR });

export function reducer(state, action) {
    switch (action.type) {
        case ACCOUNT_UPDATE_ACCOUNT_BEGIN:
            return {
                ...state,
                updateAccountPending: true,
                updateAccountError: null,
            };

        case ACCOUNT_UPDATE_ACCOUNT_SUCCESS:
            return {
                ...state,
                updateAccountPending: false,
                updateAccountError: null,
            };

        case ACCOUNT_UPDATE_ACCOUNT_FAILURE:
            return {
                ...state,
                updateAccountPending: false,
                updateAccountError: action.data.error,
            };

        case ACCOUNT_UPDATE_ACCOUNT_DISMISS_ERROR:
            return {
                ...state,
                updateAccountError: null,
            };

        default:
            return state;
    }
}
