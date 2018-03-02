import { Ajax } from '@ecster/ecster-net';

import {
  ACCOUNT_UPDATE_CUSTOMER_ACCOUNT_CARD_BEGIN,
  ACCOUNT_UPDATE_CUSTOMER_ACCOUNT_CARD_SUCCESS,
  ACCOUNT_UPDATE_CUSTOMER_ACCOUNT_CARD_FAILURE,
  ACCOUNT_UPDATE_CUSTOMER_ACCOUNT_CARD_DISMISS_ERROR,
} from './constants';

import { UPDATE_CUSTOMER_ACCOUNT_CARD_URL } from './urls';

export function updateCustomerAccountCard(customerId, referenceId, data) {
  return (dispatch) => { // optionally you can have getState as the second argument
    dispatch({
      type: ACCOUNT_UPDATE_CUSTOMER_ACCOUNT_CARD_BEGIN,
    });

    const promise = new Promise((resolve, reject) => {
      Ajax.put({url: UPDATE_CUSTOMER_ACCOUNT_CARD_URL(customerId, referenceId)}, data).then(
        (res) => {
          dispatch({
            type: ACCOUNT_UPDATE_CUSTOMER_ACCOUNT_CARD_SUCCESS,
            data: res,
          });
          resolve(res);
        },
        (err) => {
          dispatch({
            type: ACCOUNT_UPDATE_CUSTOMER_ACCOUNT_CARD_FAILURE,
            data: { error: err },
          });
          reject(err);
        },
      );
    });

    return promise;
  };
}

export function dismissUpdateCustomerAccountCardError() {
  return {
    type: ACCOUNT_UPDATE_CUSTOMER_ACCOUNT_CARD_DISMISS_ERROR,
  };
}

export function reducer(state, action) {
  switch (action.type) {
    case ACCOUNT_UPDATE_CUSTOMER_ACCOUNT_CARD_BEGIN:
      // Just after a request is sent
      return {
        ...state,
        updateCustomerAccountCardPending: true,
        updateCustomerAccountCardError: null,
      };

    case ACCOUNT_UPDATE_CUSTOMER_ACCOUNT_CARD_SUCCESS:
      // The request is success
      return {
        ...state,
        updateCustomerAccountCardPending: false,
        updateCustomerAccountCardError: null,
      };

    case ACCOUNT_UPDATE_CUSTOMER_ACCOUNT_CARD_FAILURE:
      // The request is failed
      return {
        ...state,
        updateCustomerAccountCardPending: false,
        updateCustomerAccountCardError: action.data.error,
      };

    case ACCOUNT_UPDATE_CUSTOMER_ACCOUNT_CARD_DISMISS_ERROR:
      // Dismiss the request failure error
      return {
        ...state,
        updateCustomerAccountCardError: null,
      };

    default:
      return state;
  }
}
