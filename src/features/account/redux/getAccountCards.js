import {
    ACCOUNT_GET_ACCOUNT_CARDS_BEGIN,
    ACCOUNT_GET_ACCOUNT_CARDS_SUCCESS,
    ACCOUNT_GET_ACCOUNT_CARDS_FAILURE,
    ACCOUNT_GET_ACCOUNT_CARDS_DISMISS_ERROR,
} from './constants';

import { get } from '../../../common/asyncAjax';

import { GET_ACCOUNT_CARDS_URL } from './urls';

export const getAccountCards = (customerId, referenceId) => async dispatch => {
    dispatch({
        type: ACCOUNT_GET_ACCOUNT_CARDS_BEGIN,
    });

    try {
        const res = await get(GET_ACCOUNT_CARDS_URL(customerId, referenceId));
        dispatch({
            type: ACCOUNT_GET_ACCOUNT_CARDS_SUCCESS,
            data: res.response,
        });
    } catch (err) {
        dispatch({
            type: ACCOUNT_GET_ACCOUNT_CARDS_FAILURE,
            data: { error: err },
        });
    }
};

export const dismissGetAccountCardsError = () => ({ type: ACCOUNT_GET_ACCOUNT_CARDS_DISMISS_ERROR });

// temporary fix
const getMainCard = cards => cards && cards.length > 0 && cards[0];

const getExtraCards = cards => (cards && cards.length > 1 ? cards.slice(1) : []);

export function reducer(state, action) {
    switch (action.type) {
        case ACCOUNT_GET_ACCOUNT_CARDS_BEGIN:
            return {
                ...state,
                getAccountCardsPending: true,
                getAccountCardsError: null,
            };

        case ACCOUNT_GET_ACCOUNT_CARDS_SUCCESS:
            return {
                ...state,
                accountCard: getMainCard(action.data.cards),
                extraCards: getExtraCards(action.data.cards),
                getAccountCardsPending: false,
                getAccountCardsError: null,
            };

        case ACCOUNT_GET_ACCOUNT_CARDS_FAILURE:
            return {
                ...state,
                getAccountCardsPending: false,
                getAccountCardsError: action.data.error,
            };

        case ACCOUNT_GET_ACCOUNT_CARDS_DISMISS_ERROR:
            return {
                ...state,
                getAccountCardsError: null,
            };

        default:
            return state;
    }
}
