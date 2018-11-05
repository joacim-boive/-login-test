import {
    ACCOUNT_UPDATE_ACCOUNT_CARD_BEGIN,
    ACCOUNT_UPDATE_ACCOUNT_CARD_SUCCESS,
    ACCOUNT_UPDATE_ACCOUNT_CARD_FAILURE,
    ACCOUNT_UPDATE_ACCOUNT_CARD_DISMISS_ERROR,
} from './constants';

import { put } from '../../../common/asyncAjax';

import { UPDATE_ACCOUNT_CARD_URL } from './urls';

export const updateAccountCard = (customerId, accountRef) => async dispatch => {
    dispatch({
        type: ACCOUNT_UPDATE_ACCOUNT_CARD_BEGIN,
    });

    try {
        const res = await put(UPDATE_ACCOUNT_CARD_URL(customerId, accountRef));
        dispatch({
            type: ACCOUNT_UPDATE_ACCOUNT_CARD_SUCCESS,
            data: res.response,
        });
    } catch (err) {
        dispatch({
            type: ACCOUNT_UPDATE_ACCOUNT_CARD_FAILURE,
            data: { error: err },
        });
    }
};

export const dismissUpdateAccountCardError = () => ({ type: ACCOUNT_UPDATE_ACCOUNT_CARD_DISMISS_ERROR });

export function reducer(state, action) {
    switch (action.type) {
        case ACCOUNT_UPDATE_ACCOUNT_CARD_BEGIN:
            return {
                ...state,
                updateAccountCardPending: true,
                updateAccountCardError: null,
            };

        case ACCOUNT_UPDATE_ACCOUNT_CARD_SUCCESS:
            return {
                ...state,
                updateAccountCardPending: false,
                updateAccountCardError: null,
            };

        case ACCOUNT_UPDATE_ACCOUNT_CARD_FAILURE:
            return {
                ...state,
                updateAccountCardPending: false,
                updateAccountCardError: action.data.error,
            };

        case ACCOUNT_UPDATE_ACCOUNT_CARD_DISMISS_ERROR:
            return {
                ...state,
                updateAccountCardError: null,
            };

        default:
            return state;
    }
}
