import {
    LOAN_GET_ACTIVE_PROMISSORY_NOTE_CAMPAIGNS_BEGIN,
    LOAN_GET_ACTIVE_PROMISSORY_NOTE_CAMPAIGNS_SUCCESS,
    LOAN_GET_ACTIVE_PROMISSORY_NOTE_CAMPAIGNS_FAILURE,
    LOAN_GET_ACTIVE_PROMISSORY_NOTE_CAMPAIGNS_DISMISS_ERROR,
} from './constants';

import { get } from '../../../common/asyncAjax';

import { GET_ACTIVE_PROMISSORY_NOTE_CAMPAIGNS_URL } from './urls';

export const getActivePromissoryNoteCampaigns = () => async (dispatch) => {
    dispatch({
        type: LOAN_GET_ACTIVE_PROMISSORY_NOTE_CAMPAIGNS_BEGIN,
    });

    try {
        const res = await get(GET_ACTIVE_PROMISSORY_NOTE_CAMPAIGNS_URL());
        dispatch({
            type: LOAN_GET_ACTIVE_PROMISSORY_NOTE_CAMPAIGNS_SUCCESS,
            data: res.response,
        });
    } catch (err) {
        dispatch({
            type: LOAN_GET_ACTIVE_PROMISSORY_NOTE_CAMPAIGNS_FAILURE,
            data: { error: err },
        });
    }
};

export const dismissGetActivePromissoryNoteCampaignsError = () => ({ type: LOAN_GET_ACTIVE_PROMISSORY_NOTE_CAMPAIGNS_DISMISS_ERROR });

export function reducer(state, action) {
    switch (action.type) {
        case LOAN_GET_ACTIVE_PROMISSORY_NOTE_CAMPAIGNS_BEGIN:
            return {
                ...state,
                getActivePromissoryNoteCampaignsPending: true,
                getActivePromissoryNoteCampaignsError: null,
            };

        case LOAN_GET_ACTIVE_PROMISSORY_NOTE_CAMPAIGNS_SUCCESS:
            return {
                ...state,
                activePromissoryNoteCampaigns: action.data,
                getActivePromissoryNoteCampaignsPending: false,
                getActivePromissoryNoteCampaignsError: null,
            };

        case LOAN_GET_ACTIVE_PROMISSORY_NOTE_CAMPAIGNS_FAILURE:
            return {
                ...state,
                getActivePromissoryNoteCampaignsPending: false,
                getActivePromissoryNoteCampaignsError: action.data.error,
            };

        case LOAN_GET_ACTIVE_PROMISSORY_NOTE_CAMPAIGNS_DISMISS_ERROR:
            return {
                ...state,
                getActivePromissoryNoteCampaignsError: null,
            };

        default:
            return state;
    }
}
