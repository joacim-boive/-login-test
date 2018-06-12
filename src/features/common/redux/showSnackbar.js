// Rekit uses a new approach to organizing actions and reducers. That is
// putting related actions and reducers in one file. See more at:
// https://medium.com/@nate_wang/a-new-approach-for-managing-redux-actions-91c26ce8b5da

import { COMMON_SHOW_SNACKBAR } from './constants';
import { hideSnackbar } from './hideSnackbar';

export const showSnackbar = message => dispatch => {
    setTimeout(
        () =>
            dispatch({
                type: COMMON_SHOW_SNACKBAR,
                message,
            }),
        100
    );
    setTimeout(() => dispatch(hideSnackbar()), 3500);
};

export function reducer(state, action) {
    switch (action.type) {
        case COMMON_SHOW_SNACKBAR:
            return {
                ...state,
                snackbar: {
                    show: true,
                    message: action.message,
                },
            };

        default:
            return state;
    }
}
