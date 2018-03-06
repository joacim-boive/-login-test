import Ajax from '@ecster/ecster-net/lib/Ajax';

import {
    LOAN_CREATE_CUSTOMER_PROMISSORY_NOTE_BEGIN,
    LOAN_CREATE_CUSTOMER_PROMISSORY_NOTE_SUCCESS,
    LOAN_CREATE_CUSTOMER_PROMISSORY_NOTE_FAILURE,
    LOAN_CREATE_CUSTOMER_PROMISSORY_NOTE_DISMISS_ERROR,
} from './constants';

import { CREATE_CUSTOMER_PROMISSORY_NOTE_URL } from './urls';

export function createCustomerPromissoryNote(customerId, data) {
    return (dispatch) => { // optionally you can have getState as the second argument
        dispatch({
            type: LOAN_CREATE_CUSTOMER_PROMISSORY_NOTE_BEGIN,
        });

        return new Promise((resolve, reject) => {
            Ajax.post({ url: CREATE_CUSTOMER_PROMISSORY_NOTE_URL(customerId) }, data)
                .then(
                    (xhr, res) => {
                        dispatch({
                            type: LOAN_CREATE_CUSTOMER_PROMISSORY_NOTE_SUCCESS,
                            data: res.response,
                        });
                        resolve(res);
                    })
                .catch(
                    (err) => {
                        dispatch({
                            type: LOAN_CREATE_CUSTOMER_PROMISSORY_NOTE_FAILURE,
                            data: { error: err },
                        });
                        reject(err);
                    },
                );
        });
    };
}

export function dismissCreateCustomerPromissoryNoteError() {
    return {
        type: LOAN_CREATE_CUSTOMER_PROMISSORY_NOTE_DISMISS_ERROR,
    };
}

export function reducer(state, action) {
    switch (action.type) {
        case LOAN_CREATE_CUSTOMER_PROMISSORY_NOTE_BEGIN:
            return {
                ...state,
                createCustomerPromissoryNotePending: true,
                createCustomerPromissoryNoteError: null,
            };

        case LOAN_CREATE_CUSTOMER_PROMISSORY_NOTE_SUCCESS:
            return {
                ...state,
                createCustomerPromissoryNotePending: false,
                createCustomerPromissoryNoteError: null,
            };

        case LOAN_CREATE_CUSTOMER_PROMISSORY_NOTE_FAILURE:
            return {
                ...state,
                createCustomerPromissoryNotePending: false,
                createCustomerPromissoryNoteError: action.data.error,
            };

        case LOAN_CREATE_CUSTOMER_PROMISSORY_NOTE_DISMISS_ERROR:
            return {
                ...state,
                createCustomerPromissoryNoteError: null,
            };

        default:
            return state;
    }
}
