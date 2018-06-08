import { expect } from 'chai';

import {
  COMMON_HIDE_SNACKBAR,
} from 'src/features/common/redux/constants';

import {
  hideSnackbar,
  reducer,
} from 'src/features/common/redux/hideSnackbar';

describe('common/redux/hideSnackbar', () => {
  it('returns correct action by hideSnackbar', () => {
    expect(hideSnackbar()).to.have.property('type', COMMON_HIDE_SNACKBAR);
  });

  it('handles action type COMMON_HIDE_SNACKBAR correctly', () => {
    const prevState = {};
    const state = reducer(
      prevState,
      { type: COMMON_HIDE_SNACKBAR }
    );
    expect(state).to.not.equal(prevState); // should be immutable
    expect(state).to.deep.equal(prevState); // TODO: replace this line with real case.
  });
});
