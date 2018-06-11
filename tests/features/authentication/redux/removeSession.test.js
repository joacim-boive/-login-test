import { expect } from 'chai';

import {
  AUTHENTICATION_REMOVE_SESSION,
} from 'src/features/authentication/redux/constants';

import {
  removeSession,
  reducer,
} from 'src/features/authentication/redux/removeSession';

describe('authentication/redux/removeSession', () => {
  it('returns correct action by removeSession', () => {
    expect(removeSession()).to.have.property('type', AUTHENTICATION_REMOVE_SESSION);
  });

  it('handles action type AUTHENTICATION_REMOVE_SESSION correctly', () => {
    const prevState = {};
    const state = reducer(
      prevState,
      { type: AUTHENTICATION_REMOVE_SESSION }
    );
    expect(state).to.not.equal(prevState); // should be immutable
    expect(state).to.deep.equal(prevState); // TODO: replace this line with real case.
  });
});
