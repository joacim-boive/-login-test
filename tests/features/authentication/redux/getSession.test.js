import { expect } from 'chai';

import {
  AUTHENTICATION_GET_SESSION,
} from 'src/features/authentication/redux/constants';

import {
  getSession,
  reducer,
} from 'src/features/authentication/redux/getSession';

describe('authentication/redux/getSession', () => {
  it('returns correct action by getSession', () => {
    expect(getSession()).to.have.property('type', AUTHENTICATION_GET_SESSION);
  });

  it('handles action type AUTHENTICATION_GET_SESSION correctly', () => {
    const prevState = {};
    const state = reducer(
      prevState,
      { type: AUTHENTICATION_GET_SESSION }
    );
    expect(state).to.not.equal(prevState); // should be immutable
    expect(state).to.deep.equal(prevState); // TODO: replace this line with real case.
  });
});
