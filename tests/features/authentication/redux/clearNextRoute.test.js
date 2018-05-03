import { expect } from 'chai';

import {
  AUTHENTICATION_CLEAR_NEXT_ROUTE,
} from 'src/features/authentication/redux/constants';

import {
  clearNextRoute,
  reducer,
} from 'src/features/authentication/redux/clearNextRoute';

describe('authentication/redux/clearNextRoute', () => {
  it('returns correct action by clearNextRoute', () => {
    expect(clearNextRoute()).to.have.property('type', AUTHENTICATION_CLEAR_NEXT_ROUTE);
  });

  it('handles action type AUTHENTICATION_CLEAR_NEXT_ROUTE correctly', () => {
    const prevState = {};
    const state = reducer(
      prevState,
      { type: AUTHENTICATION_CLEAR_NEXT_ROUTE }
    );
    expect(state).to.not.equal(prevState); // should be immutable
    expect(state).to.deep.equal(prevState); // TODO: replace this line with real case.
  });
});
