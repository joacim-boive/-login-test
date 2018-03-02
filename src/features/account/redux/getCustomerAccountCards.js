import Ajax from '@ecster/ecster-net/lib/Ajax';

import {
  ACCOUNT_GET_CUSTOMER_ACCOUNT_CARDS_BEGIN,
  ACCOUNT_GET_CUSTOMER_ACCOUNT_CARDS_SUCCESS,
  ACCOUNT_GET_CUSTOMER_ACCOUNT_CARDS_FAILURE,
  ACCOUNT_GET_CUSTOMER_ACCOUNT_CARDS_DISMISS_ERROR,
} from './constants';

import { GET_CUSTOMER_ACCOUNT_CARDS_URL } from './urls';

export function getCustomerAccountCards(customerId, referenceId) {
  return (dispatch) => { // optionally you can have getState as the second argument
    dispatch({
      type: ACCOUNT_GET_CUSTOMER_ACCOUNT_CARDS_BEGIN,
    });

    return new Promise((resolve, reject) => {
      Ajax.get({url: GET_CUSTOMER_ACCOUNT_CARDS_URL(customerId, referenceId)}).then(
        (res) => {
          dispatch({
            type: ACCOUNT_GET_CUSTOMER_ACCOUNT_CARDS_SUCCESS,
            data: res,
          });
          resolve(res);
        },
        (err) => {
          dispatch({
            type: ACCOUNT_GET_CUSTOMER_ACCOUNT_CARDS_FAILURE,
            data: { error: err },
          });
          reject(err);
        },
      );
    });
  };
}

export function dismissGetCustomerAccountCardsError() {
  return {
    type: ACCOUNT_GET_CUSTOMER_ACCOUNT_CARDS_DISMISS_ERROR,
  };
}

export function reducer(state, action) {
  switch (action.type) {
    case ACCOUNT_GET_CUSTOMER_ACCOUNT_CARDS_BEGIN:
      // Just after a request is sent
      return {
        ...state,
        getCustomerAccountCardsPending: true,
        getCustomerAccountCardsError: null,
      };

    case ACCOUNT_GET_CUSTOMER_ACCOUNT_CARDS_SUCCESS:
      // The request is success
      return {
        ...state,
        getCustomerAccountCardsPending: false,
        getCustomerAccountCardsError: null,
      };

    case ACCOUNT_GET_CUSTOMER_ACCOUNT_CARDS_FAILURE:
      // The request is failed
      return {
        ...state,
        getCustomerAccountCardsPending: false,
        getCustomerAccountCardsError: action.data.error,
      };

    case ACCOUNT_GET_CUSTOMER_ACCOUNT_CARDS_DISMISS_ERROR:
      // Dismiss the request failure error
      return {
        ...state,
        getCustomerAccountCardsError: null,
      };

    default:
      return state;
  }
}
