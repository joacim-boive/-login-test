import initialState from './initialState';

const reducers = [];

export default function reducer(state = initialState, action) {
    let nextState;
    switch (action.type) {
        // Handle cross-topic actions here
        case 'CLEAR_STATE':
            nextState = initialState;
            break;
        default:
            nextState = state;
            break;
    }
    return reducers.reduce((s, r) => r(s, action), nextState);
}
