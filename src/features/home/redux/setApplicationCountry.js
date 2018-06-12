// Rekit uses a new approach to organizing actions and reducers. That is
// putting related actions and reducers in one file. See more at:
// https://medium.com/@nate_wang/a-new-approach-for-managing-redux-actions-91c26ce8b5da

import { HOME_SET_APPLICATION_COUNTRY } from './constants';

export const setApplicationCountry = countryCode => ({
    type: HOME_SET_APPLICATION_COUNTRY,
    countryCode,
});

export function reducer(state, action) {
    switch (action.type) {
        case HOME_SET_APPLICATION_COUNTRY:
            return {
                ...state,
                applicationCountry: action.countryCode,
            };

        default:
            return state;
    }
}
