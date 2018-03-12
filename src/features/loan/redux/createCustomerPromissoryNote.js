import {
    LOAN_CREATE_CUSTOMER_PROMISSORY_NOTE_BEGIN,
    LOAN_CREATE_CUSTOMER_PROMISSORY_NOTE_SUCCESS,
    LOAN_CREATE_CUSTOMER_PROMISSORY_NOTE_FAILURE,
    LOAN_CREATE_CUSTOMER_PROMISSORY_NOTE_DISMISS_ERROR,
} from './constants';

import { post } from '../../../common/asyncAjax';

import { CREATE_CUSTOMER_PROMISSORY_NOTE_URL } from './urls';

export const createCustomerPromissoryNote = (customerId, data) => async (dispatch) => {
    dispatch({
        type: LOAN_CREATE_CUSTOMER_PROMISSORY_NOTE_BEGIN,
    });

    try {
        const res = await post(CREATE_CUSTOMER_PROMISSORY_NOTE_URL(customerId), data);
        dispatch({
            type: LOAN_CREATE_CUSTOMER_PROMISSORY_NOTE_SUCCESS,
            data: res.response,
        });
    } catch (err) {
        dispatch({
            type: LOAN_CREATE_CUSTOMER_PROMISSORY_NOTE_FAILURE,
            data: { error: err },
        });
    }
};

export const dismissCreateCustomerPromissoryNoteError = () => ({ type: LOAN_CREATE_CUSTOMER_PROMISSORY_NOTE_DISMISS_ERROR });

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
