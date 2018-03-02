import { Ajax } from '@ecster/ecster-net';

import {
  LOAN_GET_PROMISSORY_NOTE_PAYMENT_TERMS_BEGIN,
  LOAN_GET_PROMISSORY_NOTE_PAYMENT_TERMS_SUCCESS,
  LOAN_GET_PROMISSORY_NOTE_PAYMENT_TERMS_FAILURE,
  LOAN_GET_PROMISSORY_NOTE_PAYMENT_TERMS_DISMISS_ERROR,
} from './constants';

import { GET_PROMISSORY_NOTE_PAYMENT_TERMS_URL } from './urls';

export function getPromissoryNotePaymentTerms(paymentPeriodYear, makePaymentPlan) {
  return (dispatch) => { // optionally you can have getState as the second argument
    dispatch({
      type: LOAN_GET_PROMISSORY_NOTE_PAYMENT_TERMS_BEGIN,
    });

    const promise = new Promise((resolve, reject) => {
      Ajax.get({url: GET_PROMISSORY_NOTE_PAYMENT_TERMS_URL(paymentPeriodYear, makePaymentPlan)}).then(
        (res) => {
          dispatch({
            type: LOAN_GET_PROMISSORY_NOTE_PAYMENT_TERMS_SUCCESS,
            data: res,
          });
          resolve(res);
        },
        (err) => {
          dispatch({
            type: LOAN_GET_PROMISSORY_NOTE_PAYMENT_TERMS_FAILURE,
            data: { error: err },
          });
          reject(err);
        },
      );
    });

    return promise;
  };
}

export function dismissGetPromissoryNotePaymentTermsError() {
  return {
    type: LOAN_GET_PROMISSORY_NOTE_PAYMENT_TERMS_DISMISS_ERROR,
  };
}

export function reducer(state, action) {
  switch (action.type) {
    case LOAN_GET_PROMISSORY_NOTE_PAYMENT_TERMS_BEGIN:
      // Just after a request is sent
      return {
        ...state,
        getPromissoryNotePaymentTermsPending: true,
        getPromissoryNotePaymentTermsError: null,
      };

    case LOAN_GET_PROMISSORY_NOTE_PAYMENT_TERMS_SUCCESS:
      // The request is success
      return {
        ...state,
        getPromissoryNotePaymentTermsPending: false,
        getPromissoryNotePaymentTermsError: null,
      };

    case LOAN_GET_PROMISSORY_NOTE_PAYMENT_TERMS_FAILURE:
      // The request is failed
      return {
        ...state,
        getPromissoryNotePaymentTermsPending: false,
        getPromissoryNotePaymentTermsError: action.data.error,
      };

    case LOAN_GET_PROMISSORY_NOTE_PAYMENT_TERMS_DISMISS_ERROR:
      // Dismiss the request failure error
      return {
        ...state,
        getPromissoryNotePaymentTermsError: null,
      };

    default:
      return state;
  }
}
