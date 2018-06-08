// NOTE: initialState constant is necessary so that Rekit could auto add initial state when creating async actions.

const initialState = {
    // generated
    getTextPending: false,
    getTextError: null,

    // edited
    texts: {}, // { key1: "value1", key2: "value2", ... }
    fullscreenDialog: {
        show: false,
        body: undefined,
    },
    snackbar: {
        show: false,
        message: undefined,
    },
    modalMessage: {
        show: false,
        header: undefined,
        message: undefined,
        type: undefined,
    },
};

export default initialState;
