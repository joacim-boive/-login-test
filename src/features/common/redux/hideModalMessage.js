// Rekit uses a new approach to organizing actions and reducers. That is
// putting related actions and reducers in one file. See more at:
// https://medium.com/@nate_wang/a-new-approach-for-managing-redux-actions-91c26ce8b5da

import { COMMON_HIDE_MODAL_MESSAGE } from './constants';

export function hideModalMessage() {
    return {
        type: COMMON_HIDE_MODAL_MESSAGE,
    };
}

export function reducer(state, action) {
    switch (action.type) {
        case COMMON_HIDE_MODAL_MESSAGE:
            return {
                ...state,
                modalMessage: {
                    show: false,
                    header: undefined,
                    message: undefined,
                    type: undefined,
                },
            };

        default:
            return state;
    }
}
