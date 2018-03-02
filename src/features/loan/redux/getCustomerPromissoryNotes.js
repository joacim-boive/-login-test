import { Ajax } from '@ecster/ecster-net';

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
      Ajax.get({url: GET_CUSTOMER_PROMISSORY_NOTES_URL(customerId)}).then(
        (res) => {
          dispatch({
            type: LOAN_GET_CUSTOMER_PROMISSORY_NOTES_SUCCESS,
            data: res,
          });
          resolve(res);
        },
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
      // Just after a request is sent
      return {
        ...state,
        getCustomerPromissoryNotesPending: true,
        getCustomerPromissoryNotesError: null,
      };

    case LOAN_GET_CUSTOMER_PROMISSORY_NOTES_SUCCESS:
      // The request is success
      return {
        ...state,
        getCustomerPromissoryNotesPending: false,
        getCustomerPromissoryNotesError: null,
      };

    case LOAN_GET_CUSTOMER_PROMISSORY_NOTES_FAILURE:
      // The request is failed
      return {
        ...state,
        getCustomerPromissoryNotesPending: false,
        getCustomerPromissoryNotesError: action.data.error,
      };

    case LOAN_GET_CUSTOMER_PROMISSORY_NOTES_DISMISS_ERROR:
      // Dismiss the request failure error
      return {
        ...state,
        getCustomerPromissoryNotesError: null,
      };

    default:
      return state;
  }
}
