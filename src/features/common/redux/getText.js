import {
    COMMON_GET_TEXT_BEGIN,
    COMMON_GET_TEXT_SUCCESS,
    COMMON_GET_TEXT_FAILURE,
    COMMON_GET_TEXT_DISMISS_ERROR,
} from './constants';

import { get } from '../../../common/asyncAjax';

import { GET_TEXT_URL } from './urls';

export const getText = (country, lang, textId) => async (dispatch) => {
    dispatch({
        type: COMMON_GET_TEXT_BEGIN,
    });

    try {
        const res = await get(GET_TEXT_URL(country, lang, textId));
        dispatch({
            type: COMMON_GET_TEXT_SUCCESS,
            textId,
            data: res.response,
        });
    } catch (err) {
        dispatch({
            type: COMMON_GET_TEXT_FAILURE,
            data: { error: err },
        });
    }
};

export const dismissGetTextError = () => ({ type: COMMON_GET_TEXT_DISMISS_ERROR });

export function reducer(state, action) {
    switch (action.type) {
        case COMMON_GET_TEXT_BEGIN:
            return {
                ...state,
                getTextPending: true,
                getTextError: null,
            };

        case COMMON_GET_TEXT_SUCCESS:
            return {
                ...state,
                texts: {
                    [action.textId]: action.data
                },
                getTextPending: false,
                getTextError: null,
            };

        case COMMON_GET_TEXT_FAILURE:
            return {
                ...state,
                [action.key]: action.data,
                getTextPending: false,
                getTextError: action.data.error,
            };

        case COMMON_GET_TEXT_DISMISS_ERROR:
            return {
                ...state,
                getTextError: null,
            };

        default:
            return state;
    }
}
