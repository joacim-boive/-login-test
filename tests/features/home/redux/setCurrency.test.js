import { expect } from 'chai';

import {
  HOME_SET_CURRENCY,
} from 'src/features/home/redux/constants';

import {
  setCurrency,
  reducer,
} from 'src/features/home/redux/setCurrency';

describe('home/redux/setCurrency', () => {
  it('returns correct action by setCurrency', () => {
    expect(setCurrency()).to.have.property('type', HOME_SET_CURRENCY);
  });

  it('handles action type HOME_SET_CURRENCY correctly', () => {
    const prevState = {};
    const state = reducer(
      prevState,
      { type: HOME_SET_CURRENCY }
    );
    expect(state).to.not.equal(prevState); // should be immutable
    expect(state).to.deep.equal(prevState); // TODO: replace this line with real case.
  });
});
