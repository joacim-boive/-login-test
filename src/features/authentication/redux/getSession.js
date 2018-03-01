// Rekit uses a new approach to organizing actions and reducers. That is
// putting related actions and reducers in one file. See more at:
// https://medium.com/@nate_wang/a-new-approach-for-managing-redux-actions-91c26ce8b5da

import { AUTHENTICATION_GET_SESSION } from './constants';

export function getSession() {
  return {
    type: AUTHENTICATION_GET_SESSION,
  };
}

export function reducer(state, action) {
  switch (action.type) {
    case AUTHENTICATION_GET_SESSION:
      return {
        ...state,
      };

    default:
      return state;
  }
}
