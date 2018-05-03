import { expect } from 'chai';

import {
  AUTHENTICATION_SET_NEXT_ROUTE,
} from 'src/features/authentication/redux/constants';

import {
  setNextRoute,
  reducer,
} from 'src/features/authentication/redux/setNextRoute';

describe('authentication/redux/setNextRoute', () => {
  it('returns correct action by setNextRoute', () => {
    expect(setNextRoute()).to.have.property('type', AUTHENTICATION_SET_NEXT_ROUTE);
  });

  it('handles action type AUTHENTICATION_SET_NEXT_ROUTE correctly', () => {
    const prevState = {};
    const state = reducer(
      prevState,
      { type: AUTHENTICATION_SET_NEXT_ROUTE }
    );
    expect(state).to.not.equal(prevState); // should be immutable
    expect(state).to.deep.equal(prevState); // TODO: replace this line with real case.
  });
});
