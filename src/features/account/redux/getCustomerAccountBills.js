import { Ajax } from '@ecster/ecster-net';

import {
  ACCOUNT_GET_CUSTOMER_ACCOUNT_BILLS_BEGIN,
  ACCOUNT_GET_CUSTOMER_ACCOUNT_BILLS_SUCCESS,
  ACCOUNT_GET_CUSTOMER_ACCOUNT_BILLS_FAILURE,
  ACCOUNT_GET_CUSTOMER_ACCOUNT_BILLS_DISMISS_ERROR,
} from './constants';

import { GET_CUSTOMER_ACCOUNT_BILLS_URL } from './urls';

export function getCustomerAccountBills(customerId, referenceId) {
  return (dispatch) => { // optionally you can have getState as the second argument
    dispatch({
      type: ACCOUNT_GET_CUSTOMER_ACCOUNT_BILLS_BEGIN,
    });

    const promise = new Promise((resolve, reject) => {
      Ajax.get({url: GET_CUSTOMER_ACCOUNT_BILLS_URL(customerId, referenceId)}).then(
        (res) => {
          dispatch({
            type: ACCOUNT_GET_CUSTOMER_ACCOUNT_BILLS_SUCCESS,
            data: res,
          });
          resolve(res);
        },
        (err) => {
          dispatch({
            type: ACCOUNT_GET_CUSTOMER_ACCOUNT_BILLS_FAILURE,
            data: { error: err },
          });
          reject(err);
        },
      );
    });

    return promise;
  };
}

export function dismissGetCustomerAccountBillsError() {
  return {
    type: ACCOUNT_GET_CUSTOMER_ACCOUNT_BILLS_DISMISS_ERROR,
  };
}

export function reducer(state, action) {
  switch (action.type) {
    case ACCOUNT_GET_CUSTOMER_ACCOUNT_BILLS_BEGIN:
      // Just after a request is sent
      return {
        ...state,
        getCustomerAccountBillsPending: true,
        getCustomerAccountBillsError: null,
      };

    case ACCOUNT_GET_CUSTOMER_ACCOUNT_BILLS_SUCCESS:
      // The request is success
      return {
        ...state,
        getCustomerAccountBillsPending: false,
        getCustomerAccountBillsError: null,
      };

    case ACCOUNT_GET_CUSTOMER_ACCOUNT_BILLS_FAILURE:
      // The request is failed
      return {
        ...state,
        getCustomerAccountBillsPending: false,
        getCustomerAccountBillsError: action.data.error,
      };

    case ACCOUNT_GET_CUSTOMER_ACCOUNT_BILLS_DISMISS_ERROR:
      // Dismiss the request failure error
      return {
        ...state,
        getCustomerAccountBillsError: null,
      };

    default:
      return state;
  }
}
