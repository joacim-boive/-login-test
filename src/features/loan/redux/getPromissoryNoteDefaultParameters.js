import {
    LOAN_GET_PROMISSORY_NOTE_DEFAULT_PARAMETERS_BEGIN,
    LOAN_GET_PROMISSORY_NOTE_DEFAULT_PARAMETERS_SUCCESS,
    LOAN_GET_PROMISSORY_NOTE_DEFAULT_PARAMETERS_FAILURE,
    LOAN_GET_PROMISSORY_NOTE_DEFAULT_PARAMETERS_DISMISS_ERROR,
} from './constants';

import { get } from '../../../common/asyncAjax';

import { GET_PROMISSORY_NOTE_DEFAULT_PARAMETERS_URL } from './urls';

export const getPromissoryNoteDefaultParameters = () => async (dispatch) => {
    dispatch({
        type: LOAN_GET_PROMISSORY_NOTE_DEFAULT_PARAMETERS_BEGIN,
    });

    try {
        const res = await get(GET_PROMISSORY_NOTE_DEFAULT_PARAMETERS_URL());
        dispatch({
            type: LOAN_GET_PROMISSORY_NOTE_DEFAULT_PARAMETERS_SUCCESS,
            data: res.response,
        });
    } catch (err) {
        dispatch({
            type: LOAN_GET_PROMISSORY_NOTE_DEFAULT_PARAMETERS_FAILURE,
            data: { error: err },
        });
    }
};

export const dismissGetPromissoryNoteDefaultParametersError = () => ({ type: LOAN_GET_PROMISSORY_NOTE_DEFAULT_PARAMETERS_DISMISS_ERROR });

export function reducer(state, action) {
    switch (action.type) {
        case LOAN_GET_PROMISSORY_NOTE_DEFAULT_PARAMETERS_BEGIN:
            return {
                ...state,
                getPromissoryNoteDefaultParametersPending: true,
                getPromissoryNoteDefaultParametersError: null,
            };

        case LOAN_GET_PROMISSORY_NOTE_DEFAULT_PARAMETERS_SUCCESS:
            return {
                ...state,
                promissoryNoteDefaultParameters: action.data,
                getPromissoryNoteDefaultParametersPending: false,
                getPromissoryNoteDefaultParametersError: null,
            };

        case LOAN_GET_PROMISSORY_NOTE_DEFAULT_PARAMETERS_FAILURE:
            return {
                ...state,
                getPromissoryNoteDefaultParametersPending: false,
                getPromissoryNoteDefaultParametersError: action.data.error,
            };

        case LOAN_GET_PROMISSORY_NOTE_DEFAULT_PARAMETERS_DISMISS_ERROR:
            return {
                ...state,
                getPromissoryNoteDefaultParametersError: null,
            };

        default:
            return state;
    }
}
