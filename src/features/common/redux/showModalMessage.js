// Rekit uses a new approach to organizing actions and reducers. That is
// putting related actions and reducers in one file. See more at:
// https://medium.com/@nate_wang/a-new-approach-for-managing-redux-actions-91c26ce8b5da

import { COMMON_SHOW_MODAL_MESSAGE } from './constants';

export function showModalMessage(header, message, messageType, onSubmit) {
    return {
        type: COMMON_SHOW_MODAL_MESSAGE,
        header,
        message,
        messageType,
        onSubmit,
    };
}

export function reducer(state, action) {
    switch (action.type) {
        case COMMON_SHOW_MODAL_MESSAGE:
            return {
                ...state,
                modalMessage: {
                    show: true,
                    header: action.header,
                    message: action.message,
                    type: action.messageType,
                },
            };

        default:
            return state;
    }
}
