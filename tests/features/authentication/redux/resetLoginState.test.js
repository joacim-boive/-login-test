import { expect } from 'chai';

import {
  AUTHENTICATION_RESET_LOGIN_STATE,
} from 'src/features/authentication/redux/constants';

import {
  resetLoginState,
  reducer,
} from 'src/features/authentication/redux/resetLoginState';

describe('authentication/redux/resetLoginState', () => {
  it('returns correct action by resetLoginState', () => {
    expect(resetLoginState()).to.have.property('type', AUTHENTICATION_RESET_LOGIN_STATE);
  });

  it('handles action type AUTHENTICATION_RESET_LOGIN_STATE correctly', () => {
    const prevState = {};
    const state = reducer(
      prevState,
      { type: AUTHENTICATION_RESET_LOGIN_STATE }
    );
    expect(state).to.not.equal(prevState); // should be immutable
    expect(state).to.deep.equal(prevState); // TODO: replace this line with real case.
  });
});
