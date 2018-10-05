import { COMMON_SHOW_ALPHA_ONBOARDING } from './constants';

export const showAlphaOnboarding = () => ({
    type: COMMON_SHOW_ALPHA_ONBOARDING,
});

// don't ES6 this one, rekit gets lost /joli44
export function reducer(state, action) {
    switch (action.type) {
        case COMMON_SHOW_ALPHA_ONBOARDING:
            return {
                ...state,
                alpha: {
                    showOnboarding: true,
                },
            };

        default:
            return state;
    }
}
