import { Ajax } from '@ecster/ecster-net';

import {
  ACCOUNT_GET_CUSTOMER_ACCOUNT_CAMPAIGN_PURCHASES_BEGIN,
  ACCOUNT_GET_CUSTOMER_ACCOUNT_CAMPAIGN_PURCHASES_SUCCESS,
  ACCOUNT_GET_CUSTOMER_ACCOUNT_CAMPAIGN_PURCHASES_FAILURE,
  ACCOUNT_GET_CUSTOMER_ACCOUNT_CAMPAIGN_PURCHASES_DISMISS_ERROR,
} from './constants';

import { GET_CUSTOMER_ACCOUNT_CAMPAIGN_PURCHASES_URL } from './urls';

export function getCustomerAccountCampaignPurchases(customerId, referenceId) {
  return (dispatch) => { // optionally you can have getState as the second argument
    dispatch({
      type: ACCOUNT_GET_CUSTOMER_ACCOUNT_CAMPAIGN_PURCHASES_BEGIN,
    });

    return new Promise((resolve, reject) => {
      Ajax.get({url: GET_CUSTOMER_ACCOUNT_CAMPAIGN_PURCHASES_URL(customerId, referenceId)}).then(
        (res) => {
          dispatch({
            type: ACCOUNT_GET_CUSTOMER_ACCOUNT_CAMPAIGN_PURCHASES_SUCCESS,
            data: res,
          });
          resolve(res);
        },
        (err) => {
          dispatch({
            type: ACCOUNT_GET_CUSTOMER_ACCOUNT_CAMPAIGN_PURCHASES_FAILURE,
            data: { error: err },
          });
          reject(err);
        },
      );
    });
  };
}

export function dismissGetCustomerAccountCampaignPurchasesError() {
  return {
    type: ACCOUNT_GET_CUSTOMER_ACCOUNT_CAMPAIGN_PURCHASES_DISMISS_ERROR,
  };
}

export function reducer(state, action) {
  switch (action.type) {
    case ACCOUNT_GET_CUSTOMER_ACCOUNT_CAMPAIGN_PURCHASES_BEGIN:
      // Just after a request is sent
      return {
        ...state,
        getCustomerAccountCampaignPurchasesPending: true,
        getCustomerAccountCampaignPurchasesError: null,
      };

    case ACCOUNT_GET_CUSTOMER_ACCOUNT_CAMPAIGN_PURCHASES_SUCCESS:
      // The request is success
      return {
        ...state,
        getCustomerAccountCampaignPurchasesPending: false,
        getCustomerAccountCampaignPurchasesError: null,
      };

    case ACCOUNT_GET_CUSTOMER_ACCOUNT_CAMPAIGN_PURCHASES_FAILURE:
      // The request is failed
      return {
        ...state,
        getCustomerAccountCampaignPurchasesPending: false,
        getCustomerAccountCampaignPurchasesError: action.data.error,
      };

    case ACCOUNT_GET_CUSTOMER_ACCOUNT_CAMPAIGN_PURCHASES_DISMISS_ERROR:
      // Dismiss the request failure error
      return {
        ...state,
        getCustomerAccountCampaignPurchasesError: null,
      };

    default:
      return state;
  }
}
