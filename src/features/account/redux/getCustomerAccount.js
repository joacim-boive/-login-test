import { Ajax } from '@ecster/ecster-net';

import {
  ACCOUNT_GET_CUSTOMER_ACCOUNT_BEGIN,
  ACCOUNT_GET_CUSTOMER_ACCOUNT_SUCCESS,
  ACCOUNT_GET_CUSTOMER_ACCOUNT_FAILURE,
  ACCOUNT_GET_CUSTOMER_ACCOUNT_DISMISS_ERROR,
} from './constants';

import { GET_CUSTOMER_ACCOUNT_URL } from './urls';

export function getCustomerAccount(customerId, refcode) {
  return (dispatch) => { // optionally you can have getState as the second argument
    dispatch({
      type: ACCOUNT_GET_CUSTOMER_ACCOUNT_BEGIN,
    });

    return new Promise((resolve, reject) => {
      Ajax.get({ url: GET_CUSTOMER_ACCOUNT_URL(customerId, refcode) }).then(
        (res) => {
          dispatch({
            type: ACCOUNT_GET_CUSTOMER_ACCOUNT_SUCCESS,
            data: res,
          });
          resolve(res);
        },
        (err) => {
          dispatch({
            type: ACCOUNT_GET_CUSTOMER_ACCOUNT_FAILURE,
            data: { error: err },
          });
          reject(err);
        },
      );
    });
  };
}

export function dismissGetCustomerAccountError() {
  return {
    type: ACCOUNT_GET_CUSTOMER_ACCOUNT_DISMISS_ERROR,
  };
}

export function reducer(state, action) {
  switch (action.type) {
    case ACCOUNT_GET_CUSTOMER_ACCOUNT_BEGIN:
      // Just after a request is sent
      return {
        ...state,
        getCustomerAccountPending: true,
        getCustomerAccountError: null,
      };

    case ACCOUNT_GET_CUSTOMER_ACCOUNT_SUCCESS:
      // The request is success
      return {
        ...state,
        getCustomerAccountPending: false,
        getCustomerAccountError: null,
      };

    case ACCOUNT_GET_CUSTOMER_ACCOUNT_FAILURE:
      // The request is failed
      return {
        ...state,
        getCustomerAccountPending: false,
        getCustomerAccountError: action.data.error,
      };

    case ACCOUNT_GET_CUSTOMER_ACCOUNT_DISMISS_ERROR:
      // Dismiss the request failure error
      return {
        ...state,
        getCustomerAccountError: null,
      };

    default:
      return state;
  }
}
