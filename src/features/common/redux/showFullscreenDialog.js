// Rekit uses a new approach to organizing actions and reducers. That is
// putting related actions and reducers in one file. See more at:
// https://medium.com/@nate_wang/a-new-approach-for-managing-redux-actions-91c26ce8b5da

import { COMMON_SHOW_FULLSCREEN_DIALOG } from './constants';

export function showFullscreenDialog(body) {
    return {
        type: COMMON_SHOW_FULLSCREEN_DIALOG,
        body,
    };
}

export function reducer(state, action) {
    switch (action.type) {
        case COMMON_SHOW_FULLSCREEN_DIALOG:
            return {
                ...state,
                fullscreenDialog: {
                    body: action.body,
                    show: true,
                },
            };

        default:
            return state;
    }
}
