import { Ajax } from '@ecster/ecster-net';

import {
  ACCOUNT_UPDATE_CUSTOMER_ACCOUNT_TRANSACTION_PART_PAYMENT_BEGIN,
  ACCOUNT_UPDATE_CUSTOMER_ACCOUNT_TRANSACTION_PART_PAYMENT_SUCCESS,
  ACCOUNT_UPDATE_CUSTOMER_ACCOUNT_TRANSACTION_PART_PAYMENT_FAILURE,
  ACCOUNT_UPDATE_CUSTOMER_ACCOUNT_TRANSACTION_PART_PAYMENT_DISMISS_ERROR,
} from './constants';

import { UPDATE_CUSTOMER_ACCOUNT_TRANSACTION_PART_PAYMENT_URL } from './urls';

export function updateCustomerAccountTransactionPartPayment(customerId, referenceId, transactionId, data) {
  return (dispatch) => { // optionally you can have getState as the second argument
    dispatch({
      type: ACCOUNT_UPDATE_CUSTOMER_ACCOUNT_TRANSACTION_PART_PAYMENT_BEGIN,
    });

    const promise = new Promise((resolve, reject) => {
      Ajax.put({url: UPDATE_CUSTOMER_ACCOUNT_TRANSACTION_PART_PAYMENT_URL(customerId, referenceId, transactionId)}, data).then(
        (res) => {
          dispatch({
            type: ACCOUNT_UPDATE_CUSTOMER_ACCOUNT_TRANSACTION_PART_PAYMENT_SUCCESS,
            data: res,
          });
          resolve(res);
        },
        (err) => {
          dispatch({
            type: ACCOUNT_UPDATE_CUSTOMER_ACCOUNT_TRANSACTION_PART_PAYMENT_FAILURE,
            data: { error: err },
          });
          reject(err);
        },
      );
    });

    return promise;
  };
}

export function dismissUpdateCustomerAccountTransactionPartPaymentError() {
  return {
    type: ACCOUNT_UPDATE_CUSTOMER_ACCOUNT_TRANSACTION_PART_PAYMENT_DISMISS_ERROR,
  };
}

export function reducer(state, action) {
  switch (action.type) {
    case ACCOUNT_UPDATE_CUSTOMER_ACCOUNT_TRANSACTION_PART_PAYMENT_BEGIN:
      // Just after a request is sent
      return {
        ...state,
        updateCustomerAccountTransactionPartPaymentPending: true,
        updateCustomerAccountTransactionPartPaymentError: null,
      };

    case ACCOUNT_UPDATE_CUSTOMER_ACCOUNT_TRANSACTION_PART_PAYMENT_SUCCESS:
      // The request is success
      return {
        ...state,
        updateCustomerAccountTransactionPartPaymentPending: false,
        updateCustomerAccountTransactionPartPaymentError: null,
      };

    case ACCOUNT_UPDATE_CUSTOMER_ACCOUNT_TRANSACTION_PART_PAYMENT_FAILURE:
      // The request is failed
      return {
        ...state,
        updateCustomerAccountTransactionPartPaymentPending: false,
        updateCustomerAccountTransactionPartPaymentError: action.data.error,
      };

    case ACCOUNT_UPDATE_CUSTOMER_ACCOUNT_TRANSACTION_PART_PAYMENT_DISMISS_ERROR:
      // Dismiss the request failure error
      return {
        ...state,
        updateCustomerAccountTransactionPartPaymentError: null,
      };

    default:
      return state;
  }
}
