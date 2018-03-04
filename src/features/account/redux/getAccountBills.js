import Ajax from '@ecster/ecster-net/lib/Ajax';

import {
  ACCOUNT_GET_ACCOUNT_BILLS_BEGIN,
  ACCOUNT_GET_ACCOUNT_BILLS_SUCCESS,
  ACCOUNT_GET_ACCOUNT_BILLS_FAILURE,
  ACCOUNT_GET_ACCOUNT_BILLS_DISMISS_ERROR,
} from './constants';

import { GET_ACCOUNT_BILLS_URL } from './urls';

export function getAccountBills(customerId, referenceId) {
  return (dispatch) => { // optionally you can have getState as the second argument
    dispatch({
      type: ACCOUNT_GET_ACCOUNT_BILLS_BEGIN,
    });

    return new Promise((resolve, reject) => {
      Ajax.get({url: GET_ACCOUNT_BILLS_URL(customerId, referenceId)}).then(
        (res) => {
          dispatch({
            type: ACCOUNT_GET_ACCOUNT_BILLS_SUCCESS,
            data: res,
          });
          resolve(res);
        },
        (err) => {
          dispatch({
            type: ACCOUNT_GET_ACCOUNT_BILLS_FAILURE,
            data: { error: err },
          });
          reject(err);
        },
      );
    });
  };
}

export function dismissGetAccountBillsError() {
  return {
    type: ACCOUNT_GET_ACCOUNT_BILLS_DISMISS_ERROR,
  };
}

export function reducer(state, action) {
  switch (action.type) {
    case ACCOUNT_GET_ACCOUNT_BILLS_BEGIN:
      // Just after a request is sent
      return {
        ...state,
        getAccountBillsPending: true,
        getAccountBillsError: null,
      };

    case ACCOUNT_GET_ACCOUNT_BILLS_SUCCESS:
      // The request is success
      return {
        ...state,
        getAccountBillsPending: false,
        getAccountBillsError: null,
      };

    case ACCOUNT_GET_ACCOUNT_BILLS_FAILURE:
      // The request is failed
      return {
        ...state,
        getAccountBillsPending: false,
        getAccountBillsError: action.data.error,
      };

    case ACCOUNT_GET_ACCOUNT_BILLS_DISMISS_ERROR:
      // Dismiss the request failure error
      return {
        ...state,
        getAccountBillsError: null,
      };

    default:
      return state;
  }
}
