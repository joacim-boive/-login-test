// Rekit uses a new approach to organizing actions and reducers. That is
// putting related actions and reducers in one file. See more at:
// https://medium.com/@nate_wang/a-new-approach-for-managing-redux-actions-91c26ce8b5da

import { COMMON_HIDE_FULLSCREEN_DIALOG } from './constants';

export function hideFullscreenDialog() {
    return {
        type: COMMON_HIDE_FULLSCREEN_DIALOG,
    };
}

export function reducer(state, action) {
    switch (action.type) {
        case COMMON_HIDE_FULLSCREEN_DIALOG:
            return {
                ...state,
                fullscreenDialog: {
                    show: false,
                    body: undefined,
                },
            };

        default:
            return state;
    }
}
