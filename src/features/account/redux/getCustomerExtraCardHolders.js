import { Ajax } from '@ecster/ecster-net';

import {
  ACCOUNT_GET_CUSTOMER_EXTRA_CARD_HOLDERS_BEGIN,
  ACCOUNT_GET_CUSTOMER_EXTRA_CARD_HOLDERS_SUCCESS,
  ACCOUNT_GET_CUSTOMER_EXTRA_CARD_HOLDERS_FAILURE,
  ACCOUNT_GET_CUSTOMER_EXTRA_CARD_HOLDERS_DISMISS_ERROR,
} from './constants';

import { GET_CUSTOMER_EXTRA_CARD_HOLDERS_URL } from './urls';

export function getCustomerExtraCardHolders(customerId) {
  return (dispatch) => { // optionally you can have getState as the second argument
    dispatch({
      type: ACCOUNT_GET_CUSTOMER_EXTRA_CARD_HOLDERS_BEGIN,
    });

    const promise = new Promise((resolve, reject) => {
      Ajax.get({url: GET_CUSTOMER_EXTRA_CARD_HOLDERS_URL(customerId)}).then(
        (res) => {
          dispatch({
            type: ACCOUNT_GET_CUSTOMER_EXTRA_CARD_HOLDERS_SUCCESS,
            data: res,
          });
          resolve(res);
        },
        (err) => {
          dispatch({
            type: ACCOUNT_GET_CUSTOMER_EXTRA_CARD_HOLDERS_FAILURE,
            data: { error: err },
          });
          reject(err);
        },
      );
    });

    return promise;
  };
}

export function dismissGetCustomerExtraCardHoldersError() {
  return {
    type: ACCOUNT_GET_CUSTOMER_EXTRA_CARD_HOLDERS_DISMISS_ERROR,
  };
}

export function reducer(state, action) {
  switch (action.type) {
    case ACCOUNT_GET_CUSTOMER_EXTRA_CARD_HOLDERS_BEGIN:
      // Just after a request is sent
      return {
        ...state,
        getCustomerExtraCardHoldersPending: true,
        getCustomerExtraCardHoldersError: null,
      };

    case ACCOUNT_GET_CUSTOMER_EXTRA_CARD_HOLDERS_SUCCESS:
      // The request is success
      return {
        ...state,
        getCustomerExtraCardHoldersPending: false,
        getCustomerExtraCardHoldersError: null,
      };

    case ACCOUNT_GET_CUSTOMER_EXTRA_CARD_HOLDERS_FAILURE:
      // The request is failed
      return {
        ...state,
        getCustomerExtraCardHoldersPending: false,
        getCustomerExtraCardHoldersError: action.data.error,
      };

    case ACCOUNT_GET_CUSTOMER_EXTRA_CARD_HOLDERS_DISMISS_ERROR:
      // Dismiss the request failure error
      return {
        ...state,
        getCustomerExtraCardHoldersError: null,
      };

    default:
      return state;
  }
}
