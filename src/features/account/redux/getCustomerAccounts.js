import { Ajax } from '@ecster/ecster-net';

import {
  ACCOUNT_GET_CUSTOMER_ACCOUNTS_BEGIN,
  ACCOUNT_GET_CUSTOMER_ACCOUNTS_SUCCESS,
  ACCOUNT_GET_CUSTOMER_ACCOUNTS_FAILURE,
  ACCOUNT_GET_CUSTOMER_ACCOUNTS_DISMISS_ERROR,
} from './constants';

import { GET_CUSTOMER_ACCOUNTS_URL } from './urls';

export function getCustomerAccounts(customerId) {
  return (dispatch) => { // optionally you can have getState as the second argument
    dispatch({
      type: ACCOUNT_GET_CUSTOMER_ACCOUNTS_BEGIN,
    });

    const promise = new Promise((resolve, reject) => {
      Ajax.get({url: GET_CUSTOMER_ACCOUNTS_URL(customerId)}).then(
        (res) => {
          dispatch({
            type: ACCOUNT_GET_CUSTOMER_ACCOUNTS_SUCCESS,
            data: res,
          });
          resolve(res);
        },
        (err) => {
          dispatch({
            type: ACCOUNT_GET_CUSTOMER_ACCOUNTS_FAILURE,
            data: { error: err },
          });
          reject(err);
        },
      );
    });

    return promise;
  };
}

export function dismissGetCustomerAccountsError() {
  return {
    type: ACCOUNT_GET_CUSTOMER_ACCOUNTS_DISMISS_ERROR,
  };
}

export function reducer(state, action) {
  switch (action.type) {
    case ACCOUNT_GET_CUSTOMER_ACCOUNTS_BEGIN:
      // Just after a request is sent
      return {
        ...state,
        getCustomerAccountsPending: true,
        getCustomerAccountsError: null,
      };

    case ACCOUNT_GET_CUSTOMER_ACCOUNTS_SUCCESS:
      // The request is success
      return {
        ...state,
        getCustomerAccountsPending: false,
        getCustomerAccountsError: null,
      };

    case ACCOUNT_GET_CUSTOMER_ACCOUNTS_FAILURE:
      // The request is failed
      return {
        ...state,
        getCustomerAccountsPending: false,
        getCustomerAccountsError: action.data.error,
      };

    case ACCOUNT_GET_CUSTOMER_ACCOUNTS_DISMISS_ERROR:
      // Dismiss the request failure error
      return {
        ...state,
        getCustomerAccountsError: null,
      };

    default:
      return state;
  }
}
