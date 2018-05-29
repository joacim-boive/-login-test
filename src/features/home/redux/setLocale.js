// Rekit uses a new approach to organizing actions and reducers. That is
// putting related actions and reducers in one file. See more at:
// https://medium.com/@nate_wang/a-new-approach-for-managing-redux-actions-91c26ce8b5da

import { HOME_SET_LOCALE } from './constants';

export const setLocale = locale => ({
    type: HOME_SET_LOCALE,
    locale,
});

export function reducer(state, action) {
    switch (action.type) {
        case HOME_SET_LOCALE:
            return {
                ...state,
                locale: action.locale,
            };
        default:
            return state;
    }
}
