import {
    ACCOUNT_GET_ACCOUNT_BEGIN,
    ACCOUNT_GET_ACCOUNT_SUCCESS,
    ACCOUNT_GET_ACCOUNT_FAILURE,
    ACCOUNT_GET_ACCOUNT_DISMISS_ERROR,
} from './constants';

import { get } from '../../../common/asyncAjax';

import { GET_ACCOUNT_URL } from './urls';

export const getAccount = (customerId, refcode) => async (dispatch) => {
    dispatch({
        type: ACCOUNT_GET_ACCOUNT_BEGIN,
    });

    try {
        const res = await get(GET_ACCOUNT_URL(customerId, refcode));
        dispatch({
            type: ACCOUNT_GET_ACCOUNT_SUCCESS,
            data: res.response
        });
    } catch (err) {
        dispatch({
            type: ACCOUNT_GET_ACCOUNT_FAILURE,
            data: { error: err }
        });
    }
};

export const dismissGetAccountError = () => ({ type: ACCOUNT_GET_ACCOUNT_DISMISS_ERROR });

export function reducer(state, action) {
    switch (action.type) {
        case ACCOUNT_GET_ACCOUNT_BEGIN:
            return {
                ...state,
                getAccountPending: true,
                getAccountError: null,
            };

        case ACCOUNT_GET_ACCOUNT_SUCCESS:
            return {
                ...state,
                account: action.data,
                getAccountPending: false,
                getAccountError: null,
            };

        case ACCOUNT_GET_ACCOUNT_FAILURE:
            return {
                ...state,
                getAccountPending: false,
                getAccountError: action.data.error,
            };

        case ACCOUNT_GET_ACCOUNT_DISMISS_ERROR:
            return {
                ...state,
                getAccountError: null,
            };

        default:
            return state;
    }
}
