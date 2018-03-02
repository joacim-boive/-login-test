import { Ajax } from '@ecster/ecster-net';

import {
  CUSTOMER_GET_CUSTOMER_BEGIN,
  CUSTOMER_GET_CUSTOMER_SUCCESS,
  CUSTOMER_GET_CUSTOMER_FAILURE,
  CUSTOMER_GET_CUSTOMER_DISMISS_ERROR,
} from './constants';

import { GET_CUSTOMER_URL } from './urls';

export function getCustomer(customerId) {
  return (dispatch) => { // optionally you can have getState as the second argument
    dispatch({
      type: CUSTOMER_GET_CUSTOMER_BEGIN,
    });

    return new Promise((resolve, reject) => {
      Ajax.get({ url: GET_CUSTOMER_URL(customerId) }).then(
        (res) => {
          dispatch({
            type: CUSTOMER_GET_CUSTOMER_SUCCESS,
            data: res,
          });
          resolve(res);
        },
        (err) => {
          dispatch({
            type: CUSTOMER_GET_CUSTOMER_FAILURE,
            data: { error: err },
          });
          reject(err);
        },
      );
    });
  };
}

export function dismissGetCustomerError() {
  return {
    type: CUSTOMER_GET_CUSTOMER_DISMISS_ERROR,
  };
}

export function reducer(state, action) {
  switch (action.type) {
    case CUSTOMER_GET_CUSTOMER_BEGIN:
      // Just after a request is sent
      return {
        ...state,
        getCustomerPending: true,
        getCustomerError: null,
      };

    case CUSTOMER_GET_CUSTOMER_SUCCESS:
      // The request is success
      return {
        ...state,
        getCustomerPending: false,
        getCustomerError: null,
      };

    case CUSTOMER_GET_CUSTOMER_FAILURE:
      // The request is failed
      return {
        ...state,
        getCustomerPending: false,
        getCustomerError: action.data.error,
      };

    case CUSTOMER_GET_CUSTOMER_DISMISS_ERROR:
      // Dismiss the request failure error
      return {
        ...state,
        getCustomerError: null,
      };

    default:
      return state;
  }
}
