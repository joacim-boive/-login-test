import { Ajax } from '@ecster/ecster-net';

import {
  LOAN_GET_ACTIVE_PROMISSORY_NOTE_CAMPAIGNS_BEGIN,
  LOAN_GET_ACTIVE_PROMISSORY_NOTE_CAMPAIGNS_SUCCESS,
  LOAN_GET_ACTIVE_PROMISSORY_NOTE_CAMPAIGNS_FAILURE,
  LOAN_GET_ACTIVE_PROMISSORY_NOTE_CAMPAIGNS_DISMISS_ERROR,
} from './constants';

import { GET_ACTIVE_PROMISSORY_NOTE_CAMPAIGNS_URL } from './urls';

export function getActivePromissoryNoteCampaigns() {
  return (dispatch) => { // optionally you can have getState as the second argument
    dispatch({
      type: LOAN_GET_ACTIVE_PROMISSORY_NOTE_CAMPAIGNS_BEGIN,
    });

    return new Promise((resolve, reject) => {
      Ajax.get({url: GET_ACTIVE_PROMISSORY_NOTE_CAMPAIGNS_URL()}).then(
        (res) => {
          dispatch({
            type: LOAN_GET_ACTIVE_PROMISSORY_NOTE_CAMPAIGNS_SUCCESS,
            data: res,
          });
          resolve(res);
        },
        (err) => {
          dispatch({
            type: LOAN_GET_ACTIVE_PROMISSORY_NOTE_CAMPAIGNS_FAILURE,
            data: { error: err },
          });
          reject(err);
        },
      );
    });
  };
}

export function dismissGetActivePromissoryNoteCampaignsError() {
  return {
    type: LOAN_GET_ACTIVE_PROMISSORY_NOTE_CAMPAIGNS_DISMISS_ERROR,
  };
}

export function reducer(state, action) {
  switch (action.type) {
    case LOAN_GET_ACTIVE_PROMISSORY_NOTE_CAMPAIGNS_BEGIN:
      // Just after a request is sent
      return {
        ...state,
        getActivePromissoryNoteCampaignsPending: true,
        getActivePromissoryNoteCampaignsError: null,
      };

    case LOAN_GET_ACTIVE_PROMISSORY_NOTE_CAMPAIGNS_SUCCESS:
      // The request is success
      return {
        ...state,
        getActivePromissoryNoteCampaignsPending: false,
        getActivePromissoryNoteCampaignsError: null,
      };

    case LOAN_GET_ACTIVE_PROMISSORY_NOTE_CAMPAIGNS_FAILURE:
      // The request is failed
      return {
        ...state,
        getActivePromissoryNoteCampaignsPending: false,
        getActivePromissoryNoteCampaignsError: action.data.error,
      };

    case LOAN_GET_ACTIVE_PROMISSORY_NOTE_CAMPAIGNS_DISMISS_ERROR:
      // Dismiss the request failure error
      return {
        ...state,
        getActivePromissoryNoteCampaignsError: null,
      };

    default:
      return state;
  }
}
