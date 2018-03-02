import { Ajax } from '@ecster/ecster-net';

import {
  AUTHENTICATION_DELETE_SESSION_BEGIN,
  AUTHENTICATION_DELETE_SESSION_SUCCESS,
  AUTHENTICATION_DELETE_SESSION_FAILURE,
  AUTHENTICATION_DELETE_SESSION_DISMISS_ERROR,
} from './constants';

import { DELETE_SESSION_URL } from './urls';

export function deleteSession(sessionKey) {
  return (dispatch) => { // optionally you can have getState as the second argument
    dispatch({
      type: AUTHENTICATION_DELETE_SESSION_BEGIN,
    });

    const promise = new Promise((resolve, reject) => {
      Ajax.delete({url: DELETE_SESSION_URL(sessionKey)}).then(
        (res) => {
          dispatch({
            type: AUTHENTICATION_DELETE_SESSION_SUCCESS,
            data: res,
          });
          resolve(res);
        },
        (err) => {
          dispatch({
            type: AUTHENTICATION_DELETE_SESSION_FAILURE,
            data: { error: err },
          });
          reject(err);
        },
      );
    });

    return promise;
  };
}

export function dismissDeleteSessionError() {
  return {
    type: AUTHENTICATION_DELETE_SESSION_DISMISS_ERROR,
  };
}

export function reducer(state, action) {
  switch (action.type) {
    case AUTHENTICATION_DELETE_SESSION_BEGIN:
      // Just after a request is sent
      return {
        ...state,
        deleteSessionPending: true,
        deleteSessionError: null,
      };

    case AUTHENTICATION_DELETE_SESSION_SUCCESS:
      // The request is success
      return {
        ...state,
        deleteSessionPending: false,
        deleteSessionError: null,
      };

    case AUTHENTICATION_DELETE_SESSION_FAILURE:
      // The request is failed
      return {
        ...state,
        deleteSessionPending: false,
        deleteSessionError: action.data.error,
      };

    case AUTHENTICATION_DELETE_SESSION_DISMISS_ERROR:
      // Dismiss the request failure error
      return {
        ...state,
        deleteSessionError: null,
      };

    default:
      return state;
  }
}
