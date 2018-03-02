import { Ajax } from '@ecster/ecster-net';

import {
  ACCOUNT_UPDATE_CUSTOMER_EXTRA_CARD_HOLDER_CONTACT_INFO_BEGIN,
  ACCOUNT_UPDATE_CUSTOMER_EXTRA_CARD_HOLDER_CONTACT_INFO_SUCCESS,
  ACCOUNT_UPDATE_CUSTOMER_EXTRA_CARD_HOLDER_CONTACT_INFO_FAILURE,
  ACCOUNT_UPDATE_CUSTOMER_EXTRA_CARD_HOLDER_CONTACT_INFO_DISMISS_ERROR,
} from './constants';

import { UPDATE_CUSTOMER_EXTRA_CARD_HOLDER_CONTACT_INFO_URL } from './urls';

export function updateCustomerExtraCardHolderContactInfo(customerId, data) {
  return (dispatch) => { // optionally you can have getState as the second argument
    dispatch({
      type: ACCOUNT_UPDATE_CUSTOMER_EXTRA_CARD_HOLDER_CONTACT_INFO_BEGIN,
    });

    return new Promise((resolve, reject) => {
      Ajax.put({url: UPDATE_CUSTOMER_EXTRA_CARD_HOLDER_CONTACT_INFO_URL(customerId)}, data).then(
        (res) => {
          dispatch({
            type: ACCOUNT_UPDATE_CUSTOMER_EXTRA_CARD_HOLDER_CONTACT_INFO_SUCCESS,
            data: res,
          });
          resolve(res);
        },
        (err) => {
          dispatch({
            type: ACCOUNT_UPDATE_CUSTOMER_EXTRA_CARD_HOLDER_CONTACT_INFO_FAILURE,
            data: { error: err },
          });
          reject(err);
        },
      );
    });
  };
}

export function dismissUpdateCustomerExtraCardHolderContactInfoError() {
  return {
    type: ACCOUNT_UPDATE_CUSTOMER_EXTRA_CARD_HOLDER_CONTACT_INFO_DISMISS_ERROR,
  };
}

export function reducer(state, action) {
  switch (action.type) {
    case ACCOUNT_UPDATE_CUSTOMER_EXTRA_CARD_HOLDER_CONTACT_INFO_BEGIN:
      // Just after a request is sent
      return {
        ...state,
        updateCustomerExtraCardHolderContactInfoPending: true,
        updateCustomerExtraCardHolderContactInfoError: null,
      };

    case ACCOUNT_UPDATE_CUSTOMER_EXTRA_CARD_HOLDER_CONTACT_INFO_SUCCESS:
      // The request is success
      return {
        ...state,
        updateCustomerExtraCardHolderContactInfoPending: false,
        updateCustomerExtraCardHolderContactInfoError: null,
      };

    case ACCOUNT_UPDATE_CUSTOMER_EXTRA_CARD_HOLDER_CONTACT_INFO_FAILURE:
      // The request is failed
      return {
        ...state,
        updateCustomerExtraCardHolderContactInfoPending: false,
        updateCustomerExtraCardHolderContactInfoError: action.data.error,
      };

    case ACCOUNT_UPDATE_CUSTOMER_EXTRA_CARD_HOLDER_CONTACT_INFO_DISMISS_ERROR:
      // Dismiss the request failure error
      return {
        ...state,
        updateCustomerExtraCardHolderContactInfoError: null,
      };

    default:
      return state;
  }
}
