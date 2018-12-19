import {
    ACCOUNT_GET_ACCOUNT_BEGIN,
    ACCOUNT_GET_ACCOUNT_SUCCESS,
    ACCOUNT_GET_ACCOUNT_FAILURE,
    ACCOUNT_GET_ACCOUNT_DISMISS_ERROR,
    ACCOUNT_GET_ACCOUNT_CLEAR,
} from './constants';

import { get } from '../../../common/asyncAjax';

import { GET_ACCOUNT_URL } from './urls';

const testNo = window.location.hash.split('test=')[1]; // ...?test=01

export const getAccount = (customerId, accountRef) => async dispatch => {
    dispatch({
        type: ACCOUNT_GET_ACCOUNT_BEGIN,
    });

    try {
        const res = testNo
            ? await get(`test/${testNo}-account.json`)
            : await get(GET_ACCOUNT_URL(customerId, accountRef));
        dispatch({
            type: ACCOUNT_GET_ACCOUNT_SUCCESS,
            data: testNo ? { ...res.response, reference: 'XYZ0123456789' } : res.response,
        });
    } catch (err) {
        dispatch({
            type: ACCOUNT_GET_ACCOUNT_FAILURE,
            data: { error: err },
        });
    }
};

export const dismissGetAccountError = () => ({ type: ACCOUNT_GET_ACCOUNT_DISMISS_ERROR });

// export const getAccountReset = () => ({ type: ACCOUNT_GET_ACCOUNT_CLEAR });

export function reducer(state, action) {
    switch (action.type) {
        case ACCOUNT_GET_ACCOUNT_BEGIN:
            return {
                ...state,
                getAccountPending: true,
                getAccountError: null,
            };

        case ACCOUNT_GET_ACCOUNT_SUCCESS:
            return {
                ...state,
                account: action.data,
                getAccountPending: false,
                getAccountError: null,
            };

        case ACCOUNT_GET_ACCOUNT_FAILURE:
            return {
                ...state,
                getAccountPending: false,
                getAccountError: action.data.error,
            };

        case ACCOUNT_GET_ACCOUNT_DISMISS_ERROR:
            return {
                ...state,
                getAccountError: null,
            };

        case ACCOUNT_GET_ACCOUNT_CLEAR:
            console.log('ACCOUNT_GET_ACCOUNT_CLEAR');
            return {
                ...state,
                // account: {},
                account: { ...state.account, brickId: undefined },
                getAccountPending: false,
                getAccountError: null,
            };

        default:
            return state;
    }
}
