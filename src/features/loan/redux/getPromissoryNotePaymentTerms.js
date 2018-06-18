import {
    LOAN_GET_PROMISSORY_NOTE_PAYMENT_TERMS_BEGIN,
    LOAN_GET_PROMISSORY_NOTE_PAYMENT_TERMS_SUCCESS,
    LOAN_GET_PROMISSORY_NOTE_PAYMENT_TERMS_FAILURE,
    LOAN_GET_PROMISSORY_NOTE_PAYMENT_TERMS_DISMISS_ERROR,
} from './constants';

import { get } from '../../../common/asyncAjax';

import { GET_PROMISSORY_NOTE_PAYMENT_TERMS_URL } from './urls';

export const getPromissoryNotePaymentTerms = (amount, paymentPeriodYear, makePaymentPlan) => async dispatch => {
    dispatch({
        type: LOAN_GET_PROMISSORY_NOTE_PAYMENT_TERMS_BEGIN,
    });

    try {
        const res = await get(GET_PROMISSORY_NOTE_PAYMENT_TERMS_URL(amount, paymentPeriodYear, makePaymentPlan));
        dispatch({
            type: LOAN_GET_PROMISSORY_NOTE_PAYMENT_TERMS_SUCCESS,
            data: res.response,
        });
    } catch (err) {
        dispatch({
            type: LOAN_GET_PROMISSORY_NOTE_PAYMENT_TERMS_FAILURE,
            data: { error: err },
        });
    }
};

export const dismissGetPromissoryNotePaymentTermsError = () => ({
    type: LOAN_GET_PROMISSORY_NOTE_PAYMENT_TERMS_DISMISS_ERROR,
});

export function reducer(state, action) {
    switch (action.type) {
        case LOAN_GET_PROMISSORY_NOTE_PAYMENT_TERMS_BEGIN:
            return {
                ...state,
                getPromissoryNotePaymentTermsPending: true,
                getPromissoryNotePaymentTermsError: null,
            };

        case LOAN_GET_PROMISSORY_NOTE_PAYMENT_TERMS_SUCCESS:
            return {
                ...state,
                promissoryNotePaymentTerms: action.data,
                getPromissoryNotePaymentTermsPending: false,
                getPromissoryNotePaymentTermsError: null,
            };

        case LOAN_GET_PROMISSORY_NOTE_PAYMENT_TERMS_FAILURE:
            return {
                ...state,
                getPromissoryNotePaymentTermsPending: false,
                getPromissoryNotePaymentTermsError: action.data.error,
            };

        case LOAN_GET_PROMISSORY_NOTE_PAYMENT_TERMS_DISMISS_ERROR:
            return {
                ...state,
                getPromissoryNotePaymentTermsError: null,
            };

        default:
            return state;
    }
}
