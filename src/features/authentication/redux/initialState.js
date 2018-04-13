// NOTE: initialState constant is necessary so that Rekit could auto add initial state when creating async actions.
import { loadByKey } from '../../../common/sessionStoredState';

const initialState = loadByKey('authentication') || {
    // generated
    deleteSessionPending: false,
    deleteSessionError: null,
    createSessionPending: false,
    createSessionError: null,
    getSessionPending: false,
    getSessionError: null,

    // added
    loginStatus: {
        sessionKey: undefined,
        isLoggedIn: false,
    },
    loginProgress: {
        status: undefined,
        pollTime: 0,
        startURL: undefined,
    },
    person: {},
};

export default initialState;
