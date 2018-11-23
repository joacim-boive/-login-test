// NOTE: initialState constant is necessary so that Rekit could auto add initial state when creating async actions.
import { loadReduxStateByKey } from '../../../common/sessionStoredState';

export const loginStatus = {
    sessionKey: undefined,
    isLoggedIn: false,
};

export const loginProgress = {
    status: undefined,
    pollTime: 0,
    startURL: undefined,
};

// read from session storage at page reload
const initialState = loadReduxStateByKey('authentication') || {
    // generated
    deleteSessionPending: false,
    deleteSessionError: null,
    createSessionPending: false,
    createSessionError: null,
    getSessionPending: false,
    getSessionError: null,

    // added
    loginStatus,
    loginProgress,
    person: {},
};

export default initialState;
