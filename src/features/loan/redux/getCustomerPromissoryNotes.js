import Ajax from '@ecster/ecster-net/lib/Ajax';

import {
    LOAN_GET_CUSTOMER_PROMISSORY_NOTES_BEGIN,
    LOAN_GET_CUSTOMER_PROMISSORY_NOTES_SUCCESS,
    LOAN_GET_CUSTOMER_PROMISSORY_NOTES_FAILURE,
    LOAN_GET_CUSTOMER_PROMISSORY_NOTES_DISMISS_ERROR,
} from './constants';

import { GET_CUSTOMER_PROMISSORY_NOTES_URL } from './urls';

export function getCustomerPromissoryNotes(customerId) {
    return (dispatch) => { // optionally you can have getState as the second argument
        dispatch({
            type: LOAN_GET_CUSTOMER_PROMISSORY_NOTES_BEGIN,
        });

        return new Promise((resolve, reject) => {
            Ajax.get({url: GET_CUSTOMER_PROMISSORY_NOTES_URL(customerId)})
                .then(
                    (xhr, res) => {
                        dispatch({
                            type: LOAN_GET_CUSTOMER_PROMISSORY_NOTES_SUCCESS,
                            data: res.response,
                        });
                        resolve(res);
                    })
                .catch(
                    (err) => {
                        dispatch({
                            type: LOAN_GET_CUSTOMER_PROMISSORY_NOTES_FAILURE,
                            data: { error: err },
                        });
                        reject(err);
                    },
                );
        });
    };
}

export function dismissGetCustomerPromissoryNotesError() {
    return {
        type: LOAN_GET_CUSTOMER_PROMISSORY_NOTES_DISMISS_ERROR,
    };
}

export function reducer(state, action) {
    switch (action.type) {
        case LOAN_GET_CUSTOMER_PROMISSORY_NOTES_BEGIN:
            return {
                ...state,
                getCustomerPromissoryNotesPending: true,
                getCustomerPromissoryNotesError: null,
            };

        case LOAN_GET_CUSTOMER_PROMISSORY_NOTES_SUCCESS:
            return {
                ...state,
                getcustopromissoryNotes: action.data,
                getCustomerPromissoryNotesPending: false,
                getCustomerPromissoryNotesError: null,
            };

        case LOAN_GET_CUSTOMER_PROMISSORY_NOTES_FAILURE:
            return {
                ...state,
                getCustomerPromissoryNotesPending: false,
                getCustomerPromissoryNotesError: action.data.error,
            };

        case LOAN_GET_CUSTOMER_PROMISSORY_NOTES_DISMISS_ERROR:
            return {
                ...state,
                getCustomerPromissoryNotesError: null,
            };

        default:
            return state;
    }
}
