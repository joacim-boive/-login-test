import configureMockStore from 'redux-mock-store';
import thunk from 'redux-thunk';
import nock from 'nock';
import { expect } from 'chai';

import {
  ACCOUNT_GET_ACCOUNT_TRANSACTIONS_BEGIN,
  ACCOUNT_GET_ACCOUNT_TRANSACTIONS_SUCCESS,
  ACCOUNT_GET_ACCOUNT_TRANSACTIONS_FAILURE,
  ACCOUNT_GET_ACCOUNT_TRANSACTIONS_DISMISS_ERROR,
} from 'src/features/account/redux/constants';

import {
  getAccountTransactions,
  dismissGetCustomerAccountTransactionsError,
  reducer,
} from 'src/features/account/redux/getAccountTransactions';

const middlewares = [thunk];
const mockStore = configureMockStore(middlewares);

describe('account/redux/getCustomerAccountTransactions', () => {
  afterEach(() => {
    nock.cleanAll();
  });

  it('dispatches success action when getCustomerAccountTransactions succeeds', () => {
    const store = mockStore({});

    return store.dispatch(getAccountTransactions())
      .then(() => {
        const actions = store.getActions();
        expect(actions[0]).to.have.property('type', ACCOUNT_GET_ACCOUNT_TRANSACTIONS_BEGIN);
        expect(actions[1]).to.have.property('type', ACCOUNT_GET_ACCOUNT_TRANSACTIONS_SUCCESS);
      });
  });

  it('dispatches failure action when getCustomerAccountTransactions fails', () => {
    const store = mockStore({});

    return store.dispatch(getAccountTransactions({ error: true }))
      .catch(() => {
        const actions = store.getActions();
        expect(actions[0]).to.have.property('type', ACCOUNT_GET_ACCOUNT_TRANSACTIONS_BEGIN);
        expect(actions[1]).to.have.property('type', ACCOUNT_GET_ACCOUNT_TRANSACTIONS_FAILURE);
        expect(actions[1]).to.have.nested.property('data.error').that.exist;
      });
  });

  it('returns correct action by dismissGetCustomerAccountTransactionsError', () => {
    const expectedAction = {
      type: ACCOUNT_GET_ACCOUNT_TRANSACTIONS_DISMISS_ERROR,
    };
    expect(dismissGetCustomerAccountTransactionsError()).to.deep.equal(expectedAction);
  });

  it('handles action type ACCOUNT_GET_ACCOUNT_TRANSACTIONS_BEGIN correctly', () => {
    const prevState = { getCustomerAccountTransactionsPending: false };
    const state = reducer(
      prevState,
      { type: ACCOUNT_GET_ACCOUNT_TRANSACTIONS_BEGIN }
    );
    expect(state).to.not.equal(prevState); // should be immutable
    expect(state.getCustomerAccountTransactionsPending).to.be.true;
  });

  it('handles action type ACCOUNT_GET_ACCOUNT_TRANSACTIONS_SUCCESS correctly', () => {
    const prevState = { getCustomerAccountTransactionsPending: true };
    const state = reducer(
      prevState,
      { type: ACCOUNT_GET_ACCOUNT_TRANSACTIONS_SUCCESS, data: {} }
    );
    expect(state).to.not.equal(prevState); // should be immutable
    expect(state.getCustomerAccountTransactionsPending).to.be.false;
  });

  it('handles action type ACCOUNT_GET_ACCOUNT_TRANSACTIONS_FAILURE correctly', () => {
    const prevState = { getCustomerAccountTransactionsPending: true };
    const state = reducer(
      prevState,
      { type: ACCOUNT_GET_ACCOUNT_TRANSACTIONS_FAILURE, data: { error: new Error('some error') } }
    );
    expect(state).to.not.equal(prevState); // should be immutable
    expect(state.getCustomerAccountTransactionsPending).to.be.false;
    expect(state.getCustomerAccountTransactionsError).to.exist;
  });

  it('handles action type ACCOUNT_GET_ACCOUNT_TRANSACTIONS_DISMISS_ERROR correctly', () => {
    const prevState = { getCustomerAccountTransactionsError: new Error('some error') };
    const state = reducer(
      prevState,
      { type: ACCOUNT_GET_ACCOUNT_TRANSACTIONS_DISMISS_ERROR }
    );
    expect(state).to.not.equal(prevState); // should be immutable
    expect(state.getCustomerAccountTransactionsError).to.be.null;
  });
});
