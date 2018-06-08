import { expect } from 'chai';

import {
  COMMON_SHOW_SNACKBAR,
} from 'src/features/common/redux/constants';

import {
  showSnackbar,
  reducer,
} from 'src/features/common/redux/showSnackbar';

describe('common/redux/showSnackbar', () => {
  it('returns correct action by showSnackbar', () => {
    expect(showSnackbar()).to.have.property('type', COMMON_SHOW_SNACKBAR);
  });

  it('handles action type COMMON_SHOW_SNACKBAR correctly', () => {
    const prevState = {};
    const state = reducer(
      prevState,
      { type: COMMON_SHOW_SNACKBAR }
    );
    expect(state).to.not.equal(prevState); // should be immutable
    expect(state).to.deep.equal(prevState); // TODO: replace this line with real case.
  });
});
