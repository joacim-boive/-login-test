// Rekit uses a new approach to organizing actions and reducers. That is
// putting related actions and reducers in one file. See more at:
// https://medium.com/@nate_wang/a-new-approach-for-managing-redux-actions-91c26ce8b5da

import { COMMON_HIDE_SNACKBAR } from './constants';

export const hideSnackbar = () => {
    return {
        type: COMMON_HIDE_SNACKBAR,
    };
};

export function reducer(state, action) {
    switch (action.type) {
        case COMMON_HIDE_SNACKBAR:
            return {
                ...state,
                snackbar: {
                    show: false,
                    message: undefined,
                },
            };

        default:
            return state;
    }
}
