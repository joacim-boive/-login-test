import configureMockStore from 'redux-mock-store';
import thunk from 'redux-thunk';
import nock from 'nock';
import { expect } from 'chai';

import {
  ACCOUNT_GET_CUSTOMER_ACCOUNT_CAMPAIGN_PURCHASES_BEGIN,
  ACCOUNT_GET_CUSTOMER_ACCOUNT_CAMPAIGN_PURCHASES_SUCCESS,
  ACCOUNT_GET_CUSTOMER_ACCOUNT_CAMPAIGN_PURCHASES_FAILURE,
  ACCOUNT_GET_CUSTOMER_ACCOUNT_CAMPAIGN_PURCHASES_DISMISS_ERROR,
} from 'src/features/account/redux/constants';

import {
  getCustomerAccountCampaignPurchases,
  dismissGetCustomerAccountCampaignPurchasesError,
  reducer,
} from 'src/features/account/redux/getCustomerAccountCampaignPurchases';

const middlewares = [thunk];
const mockStore = configureMockStore(middlewares);

describe('account/redux/getCustomerAccountCampaignPurchases', () => {
  afterEach(() => {
    nock.cleanAll();
  });

  it('dispatches success action when getCustomerAccountCampaignPurchases succeeds', () => {
    const store = mockStore({});

    return store.dispatch(getCustomerAccountCampaignPurchases())
      .then(() => {
        const actions = store.getActions();
        expect(actions[0]).to.have.property('type', ACCOUNT_GET_CUSTOMER_ACCOUNT_CAMPAIGN_PURCHASES_BEGIN);
        expect(actions[1]).to.have.property('type', ACCOUNT_GET_CUSTOMER_ACCOUNT_CAMPAIGN_PURCHASES_SUCCESS);
      });
  });

  it('dispatches failure action when getCustomerAccountCampaignPurchases fails', () => {
    const store = mockStore({});

    return store.dispatch(getCustomerAccountCampaignPurchases({ error: true }))
      .catch(() => {
        const actions = store.getActions();
        expect(actions[0]).to.have.property('type', ACCOUNT_GET_CUSTOMER_ACCOUNT_CAMPAIGN_PURCHASES_BEGIN);
        expect(actions[1]).to.have.property('type', ACCOUNT_GET_CUSTOMER_ACCOUNT_CAMPAIGN_PURCHASES_FAILURE);
        expect(actions[1]).to.have.nested.property('data.error').that.exist;
      });
  });

  it('returns correct action by dismissGetCustomerAccountCampaignPurchasesError', () => {
    const expectedAction = {
      type: ACCOUNT_GET_CUSTOMER_ACCOUNT_CAMPAIGN_PURCHASES_DISMISS_ERROR,
    };
    expect(dismissGetCustomerAccountCampaignPurchasesError()).to.deep.equal(expectedAction);
  });

  it('handles action type ACCOUNT_GET_CUSTOMER_ACCOUNT_CAMPAIGN_PURCHASES_BEGIN correctly', () => {
    const prevState = { getCustomerAccountCampaignPurchasesPending: false };
    const state = reducer(
      prevState,
      { type: ACCOUNT_GET_CUSTOMER_ACCOUNT_CAMPAIGN_PURCHASES_BEGIN }
    );
    expect(state).to.not.equal(prevState); // should be immutable
    expect(state.getCustomerAccountCampaignPurchasesPending).to.be.true;
  });

  it('handles action type ACCOUNT_GET_CUSTOMER_ACCOUNT_CAMPAIGN_PURCHASES_SUCCESS correctly', () => {
    const prevState = { getCustomerAccountCampaignPurchasesPending: true };
    const state = reducer(
      prevState,
      { type: ACCOUNT_GET_CUSTOMER_ACCOUNT_CAMPAIGN_PURCHASES_SUCCESS, data: {} }
    );
    expect(state).to.not.equal(prevState); // should be immutable
    expect(state.getCustomerAccountCampaignPurchasesPending).to.be.false;
  });

  it('handles action type ACCOUNT_GET_CUSTOMER_ACCOUNT_CAMPAIGN_PURCHASES_FAILURE correctly', () => {
    const prevState = { getCustomerAccountCampaignPurchasesPending: true };
    const state = reducer(
      prevState,
      { type: ACCOUNT_GET_CUSTOMER_ACCOUNT_CAMPAIGN_PURCHASES_FAILURE, data: { error: new Error('some error') } }
    );
    expect(state).to.not.equal(prevState); // should be immutable
    expect(state.getCustomerAccountCampaignPurchasesPending).to.be.false;
    expect(state.getCustomerAccountCampaignPurchasesError).to.exist;
  });

  it('handles action type ACCOUNT_GET_CUSTOMER_ACCOUNT_CAMPAIGN_PURCHASES_DISMISS_ERROR correctly', () => {
    const prevState = { getCustomerAccountCampaignPurchasesError: new Error('some error') };
    const state = reducer(
      prevState,
      { type: ACCOUNT_GET_CUSTOMER_ACCOUNT_CAMPAIGN_PURCHASES_DISMISS_ERROR }
    );
    expect(state).to.not.equal(prevState); // should be immutable
    expect(state.getCustomerAccountCampaignPurchasesError).to.be.null;
  });
});
