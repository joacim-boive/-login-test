
// NOTE: initialState constant is necessary so that Rekit could auto add initial state when creating async actions.
const initialState = {
    session: {},
    isLoggedIn: false,
    person: {},

    // generated
    deleteSessionPending: false,
    deleteSessionError: null,
    createSessionPending: false,
    createSessionError: null,
    getSessionPending: false,
    getSessionError: null,
};

export default initialState;
