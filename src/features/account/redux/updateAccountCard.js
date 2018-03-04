import Ajax from '@ecster/ecster-net/lib/Ajax';

import {
    ACCOUNT_UPDATE_ACCOUNT_CARD_BEGIN,
    ACCOUNT_UPDATE_ACCOUNT_CARD_SUCCESS,
    ACCOUNT_UPDATE_ACCOUNT_CARD_FAILURE,
    ACCOUNT_UPDATE_ACCOUNT_CARD_DISMISS_ERROR,
} from './constants';

import { UPDATE_ACCOUNT_CARD_URL } from './urls';

export function updateAccountCard(customerId, referenceId, data) {
    return (dispatch) => { // optionally you can have getState as the second argument
        dispatch({
            type: ACCOUNT_UPDATE_ACCOUNT_CARD_BEGIN,
        });

        return new Promise((resolve, reject) => {
            Ajax.put({url: UPDATE_ACCOUNT_CARD_URL(customerId, referenceId)}, data)
                .then(
                    (xhr, res) => {
                        dispatch({
                            type: ACCOUNT_UPDATE_ACCOUNT_CARD_SUCCESS,
                            data: res,
                        });
                        resolve(res);
                    })
                .catch(
                    (err) => {
                        dispatch({
                            type: ACCOUNT_UPDATE_ACCOUNT_CARD_FAILURE,
                            data: { error: err },
                        });
                        reject(err);
                    },
                );
        });
    };
}

export function dismissUpdateAccountCardError() {
    return {
        type: ACCOUNT_UPDATE_ACCOUNT_CARD_DISMISS_ERROR,
    };
}

export function reducer(state, action) {
    switch (action.type) {
        case ACCOUNT_UPDATE_ACCOUNT_CARD_BEGIN:
            // Just after a request is sent
            return {
                ...state,
                updateAccountCardPending: true,
                updateAccountCardError: null,
            };

        case ACCOUNT_UPDATE_ACCOUNT_CARD_SUCCESS:
            // The request is success
            return {
                ...state,
                updateAccountCardPending: false,
                updateAccountCardError: null,
            };

        case ACCOUNT_UPDATE_ACCOUNT_CARD_FAILURE:
            // The request is failed
            return {
                ...state,
                updateAccountCardPending: false,
                updateAccountCardError: action.data.error,
            };

        case ACCOUNT_UPDATE_ACCOUNT_CARD_DISMISS_ERROR:
            // Dismiss the request failure error
            return {
                ...state,
                updateAccountCardError: null,
            };

        default:
            return state;
    }
}
