import Ajax from '@ecster/ecster-net/lib/Ajax';

import {
    ACCOUNT_GET_ACCOUNT_CAMPAIGN_PURCHASES_BEGIN,
    ACCOUNT_GET_ACCOUNT_CAMPAIGN_PURCHASES_SUCCESS,
    ACCOUNT_GET_ACCOUNT_CAMPAIGN_PURCHASES_FAILURE,
    ACCOUNT_GET_ACCOUNT_CAMPAIGN_PURCHASES_DISMISS_ERROR,
} from './constants';

import { GET_ACCOUNT_CAMPAIGN_PURCHASES_URL } from './urls';

export function getAccountCampaignPurchases(customerId, referenceId) {
    return (dispatch) => { // optionally you can have getState as the second argument
        dispatch({
            type: ACCOUNT_GET_ACCOUNT_CAMPAIGN_PURCHASES_BEGIN,
        });

        return new Promise((resolve, reject) => {
            Ajax.get({url: GET_ACCOUNT_CAMPAIGN_PURCHASES_URL(customerId, referenceId)})
                .then(
                    (xhr, res) => {
                        dispatch({
                            type: ACCOUNT_GET_ACCOUNT_CAMPAIGN_PURCHASES_SUCCESS,
                            data: res.response,
                        });
                        resolve(res);
                    })
                .catch(
                    (err) => {
                        dispatch({
                            type: ACCOUNT_GET_ACCOUNT_CAMPAIGN_PURCHASES_FAILURE,
                            data: { error: err },
                        });
                        reject(err);
                    },
                );
        });
    };
}

export function dismissGetAccountCampaignPurchasesError() {
    return {
        type: ACCOUNT_GET_ACCOUNT_CAMPAIGN_PURCHASES_DISMISS_ERROR,
    };
}

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
