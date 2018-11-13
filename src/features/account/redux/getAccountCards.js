import {
    ACCOUNT_GET_ACCOUNT_CARDS_BEGIN,
    ACCOUNT_GET_ACCOUNT_CARDS_SUCCESS,
    ACCOUNT_GET_ACCOUNT_CARDS_FAILURE,
    ACCOUNT_GET_ACCOUNT_CARDS_DISMISS_ERROR,
} from './constants';

import { get } from '../../../common/asyncAjax';

import { GET_ACCOUNT_CARDS_URL } from './urls';

const testNo = window.location.hash.split('test=')[1]; // ...?test=01

export const getAccountCards = (customerId, referenceId) => async dispatch => {
    dispatch({
        type: ACCOUNT_GET_ACCOUNT_CARDS_BEGIN,
    });

    try {
        const res = testNo
            ? await get(`test/${testNo}-cards.json`)
            : await get(GET_ACCOUNT_CARDS_URL(customerId, referenceId));
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

/**
 * slice cards array into:
 * - one main card (or no main card)
 * - array of extra cards (or empty array)
 * @return { mainCard: { ... }, extraCards: [ ... ] }
 */
const sliceCards = cards => {
    if (cards && cards.length > 0) {
        const result = {};

        const mainCards = cards.filter(card => !card.extraCard);

        if (mainCards && mainCards.length > 0) {
            result.mainCard = mainCards[0]; // eslint-disable-line prefer-destructuring
        }

        // do we have "corrupt" data with many main cards?
        if (mainCards && mainCards.length > 1) {
            result.extraCards = cards.slice(1);
        } else {
            result.extraCards = cards.filter(card => card.extraCard);
        }

        return result;
    }

    return { mainCard: undefined, extraCards: [] };
};

export function reducer(state, action) {
    switch (action.type) {
        case ACCOUNT_GET_ACCOUNT_CARDS_BEGIN:
            return {
                ...state,
                getAccountCardsPending: true,
                getAccountCardsError: null,
            };

        case ACCOUNT_GET_ACCOUNT_CARDS_SUCCESS:
            const slicedCards = sliceCards(action.data.cards);
            return {
                ...state,
                accountCard: slicedCards.mainCard,
                extraCards: slicedCards.extraCards,
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
