import { expect } from 'chai';

import {
  COMMON_HIDE_FULLSCREEN_DIALOG,
} from 'src/features/common/redux/constants';

import {
  hideFullscreenDialog,
  reducer,
} from 'src/features/common/redux/hideFullscreenDialog';

describe('common/redux/hideFullscreenDialog', () => {
  it('returns correct action by hideFullscreenDialog', () => {
    expect(hideFullscreenDialog()).to.have.property('type', COMMON_HIDE_FULLSCREEN_DIALOG);
  });

  it('handles action type COMMON_HIDE_FULLSCREEN_DIALOG correctly', () => {
    const prevState = {};
    const state = reducer(
      prevState,
      { type: COMMON_HIDE_FULLSCREEN_DIALOG }
    );
    expect(state).to.not.equal(prevState); // should be immutable
    expect(state).to.deep.equal(prevState); // TODO: replace this line with real case.
  });
});
