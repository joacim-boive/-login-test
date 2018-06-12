import { expect } from 'chai';

import {
  COMMON_SHOW_MODAL_MESSAGE,
} from 'src/features/common/redux/constants';

import {
  showModalMessage,
  reducer,
} from 'src/features/common/redux/showModalMessage';

describe('common/redux/showModalMessage', () => {
  it('returns correct action by showModalMessage', () => {
    expect(showModalMessage()).to.have.property('type', COMMON_SHOW_MODAL_MESSAGE);
  });

  it('handles action type COMMON_SHOW_MODAL_MESSAGE correctly', () => {
    const prevState = {};
    const state = reducer(
      prevState,
      { type: COMMON_SHOW_MODAL_MESSAGE }
    );
    expect(state).to.not.equal(prevState); // should be immutable
    expect(state).to.deep.equal(prevState); // TODO: replace this line with real case.
  });
});
