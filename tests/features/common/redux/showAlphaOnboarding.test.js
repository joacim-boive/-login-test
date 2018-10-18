import {
  COMMON_SHOW_ALPHA_ONBOARDING,
} from '../../../../src/features/common/redux/constants';

import {
  showAlphaOnboarding,
  reducer,
} from '../../../../src/features/common/redux/showAlphaOnboarding';

describe('common/redux/showAlphaOnboarding', () => {
  it('returns correct action by showAlphaOnboarding', () => {
    expect(showAlphaOnboarding()).toHaveProperty('type', COMMON_SHOW_ALPHA_ONBOARDING);
  });

  it('handles action type COMMON_SHOW_ALPHA_ONBOARDING correctly', () => {
    const prevState = {};
    const state = reducer(
      prevState,
      { type: COMMON_SHOW_ALPHA_ONBOARDING }
    );
    // Should be immutable
    expect(state).not.toBe(prevState);

    // TODO: use real case expected value instead of {}.
    const expectedState = {};
    expect(state).toEqual(expectedState);
  });
});
