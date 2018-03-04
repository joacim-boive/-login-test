
// NOTE: initialState constant is necessary so that Rekit could auto add initial state when creating async actions.

const initialState = {
    texts: {}, // { key1: "value1", key2: "value2", ... }

    // generated
    getTextPending: false,
    getTextError: null,
};

export default initialState;
