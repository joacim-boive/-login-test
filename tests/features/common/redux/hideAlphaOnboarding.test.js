import {
  COMMON_HIDE_ALPHA_ONBOARDING,
} from '../../../../src/features/common/redux/constants';

import {
  hideAlphaOnboarding,
  reducer,
} from '../../../../src/features/common/redux/hideAlphaOnboarding';

describe('common/redux/hideAlphaOnboarding', () => {
  it('returns correct action by hideAlphaOnboarding', () => {
    expect(hideAlphaOnboarding()).toHaveProperty('type', COMMON_HIDE_ALPHA_ONBOARDING);
  });

  it('handles action type COMMON_HIDE_ALPHA_ONBOARDING correctly', () => {
    const prevState = {};
    const state = reducer(
      prevState,
      { type: COMMON_HIDE_ALPHA_ONBOARDING }
    );
    // Should be immutable
    expect(state).not.toBe(prevState);

    // TODO: use real case expected value instead of {}.
    const expectedState = {};
    expect(state).toEqual(expectedState);
  });
});
