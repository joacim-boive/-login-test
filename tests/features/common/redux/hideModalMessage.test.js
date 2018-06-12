import { expect } from 'chai';

import {
  COMMON_HIDE_MODAL_MESSAGE,
} from 'src/features/common/redux/constants';

import {
  hideModalMessage,
  reducer,
} from 'src/features/common/redux/hideModalMessage';

describe('common/redux/hideModalMessage', () => {
  it('returns correct action by hideModalMessage', () => {
    expect(hideModalMessage()).to.have.property('type', COMMON_HIDE_MODAL_MESSAGE);
  });

  it('handles action type COMMON_HIDE_MODAL_MESSAGE correctly', () => {
    const prevState = {};
    const state = reducer(
      prevState,
      { type: COMMON_HIDE_MODAL_MESSAGE }
    );
    expect(state).to.not.equal(prevState); // should be immutable
    expect(state).to.deep.equal(prevState); // TODO: replace this line with real case.
  });
});
