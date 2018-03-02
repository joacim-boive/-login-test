import Ajax from '@ecster/ecster-net/lib/Ajax';

import {
  LOAN_GET_PROMISSORY_NOTE_DEFAULT_PARAMETERS_BEGIN,
  LOAN_GET_PROMISSORY_NOTE_DEFAULT_PARAMETERS_SUCCESS,
  LOAN_GET_PROMISSORY_NOTE_DEFAULT_PARAMETERS_FAILURE,
  LOAN_GET_PROMISSORY_NOTE_DEFAULT_PARAMETERS_DISMISS_ERROR,
} from './constants';

import { GET_PROMISSORY_NOTE_DEFAULT_PARAMETERS_URL } from './urls';

export function getPromissoryNoteDefaultParameters() {
  return (dispatch) => { // optionally you can have getState as the second argument
    dispatch({
      type: LOAN_GET_PROMISSORY_NOTE_DEFAULT_PARAMETERS_BEGIN,
    });

    return new Promise((resolve, reject) => {
      Ajax.get({url: GET_PROMISSORY_NOTE_DEFAULT_PARAMETERS_URL()}).then(
        (res) => {
          dispatch({
            type: LOAN_GET_PROMISSORY_NOTE_DEFAULT_PARAMETERS_SUCCESS,
            data: res,
          });
          resolve(res);
        },
        (err) => {
          dispatch({
            type: LOAN_GET_PROMISSORY_NOTE_DEFAULT_PARAMETERS_FAILURE,
            data: { error: err },
          });
          reject(err);
        },
      );
    });
  };
}

export function dismissGetPromissoryNoteDefaultParametersError() {
  return {
    type: LOAN_GET_PROMISSORY_NOTE_DEFAULT_PARAMETERS_DISMISS_ERROR,
  };
}

export function reducer(state, action) {
  switch (action.type) {
    case LOAN_GET_PROMISSORY_NOTE_DEFAULT_PARAMETERS_BEGIN:
      // Just after a request is sent
      return {
        ...state,
        getPromissoryNoteDefaultParametersPending: true,
        getPromissoryNoteDefaultParametersError: null,
      };

    case LOAN_GET_PROMISSORY_NOTE_DEFAULT_PARAMETERS_SUCCESS:
      // The request is success
      return {
        ...state,
        getPromissoryNoteDefaultParametersPending: false,
        getPromissoryNoteDefaultParametersError: null,
      };

    case LOAN_GET_PROMISSORY_NOTE_DEFAULT_PARAMETERS_FAILURE:
      // The request is failed
      return {
        ...state,
        getPromissoryNoteDefaultParametersPending: false,
        getPromissoryNoteDefaultParametersError: action.data.error,
      };

    case LOAN_GET_PROMISSORY_NOTE_DEFAULT_PARAMETERS_DISMISS_ERROR:
      // Dismiss the request failure error
      return {
        ...state,
        getPromissoryNoteDefaultParametersError: null,
      };

    default:
      return state;
  }
}
