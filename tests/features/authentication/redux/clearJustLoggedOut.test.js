import {
  AUTHENTICATION_CLEAR_JUST_LOGGED_OUT,
} from '../../../../src/features/authentication/redux/constants';

import {
  clearJustLoggedOut,
  reducer,
} from '../../../../src/features/authentication/redux/clearJustLoggedOut';

describe('authentication/redux/clearJustLoggedOut', () => {
  it('returns correct action by clearJustLoggedOut', () => {
    expect(clearJustLoggedOut()).toHaveProperty('type', AUTHENTICATION_CLEAR_JUST_LOGGED_OUT);
  });

  it('handles action type AUTHENTICATION_CLEAR_JUST_LOGGED_OUT correctly', () => {
    const prevState = {};
    const state = reducer(
      prevState,
      { type: AUTHENTICATION_CLEAR_JUST_LOGGED_OUT }
    );
    // Should be immutable
    expect(state).not.toBe(prevState);

    // TODO: use real case expected value instead of {}.
    const expectedState = {};
    expect(state).toEqual(expectedState);
  });
});
