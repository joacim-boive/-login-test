import configureMockStore from 'redux-mock-store';
import thunk from 'redux-thunk';
import nock from 'nock';
import { expect } from 'chai';

import {
  ACCOUNT_UPDATE_CUSTOMER_ACCOUNT_CARD_BEGIN,
  ACCOUNT_UPDATE_CUSTOMER_ACCOUNT_CARD_SUCCESS,
  ACCOUNT_UPDATE_CUSTOMER_ACCOUNT_CARD_FAILURE,
  ACCOUNT_UPDATE_CUSTOMER_ACCOUNT_CARD_DISMISS_ERROR,
} from 'src/features/account/redux/constants';

import {
  updateCustomerAccountCard,
  dismissUpdateCustomerAccountCardError,
  reducer,
} from 'src/features/account/redux/updateCustomerAccountCard';

const middlewares = [thunk];
const mockStore = configureMockStore(middlewares);

describe('account/redux/updateCustomerAccountCard', () => {
  afterEach(() => {
    nock.cleanAll();
  });

  it('dispatches success action when updateCustomerAccountCard succeeds', () => {
    const store = mockStore({});

    return store.dispatch(updateCustomerAccountCard())
      .then(() => {
        const actions = store.getActions();
        expect(actions[0]).to.have.property('type', ACCOUNT_UPDATE_CUSTOMER_ACCOUNT_CARD_BEGIN);
        expect(actions[1]).to.have.property('type', ACCOUNT_UPDATE_CUSTOMER_ACCOUNT_CARD_SUCCESS);
      });
  });

  it('dispatches failure action when updateCustomerAccountCard fails', () => {
    const store = mockStore({});

    return store.dispatch(updateCustomerAccountCard({ error: true }))
      .catch(() => {
        const actions = store.getActions();
        expect(actions[0]).to.have.property('type', ACCOUNT_UPDATE_CUSTOMER_ACCOUNT_CARD_BEGIN);
        expect(actions[1]).to.have.property('type', ACCOUNT_UPDATE_CUSTOMER_ACCOUNT_CARD_FAILURE);
        expect(actions[1]).to.have.nested.property('data.error').that.exist;
      });
  });

  it('returns correct action by dismissUpdateCustomerAccountCardError', () => {
    const expectedAction = {
      type: ACCOUNT_UPDATE_CUSTOMER_ACCOUNT_CARD_DISMISS_ERROR,
    };
    expect(dismissUpdateCustomerAccountCardError()).to.deep.equal(expectedAction);
  });

  it('handles action type ACCOUNT_UPDATE_CUSTOMER_ACCOUNT_CARD_BEGIN correctly', () => {
    const prevState = { updateCustomerAccountCardPending: false };
    const state = reducer(
      prevState,
      { type: ACCOUNT_UPDATE_CUSTOMER_ACCOUNT_CARD_BEGIN }
    );
    expect(state).to.not.equal(prevState); // should be immutable
    expect(state.updateCustomerAccountCardPending).to.be.true;
  });

  it('handles action type ACCOUNT_UPDATE_CUSTOMER_ACCOUNT_CARD_SUCCESS correctly', () => {
    const prevState = { updateCustomerAccountCardPending: true };
    const state = reducer(
      prevState,
      { type: ACCOUNT_UPDATE_CUSTOMER_ACCOUNT_CARD_SUCCESS, data: {} }
    );
    expect(state).to.not.equal(prevState); // should be immutable
    expect(state.updateCustomerAccountCardPending).to.be.false;
  });

  it('handles action type ACCOUNT_UPDATE_CUSTOMER_ACCOUNT_CARD_FAILURE correctly', () => {
    const prevState = { updateCustomerAccountCardPending: true };
    const state = reducer(
      prevState,
      { type: ACCOUNT_UPDATE_CUSTOMER_ACCOUNT_CARD_FAILURE, data: { error: new Error('some error') } }
    );
    expect(state).to.not.equal(prevState); // should be immutable
    expect(state.updateCustomerAccountCardPending).to.be.false;
    expect(state.updateCustomerAccountCardError).to.exist;
  });

  it('handles action type ACCOUNT_UPDATE_CUSTOMER_ACCOUNT_CARD_DISMISS_ERROR correctly', () => {
    const prevState = { updateCustomerAccountCardError: new Error('some error') };
    const state = reducer(
      prevState,
      { type: ACCOUNT_UPDATE_CUSTOMER_ACCOUNT_CARD_DISMISS_ERROR }
    );
    expect(state).to.not.equal(prevState); // should be immutable
    expect(state.updateCustomerAccountCardError).to.be.null;
  });
});
