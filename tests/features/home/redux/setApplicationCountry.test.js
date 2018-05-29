import { expect } from 'chai';

import {
  HOME_SET_APPLICATION_COUNTRY,
} from 'src/features/home/redux/constants';

import {
  setApplicationCountry,
  reducer,
} from 'src/features/home/redux/setApplicationCountry';

describe('home/redux/setApplicationCountry', () => {
  it('returns correct action by setApplicationCountry', () => {
    expect(setApplicationCountry()).to.have.property('type', HOME_SET_APPLICATION_COUNTRY);
  });

  it('handles action type HOME_SET_APPLICATION_COUNTRY correctly', () => {
    const prevState = {};
    const state = reducer(
      prevState,
      { type: HOME_SET_APPLICATION_COUNTRY }
    );
    expect(state).to.not.equal(prevState); // should be immutable
    expect(state).to.deep.equal(prevState); // TODO: replace this line with real case.
  });
});
