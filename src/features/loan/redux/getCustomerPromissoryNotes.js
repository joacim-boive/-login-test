import {
    LOAN_GET_CUSTOMER_PROMISSORY_NOTES_BEGIN,
    LOAN_GET_CUSTOMER_PROMISSORY_NOTES_SUCCESS,
    LOAN_GET_CUSTOMER_PROMISSORY_NOTES_FAILURE,
    LOAN_GET_CUSTOMER_PROMISSORY_NOTES_DISMISS_ERROR,
} from './constants';

import { get } from '../../../common/asyncAjax';

import { GET_CUSTOMER_PROMISSORY_NOTES_URL } from './urls';

export const getCustomerPromissoryNotes = customerId => async (dispatch) => {
    dispatch({
        type: LOAN_GET_CUSTOMER_PROMISSORY_NOTES_BEGIN,
    });

    try {
        const res = await get(GET_CUSTOMER_PROMISSORY_NOTES_URL(customerId));
        dispatch({
            type: LOAN_GET_CUSTOMER_PROMISSORY_NOTES_SUCCESS,
            data: res.response,
        });
    } catch (err) {
        dispatch({
            type: LOAN_GET_CUSTOMER_PROMISSORY_NOTES_FAILURE,
            data: { error: err },
        });
    }
};

export const dismissGetCustomerPromissoryNotesError = () => ({ type: LOAN_GET_CUSTOMER_PROMISSORY_NOTES_DISMISS_ERROR });

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
