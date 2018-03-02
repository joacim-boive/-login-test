import { Ajax } from '@ecster/ecster-net';

import {
  AUTHENTICATION_GET_SESSION_BEGIN,
  AUTHENTICATION_GET_SESSION_SUCCESS,
  AUTHENTICATION_GET_SESSION_FAILURE,
  AUTHENTICATION_GET_SESSION_DISMISS_ERROR,
} from './constants';

import { GET_SESSION_URL } from '.,/urls';

export function getSession(sessionKey) {
  return (dispatch) => { // optionally you can have getState as the second argument
    dispatch({
      type: AUTHENTICATION_GET_SESSION_BEGIN,
    });

    const promise = new Promise((resolve, reject) => {
      Ajax.get({ url: GET_SESSION_URL(sessionKey) }).then(
        (res) => {
          dispatch({
            type: AUTHENTICATION_GET_SESSION_SUCCESS,
            data: res,
          });
          resolve(res);
        },
        (err) => {
          dispatch({
            type: AUTHENTICATION_GET_SESSION_FAILURE,
            data: { error: err },
          });
          reject(err);
        },
      );
    });

    return promise;
  };
}

export function dismissGetSessionError() {
  return {
    type: AUTHENTICATION_GET_SESSION_DISMISS_ERROR,
  };
}

export function reducer(state, action) {
  switch (action.type) {
    case AUTHENTICATION_GET_SESSION_BEGIN:
      // Just after a request is sent
      return {
        ...state,
        getSessionPending: true,
        getSessionError: null,
      };

    case AUTHENTICATION_GET_SESSION_SUCCESS:
      // The request is success
      return {
        ...state,
        getSessionPending: false,
        getSessionError: null,
      };

    case AUTHENTICATION_GET_SESSION_FAILURE:
      // The request is failed
      return {
        ...state,
        getSessionPending: false,
        getSessionError: action.data.error,
      };

    case AUTHENTICATION_GET_SESSION_DISMISS_ERROR:
      // Dismiss the request failure error
      return {
        ...state,
        getSessionError: null,
      };

    default:
      return state;
  }
}
