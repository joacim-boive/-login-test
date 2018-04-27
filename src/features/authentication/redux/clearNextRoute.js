// Rekit uses a new approach to organizing actions and reducers. That is
// putting related actions and reducers in one file. See more at:
// https://medium.com/@nate_wang/a-new-approach-for-managing-redux-actions-91c26ce8b5da

import { AUTHENTICATION_CLEAR_NEXT_ROUTE } from './constants';

export const clearNextRoute = () => ({
    type: AUTHENTICATION_CLEAR_NEXT_ROUTE,
});

export function reducer(state, action) {
    switch (action.type) {
        case AUTHENTICATION_CLEAR_NEXT_ROUTE:
            return {
                ...state,
                nextRoute: undefined,
            };

        default:
            return state;
    }
}
