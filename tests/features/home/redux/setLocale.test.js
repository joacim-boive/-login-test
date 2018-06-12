import { expect } from 'chai';

import {
  HOME_SET_LOCALE,
} from 'src/features/home/redux/constants';

import {
  setLocale,
  reducer,
} from 'src/features/home/redux/setLocale';

describe('home/redux/setLocale', () => {
  it('returns correct action by setLocale', () => {
    expect(setLocale()).to.have.property('type', HOME_SET_LOCALE);
  });

  it('handles action type HOME_SET_LOCALE correctly', () => {
    const prevState = {};
    const state = reducer(
      prevState,
      { type: HOME_SET_LOCALE }
    );
    expect(state).to.not.equal(prevState); // should be immutable
    expect(state).to.deep.equal(prevState); // TODO: replace this line with real case.
  });
});
