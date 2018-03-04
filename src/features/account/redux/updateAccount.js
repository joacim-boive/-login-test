import Ajax from '@ecster/ecster-net/lib/Ajax';

import {
  ACCOUNT_UPDATE_ACCOUNT_BEGIN,
  ACCOUNT_UPDATE_ACCOUNT_SUCCESS,
  ACCOUNT_UPDATE_ACCOUNT_FAILURE,
  ACCOUNT_UPDATE_ACCOUNT_DISMISS_ERROR,
} from './constants';

import { UPDATE_CUSTOMER_ACCOUNT_URL } from './urls';

export function updateAccount(customerId, referenceId, data) {
  return (dispatch) => { // optionally you can have getState as the second argument
    dispatch({
      type: ACCOUNT_UPDATE_ACCOUNT_BEGIN,
    });

    return new Promise((resolve, reject) => {
      Ajax.put({ url: UPDATE_CUSTOMER_ACCOUNT_URL(customerId, referenceId) }, data).then(
        (res) => {
          dispatch({
            type: ACCOUNT_UPDATE_ACCOUNT_SUCCESS,
            data: res,
          });
          resolve(res);
        },
        (err) => {
          dispatch({
            type: ACCOUNT_UPDATE_ACCOUNT_FAILURE,
            data: { error: err },
          });
          reject(err);
        },
      );
    });
  };
}

export function dismissUpdateCustomerAccountError() {
  return {
    type: ACCOUNT_UPDATE_ACCOUNT_DISMISS_ERROR,
  };
}

export function reducer(state, action) {
  switch (action.type) {
    case ACCOUNT_UPDATE_ACCOUNT_BEGIN:
      // Just after a request is sent
      return {
        ...state,
        updateCustomerAccountPending: true,
        updateCustomerAccountError: null,
      };

    case ACCOUNT_UPDATE_ACCOUNT_SUCCESS:
      // The request is success
      return {
        ...state,
        updateCustomerAccountPending: false,
        updateCustomerAccountError: null,
      };

    case ACCOUNT_UPDATE_ACCOUNT_FAILURE:
      // The request is failed
      return {
        ...state,
        updateCustomerAccountPending: false,
        updateCustomerAccountError: action.data.error,
      };

    case ACCOUNT_UPDATE_ACCOUNT_DISMISS_ERROR:
      // Dismiss the request failure error
      return {
        ...state,
        updateCustomerAccountError: null,
      };

    default:
      return state;
  }
}
