import Ajax from '@ecster/ecster-net/lib/Ajax';

import {
    COMMON_GET_TEXT_BEGIN,
    COMMON_GET_TEXT_SUCCESS,
    COMMON_GET_TEXT_FAILURE,
    COMMON_GET_TEXT_DISMISS_ERROR,
} from './constants';

import { GET_TEXT_URL } from './urls';

export function getText(country, lang, textId) {
    return (dispatch) => { // optionally you can have getState as the second argument
        dispatch({
            type: COMMON_GET_TEXT_BEGIN,
        });

        return new Promise((resolve, reject) => {
            Ajax.get({ url: GET_TEXT_URL(country, lang, textId) })
                .then(
                    (xhr, res) => {
                        dispatch({
                            type: COMMON_GET_TEXT_SUCCESS,
                            textId: textId,
                            data: res.response,
                        });
                        resolve(res);
                    })
                .catch(
                    (err) => {
                        dispatch({
                            type: COMMON_GET_TEXT_FAILURE,
                            data: { error: err },
                        });
                        reject(err);
                    },
                );
        });
    };
}

export function dismissGetTextError() {
    return {
        type: COMMON_GET_TEXT_DISMISS_ERROR,
    };
}

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
