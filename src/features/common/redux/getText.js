import { Ajax } from '@ecster/ecster-net';

import {
  COMMON_GET_TEXT_BEGIN,
  COMMON_GET_TEXT_SUCCESS,
  COMMON_GET_TEXT_FAILURE,
  COMMON_GET_TEXT_DISMISS_ERROR,
} from './constants';

import { GET_TEXT_URL } from './urls';

export function getText(country, lang, textId) {
  return (dispatch) => { // optionally you can have getState as the second argument
    dispatch({
      type: COMMON_GET_TEXT_BEGIN,
    });

    return new Promise((resolve, reject) => {
      Ajax.get({url: GET_TEXT_URL(country, lang, textId)}).then(
        (res) => {
          dispatch({
            type: COMMON_GET_TEXT_SUCCESS,
            data: res,
          });
          resolve(res);
        },
        // Use rejectHandler as the second argument so that render errors won't be caught.
        (err) => {
          dispatch({
            type: COMMON_GET_TEXT_FAILURE,
            data: { error: err },
          });
          reject(err);
        },
      );
    });
  };
}

// Async action saves request error by default, this method is used to dismiss the error info.
// If you don't want errors to be saved in Redux store, just ignore this method.
export function dismissGetTextError() {
  return {
    type: COMMON_GET_TEXT_DISMISS_ERROR,
  };
}

export function reducer(state, action) {
  switch (action.type) {
    case COMMON_GET_TEXT_BEGIN:
      // Just after a request is sent
      return {
        ...state,
        getTextPending: true,
        getTextError: null,
      };

    case COMMON_GET_TEXT_SUCCESS:
      // The request is success
      return {
        ...state,
        getTextPending: false,
        getTextError: null,
      };

    case COMMON_GET_TEXT_FAILURE:
      // The request is failed
      return {
        ...state,
        getTextPending: false,
        getTextError: action.data.error,
      };

    case COMMON_GET_TEXT_DISMISS_ERROR:
      // Dismiss the request failure error
      return {
        ...state,
        getTextError: null,
      };

    default:
      return state;
  }
}
