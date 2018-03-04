import configureMockStore from 'redux-mock-store';
import thunk from 'redux-thunk';
import nock from 'nock';
import { expect } from 'chai';

import {
  CUSTOMER_UPDATE_CUSTOMER_EXTRA_CARD_HOLDER_CONTACT_INFO_BEGIN,
  CUSTOMER_UPDATE_CUSTOMER_EXTRA_CARD_HOLDER_CONTACT_INFO_SUCCESS,
  CUSTOMER_UPDATE_CUSTOMER_EXTRA_CARD_HOLDER_CONTACT_INFO_FAILURE,
  CUSTOMER_UPDATE_CUSTOMER_EXTRA_CARD_HOLDER_CONTACT_INFO_DISMISS_ERROR,
} from 'src/features/customer/redux/constants';

import {
  updateCustomerExtraCardHolderContactInfo,
  dismissUpdateCustomerExtraCardHolderContactInfoError,
  reducer,
} from 'src/features/customer/redux/updateCustomerExtraCardHolderContactInfo';

const middlewares = [thunk];
const mockStore = configureMockStore(middlewares);

describe('customer/redux/updateCustomerExtraCardHolderContactInfo', () => {
  afterEach(() => {
    nock.cleanAll();
  });

  it('dispatches success action when updateCustomerExtraCardHolderContactInfo succeeds', () => {
    const store = mockStore({});

    return store.dispatch(updateCustomerExtraCardHolderContactInfo())
      .then(() => {
        const actions = store.getActions();
        expect(actions[0]).to.have.property('type', CUSTOMER_UPDATE_CUSTOMER_EXTRA_CARD_HOLDER_CONTACT_INFO_BEGIN);
        expect(actions[1]).to.have.property('type', CUSTOMER_UPDATE_CUSTOMER_EXTRA_CARD_HOLDER_CONTACT_INFO_SUCCESS);
      });
  });

  it('dispatches failure action when updateCustomerExtraCardHolderContactInfo fails', () => {
    const store = mockStore({});

    return store.dispatch(updateCustomerExtraCardHolderContactInfo({ error: true }))
      .catch(() => {
        const actions = store.getActions();
        expect(actions[0]).to.have.property('type', CUSTOMER_UPDATE_CUSTOMER_EXTRA_CARD_HOLDER_CONTACT_INFO_BEGIN);
        expect(actions[1]).to.have.property('type', CUSTOMER_UPDATE_CUSTOMER_EXTRA_CARD_HOLDER_CONTACT_INFO_FAILURE);
        expect(actions[1]).to.have.nested.property('data.error').that.exist;
      });
  });

  it('returns correct action by dismissUpdateCustomerExtraCardHolderContactInfoError', () => {
    const expectedAction = {
      type: CUSTOMER_UPDATE_CUSTOMER_EXTRA_CARD_HOLDER_CONTACT_INFO_DISMISS_ERROR,
    };
    expect(dismissUpdateCustomerExtraCardHolderContactInfoError()).to.deep.equal(expectedAction);
  });

  it('handles action type CUSTOMER_UPDATE_CUSTOMER_EXTRA_CARD_HOLDER_CONTACT_INFO_BEGIN correctly', () => {
    const prevState = { updateCustomerExtraCardHolderContactInfoPending: false };
    const state = reducer(
      prevState,
      { type: CUSTOMER_UPDATE_CUSTOMER_EXTRA_CARD_HOLDER_CONTACT_INFO_BEGIN }
    );
    expect(state).to.not.equal(prevState); // should be immutable
    expect(state.updateCustomerExtraCardHolderContactInfoPending).to.be.true;
  });

  it('handles action type CUSTOMER_UPDATE_CUSTOMER_EXTRA_CARD_HOLDER_CONTACT_INFO_SUCCESS correctly', () => {
    const prevState = { updateCustomerExtraCardHolderContactInfoPending: true };
    const state = reducer(
      prevState,
      { type: CUSTOMER_UPDATE_CUSTOMER_EXTRA_CARD_HOLDER_CONTACT_INFO_SUCCESS, data: {} }
    );
    expect(state).to.not.equal(prevState); // should be immutable
    expect(state.updateCustomerExtraCardHolderContactInfoPending).to.be.false;
  });

  it('handles action type CUSTOMER_UPDATE_CUSTOMER_EXTRA_CARD_HOLDER_CONTACT_INFO_FAILURE correctly', () => {
    const prevState = { updateCustomerExtraCardHolderContactInfoPending: true };
    const state = reducer(
      prevState,
      { type: CUSTOMER_UPDATE_CUSTOMER_EXTRA_CARD_HOLDER_CONTACT_INFO_FAILURE, data: { error: new Error('some error') } }
    );
    expect(state).to.not.equal(prevState); // should be immutable
    expect(state.updateCustomerExtraCardHolderContactInfoPending).to.be.false;
    expect(state.updateCustomerExtraCardHolderContactInfoError).to.exist;
  });

  it('handles action type CUSTOMER_UPDATE_CUSTOMER_EXTRA_CARD_HOLDER_CONTACT_INFO_DISMISS_ERROR correctly', () => {
    const prevState = { updateCustomerExtraCardHolderContactInfoError: new Error('some error') };
    const state = reducer(
      prevState,
      { type: CUSTOMER_UPDATE_CUSTOMER_EXTRA_CARD_HOLDER_CONTACT_INFO_DISMISS_ERROR }
    );
    expect(state).to.not.equal(prevState); // should be immutable
    expect(state.updateCustomerExtraCardHolderContactInfoError).to.be.null;
  });
});
