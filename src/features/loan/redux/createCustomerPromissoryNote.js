import { Ajax } from '@ecster/ecster-net';

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

    const promise = new Promise((resolve, reject) => {
      Ajax.post({url: CREATE_CUSTOMER_PROMISSORY_NOTE_URL(customerId)}, data).then(
        (res) => {
          dispatch({
            type: LOAN_CREATE_CUSTOMER_PROMISSORY_NOTE_SUCCESS,
            data: res,
          });
          resolve(res);
        },
        (err) => {
          dispatch({
            type: LOAN_CREATE_CUSTOMER_PROMISSORY_NOTE_FAILURE,
            data: { error: err },
          });
          reject(err);
        },
      );
    });

    return promise;
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
      // Just after a request is sent
      return {
        ...state,
        createCustomerPromissoryNotePending: true,
        createCustomerPromissoryNoteError: null,
      };

    case LOAN_CREATE_CUSTOMER_PROMISSORY_NOTE_SUCCESS:
      // The request is success
      return {
        ...state,
        createCustomerPromissoryNotePending: false,
        createCustomerPromissoryNoteError: null,
      };

    case LOAN_CREATE_CUSTOMER_PROMISSORY_NOTE_FAILURE:
      // The request is failed
      return {
        ...state,
        createCustomerPromissoryNotePending: false,
        createCustomerPromissoryNoteError: action.data.error,
      };

    case LOAN_CREATE_CUSTOMER_PROMISSORY_NOTE_DISMISS_ERROR:
      // Dismiss the request failure error
      return {
        ...state,
        createCustomerPromissoryNoteError: null,
      };

    default:
      return state;
  }
}
