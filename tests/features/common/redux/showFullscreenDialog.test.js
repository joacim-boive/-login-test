import { expect } from 'chai';

import {
  COMMON_SHOW_FULLSCREEN_DIALOG,
} from 'src/features/common/redux/constants';

import {
  showFullscreenDialog,
  reducer,
} from 'src/features/common/redux/showFullscreenDialog';

describe('common/redux/showFullscreenDialog', () => {
  it('returns correct action by showFullscreenDialog', () => {
    expect(showFullscreenDialog()).to.have.property('type', COMMON_SHOW_FULLSCREEN_DIALOG);
  });

  it('handles action type COMMON_SHOW_FULLSCREEN_DIALOG correctly', () => {
    const prevState = {};
    const state = reducer(
      prevState,
      { type: COMMON_SHOW_FULLSCREEN_DIALOG }
    );
    expect(state).to.not.equal(prevState); // should be immutable
    expect(state).to.deep.equal(prevState); // TODO: replace this line with real case.
  });
});
