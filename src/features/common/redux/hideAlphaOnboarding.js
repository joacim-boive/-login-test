import { COMMON_HIDE_ALPHA_ONBOARDING } from './constants';

export const hideAlphaOnboarding = () => ({
    type: COMMON_HIDE_ALPHA_ONBOARDING,
});

// don't ES6 this one, rekit gets lost /joli44
export function reducer(state, action) {
    switch (action.type) {
        case COMMON_HIDE_ALPHA_ONBOARDING:
            return {
                ...state,
                alpha: {
                    showOnboarding: false,
                },
            };

        default:
            return state;
    }
}
