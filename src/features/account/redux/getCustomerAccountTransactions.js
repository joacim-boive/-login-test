import Ajax from '@ecster/ecster-net/lib/Ajax';

import {
  ACCOUNT_GET_CUSTOMER_ACCOUNT_TRANSACTIONS_BEGIN,
  ACCOUNT_GET_CUSTOMER_ACCOUNT_TRANSACTIONS_SUCCESS,
  ACCOUNT_GET_CUSTOMER_ACCOUNT_TRANSACTIONS_FAILURE,
  ACCOUNT_GET_CUSTOMER_ACCOUNT_TRANSACTIONS_DISMISS_ERROR,
} from './constants';

import { GET_CUSTOMER_ACCOUNT_TRANSACTIONS_URL } from './urls';

export function getCustomerAccountTransactions(customerId, referenceId, offset, maxRecords) {
  return (dispatch) => { // optionally you can have getState as the second argument
    dispatch({
      type: ACCOUNT_GET_CUSTOMER_ACCOUNT_TRANSACTIONS_BEGIN,
    });

    return new Promise((resolve, reject) => {
      Ajax.get({url: GET_CUSTOMER_ACCOUNT_TRANSACTIONS_URL(customerId, referenceId, offset, maxRecords)}).then(
        (res) => {
          dispatch({
            type: ACCOUNT_GET_CUSTOMER_ACCOUNT_TRANSACTIONS_SUCCESS,
            data: res,
          });
          resolve(res);
        },
        (err) => {
          dispatch({
            type: ACCOUNT_GET_CUSTOMER_ACCOUNT_TRANSACTIONS_FAILURE,
            data: { error: err },
          });
          reject(err);
        },
      );
    });
  };
}

export function dismissGetCustomerAccountTransactionsError() {
  return {
    type: ACCOUNT_GET_CUSTOMER_ACCOUNT_TRANSACTIONS_DISMISS_ERROR,
  };
}

export function reducer(state, action) {
  switch (action.type) {
    case ACCOUNT_GET_CUSTOMER_ACCOUNT_TRANSACTIONS_BEGIN:
      // Just after a request is sent
      return {
        ...state,
        getCustomerAccountTransactionsPending: true,
        getCustomerAccountTransactionsError: null,
      };

    case ACCOUNT_GET_CUSTOMER_ACCOUNT_TRANSACTIONS_SUCCESS:
      // The request is success
      return {
        ...state,
        getCustomerAccountTransactionsPending: false,
        getCustomerAccountTransactionsError: null,
      };

    case ACCOUNT_GET_CUSTOMER_ACCOUNT_TRANSACTIONS_FAILURE:
      // The request is failed
      return {
        ...state,
        getCustomerAccountTransactionsPending: false,
        getCustomerAccountTransactionsError: action.data.error,
      };

    case ACCOUNT_GET_CUSTOMER_ACCOUNT_TRANSACTIONS_DISMISS_ERROR:
      // Dismiss the request failure error
      return {
        ...state,
        getCustomerAccountTransactionsError: null,
      };

    default:
      return state;
  }
}
