// NOTE: initialState constant is necessary so that Rekit could auto add initial state when creating async actions.
import { loadByKey } from '../../../common/sessionStoredState';

export const loginStatus = {
    sessionKey: undefined,
    isLoggedIn: false,
}

export const loginProgress = {
    status: undefined,
    pollTime: 0,
    startURL: undefined,
}

const initialState = loadByKey('authentication') || {
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
