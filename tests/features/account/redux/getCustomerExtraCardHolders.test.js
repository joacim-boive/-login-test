import configureMockStore from 'redux-mock-store';
import thunk from 'redux-thunk';
import nock from 'nock';
import { expect } from 'chai';

import {
  ACCOUNT_GET_CUSTOMER_EXTRA_CARD_HOLDERS_BEGIN,
  ACCOUNT_GET_CUSTOMER_EXTRA_CARD_HOLDERS_SUCCESS,
  ACCOUNT_GET_CUSTOMER_EXTRA_CARD_HOLDERS_FAILURE,
  ACCOUNT_GET_CUSTOMER_EXTRA_CARD_HOLDERS_DISMISS_ERROR,
} from 'src/features/account/redux/constants';

import {
  getCustomerExtraCardHolders,
  dismissGetCustomerExtraCardHoldersError,
  reducer,
} from 'src/features/account/redux/getCustomerExtraCardHolders';

const middlewares = [thunk];
const mockStore = configureMockStore(middlewares);

describe('account/redux/getCustomerExtraCardHolders', () => {
  afterEach(() => {
    nock.cleanAll();
  });

  it('dispatches success action when getCustomerExtraCardHolders succeeds', () => {
    const store = mockStore({});

    return store.dispatch(getCustomerExtraCardHolders())
      .then(() => {
        const actions = store.getActions();
        expect(actions[0]).to.have.property('type', ACCOUNT_GET_CUSTOMER_EXTRA_CARD_HOLDERS_BEGIN);
        expect(actions[1]).to.have.property('type', ACCOUNT_GET_CUSTOMER_EXTRA_CARD_HOLDERS_SUCCESS);
      });
  });

  it('dispatches failure action when getCustomerExtraCardHolders fails', () => {
    const store = mockStore({});

    return store.dispatch(getCustomerExtraCardHolders({ error: true }))
      .catch(() => {
        const actions = store.getActions();
        expect(actions[0]).to.have.property('type', ACCOUNT_GET_CUSTOMER_EXTRA_CARD_HOLDERS_BEGIN);
        expect(actions[1]).to.have.property('type', ACCOUNT_GET_CUSTOMER_EXTRA_CARD_HOLDERS_FAILURE);
        expect(actions[1]).to.have.nested.property('data.error').that.exist;
      });
  });

  it('returns correct action by dismissGetCustomerExtraCardHoldersError', () => {
    const expectedAction = {
      type: ACCOUNT_GET_CUSTOMER_EXTRA_CARD_HOLDERS_DISMISS_ERROR,
    };
    expect(dismissGetCustomerExtraCardHoldersError()).to.deep.equal(expectedAction);
  });

  it('handles action type ACCOUNT_GET_CUSTOMER_EXTRA_CARD_HOLDERS_BEGIN correctly', () => {
    const prevState = { getCustomerExtraCardHoldersPending: false };
    const state = reducer(
      prevState,
      { type: ACCOUNT_GET_CUSTOMER_EXTRA_CARD_HOLDERS_BEGIN }
    );
    expect(state).to.not.equal(prevState); // should be immutable
    expect(state.getCustomerExtraCardHoldersPending).to.be.true;
  });

  it('handles action type ACCOUNT_GET_CUSTOMER_EXTRA_CARD_HOLDERS_SUCCESS correctly', () => {
    const prevState = { getCustomerExtraCardHoldersPending: true };
    const state = reducer(
      prevState,
      { type: ACCOUNT_GET_CUSTOMER_EXTRA_CARD_HOLDERS_SUCCESS, data: {} }
    );
    expect(state).to.not.equal(prevState); // should be immutable
    expect(state.getCustomerExtraCardHoldersPending).to.be.false;
  });

  it('handles action type ACCOUNT_GET_CUSTOMER_EXTRA_CARD_HOLDERS_FAILURE correctly', () => {
    const prevState = { getCustomerExtraCardHoldersPending: true };
    const state = reducer(
      prevState,
      { type: ACCOUNT_GET_CUSTOMER_EXTRA_CARD_HOLDERS_FAILURE, data: { error: new Error('some error') } }
    );
    expect(state).to.not.equal(prevState); // should be immutable
    expect(state.getCustomerExtraCardHoldersPending).to.be.false;
    expect(state.getCustomerExtraCardHoldersError).to.exist;
  });

  it('handles action type ACCOUNT_GET_CUSTOMER_EXTRA_CARD_HOLDERS_DISMISS_ERROR correctly', () => {
    const prevState = { getCustomerExtraCardHoldersError: new Error('some error') };
    const state = reducer(
      prevState,
      { type: ACCOUNT_GET_CUSTOMER_EXTRA_CARD_HOLDERS_DISMISS_ERROR }
    );
    expect(state).to.not.equal(prevState); // should be immutable
    expect(state.getCustomerExtraCardHoldersError).to.be.null;
  });
});
