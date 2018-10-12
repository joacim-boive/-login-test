import {
  ${actionType},
} from './constants';

export const ${_.camelCase(action)} = () => ({
    type: ${actionType},
});

// don't ES6 this one, rekit gets lost /joli44
export function reducer(state, action) {
    switch (action.type) {
        case ${actionType}:
            return {
                ...state,
                // add state modifications here
            };

        default:
            return state;
    }
}
