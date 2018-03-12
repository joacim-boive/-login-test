import {
    ACCOUNT_GET_ACCOUNT_CAMPAIGN_PURCHASES_BEGIN,
    ACCOUNT_GET_ACCOUNT_CAMPAIGN_PURCHASES_SUCCESS,
    ACCOUNT_GET_ACCOUNT_CAMPAIGN_PURCHASES_FAILURE,
    ACCOUNT_GET_ACCOUNT_CAMPAIGN_PURCHASES_DISMISS_ERROR,
} from './constants';

import { get } from '../../../common/asyncAjax';

import { GET_ACCOUNT_CAMPAIGN_PURCHASES_URL } from './urls';

export const getAccountCampaignPurchases = (customerId, referenceId) => async (dispatch) => {
    dispatch({
        type: ACCOUNT_GET_ACCOUNT_CAMPAIGN_PURCHASES_BEGIN,
    });

    try {
        const res = await get(GET_ACCOUNT_CAMPAIGN_PURCHASES_URL(customerId, referenceId));
        dispatch({
            type: ACCOUNT_GET_ACCOUNT_CAMPAIGN_PURCHASES_SUCCESS,
            data: res.response,
        });
    } catch (err) {
        dispatch({
            type: ACCOUNT_GET_ACCOUNT_CAMPAIGN_PURCHASES_FAILURE,
            data: { error: err },
        });
    }
};

export const dismissGetAccountCampaignPurchasesError = () => ({ type: ACCOUNT_GET_ACCOUNT_CAMPAIGN_PURCHASES_DISMISS_ERROR });

export function reducer(state, action) {
    switch (action.type) {
        case ACCOUNT_GET_ACCOUNT_CAMPAIGN_PURCHASES_BEGIN:
            return {
                ...state,
                getAccountCampaignPurchasesPending: true,
                getAccountCampaignPurchasesError: null,
            };

        case ACCOUNT_GET_ACCOUNT_CAMPAIGN_PURCHASES_SUCCESS:
            return {
                ...state,
                accountCampaignPurchases: action.data,
                getAccountCampaignPurchasesPending: false,
                getAccountCampaignPurchasesError: null,
            };

        case ACCOUNT_GET_ACCOUNT_CAMPAIGN_PURCHASES_FAILURE:
            return {
                ...state,
                getAccountCampaignPurchasesPending: false,
                getAccountCampaignPurchasesError: action.data.error,
            };

        case ACCOUNT_GET_ACCOUNT_CAMPAIGN_PURCHASES_DISMISS_ERROR:
            return {
                ...state,
                getAccountCampaignPurchasesError: null,
            };

        default:
            return state;
    }
}
