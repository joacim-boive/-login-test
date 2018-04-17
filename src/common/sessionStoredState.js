const REDUX_STATE = 'reduxState';
const wss = window.sessionStorage;

export const loadState = () => {
    try {
        const serializedState = wss.getItem(REDUX_STATE);
        if (serializedState === null) {
            return undefined;
        }
        return JSON.parse(serializedState);
    } catch (e) {
        // JSON.parse errors
        return undefined;
    }
};

export const loadByKey = key => {
    try {
        const serializedState = wss.getItem(REDUX_STATE);
        if (serializedState === null) {
            return undefined;
        }
        const state = JSON.parse(serializedState);
        return state[key];
    } catch (e) {
        // JSON.parse errors
        return undefined;
    }
};

export const saveState = state => {
    try {
        const serializedState = JSON.stringify(state);
        wss.setItem(REDUX_STATE, serializedState);
    } catch (e) {
        // ignore write errors
    }
};

export const removeState = () => {
    wss.removeItem(REDUX_STATE);
};
