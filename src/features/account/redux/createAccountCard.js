import { post } from '@ecster/ecster-net/v2';

import {
    ACCOUNT_CREATE_ACCOUNT_CARD_BEGIN,
    ACCOUNT_CREATE_ACCOUNT_CARD_SUCCESS,
    ACCOUNT_CREATE_ACCOUNT_CARD_FAILURE,
    ACCOUNT_CREATE_ACCOUNT_CARD_DISMISS_ERROR,
} from './constants';

import { CREATE_ACCOUNT_CARD_URL } from './urls';

export const createAccountCard = (customerId, accountRef) => async dispatch => {
    dispatch({
        type: ACCOUNT_CREATE_ACCOUNT_CARD_BEGIN,
    });

    try {
        const res = await post(CREATE_ACCOUNT_CARD_URL(customerId, accountRef));

        dispatch({
            type: ACCOUNT_CREATE_ACCOUNT_CARD_SUCCESS,
            data: res.response,
        });
    } catch (err) {
        dispatch({
            type: ACCOUNT_CREATE_ACCOUNT_CARD_FAILURE,
            data: { error: err },
        });
    }
};

export const dismissCreateAccountCardError = () => ({ type: ACCOUNT_CREATE_ACCOUNT_CARD_DISMISS_ERROR });

// don't ES6 this one, rekit studio gets lost /joli44
export function reducer(state, action) {
    switch (action.type) {
        case ACCOUNT_CREATE_ACCOUNT_CARD_BEGIN:
            return {
                ...state,
                createAccountCardPending: true,
                createAccountCardError: null,
            };

        case ACCOUNT_CREATE_ACCOUNT_CARD_SUCCESS:
            return {
                ...state,
                createAccountCardPending: false,
                createAccountCardError: null,
            };

        case ACCOUNT_CREATE_ACCOUNT_CARD_FAILURE:
            return {
                ...state,
                createAccountCardPending: false,
                createAccountCardError: action.data.error,
            };

        case ACCOUNT_CREATE_ACCOUNT_CARD_DISMISS_ERROR:
            return {
                ...state,
                createAccountCardError: null,
            };

        default:
            return state;
    }
}
