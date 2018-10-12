import {
    ${actionTypes.begin},
    ${actionTypes.success},
    ${actionTypes.failure},
    ${actionTypes.dismissError},
} from './constants';

import { get } from '@ecster/ecster-net/lib/v2/Ajax'; // or post, put, del

const ${_.snakeCase(action).toUpperCase()}_URL = () => `/rest/...`;

export const ${_.camelCase(action)} = () => async dispatch => {
    dispatch({
        type: ${actionTypes.begin},
    });

    try {
        const res = await get(${_.snakeCase(action).toUpperCase()}_URL());
        // const res = await put(${_.snakeCase(action).toUpperCase()}_URL(), data);
        // const res = await post(${_.snakeCase(action).toUpperCase()}_URL(), data);
        // const res = await del(${_.snakeCase(action).toUpperCase()}_URL());

        dispatch({
            type: ${actionTypes.success},
            data: res.response,
        });
    } catch (err) {
        dispatch({
            type: ${actionTypes.failure},
            data: { error: err },
        });
    }
};

export const dismiss${_.pascalCase(action)}Error = () => ({ type: ${actionTypes.dismissError} });

// don't ES6 this one, rekit studio gets lost /joli44
export function reducer(state, action) {
    switch (action.type) {
        case ${actionTypes.begin}:
            return {
                ...state,
                ${_.camelCase(action)}Pending: true,
                ${_.camelCase(action)}Error: null,
            };

        case ${actionTypes.success}:
            return {
                ...state,
                ${_.camelCase(action)}Pending: false,
                ${_.camelCase(action)}Error: null,
            };

        case ${actionTypes.failure}:
            return {
                ...state,
                ${_.camelCase(action)}Pending: false,
                ${_.camelCase(action)}Error: action.data.error,
            };

        case ${actionTypes.dismissError}:
            return {
                ...state,
                ${_.camelCase(action)}Error: null,
            };

        default:
            return state;
    }
}
