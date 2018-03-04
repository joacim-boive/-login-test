import configureMockStore from 'redux-mock-store';
import thunk from 'redux-thunk';
import nock from 'nock';
import { expect } from 'chai';

import {
  ACCOUNT_GET_ACCOUNTS_BEGIN,
  ACCOUNT_GET_ACCOUNTS_SUCCESS,
  ACCOUNT_GET_ACCOUNTS_FAILURE,
  ACCOUNT_GET_ACCOUNTS_DISMISS_ERROR,
} from 'src/features/account/redux/constants';

import {
  getAccounts,
  dismissGetCustomerAccountsError,
  reducer,
} from 'src/features/account/redux/getAccounts';

const middlewares = [thunk];
const mockStore = configureMockStore(middlewares);

describe('account/redux/getCustomerAccounts', () => {
  afterEach(() => {
    nock.cleanAll();
  });

  it('dispatches success action when getCustomerAccounts succeeds', () => {
    const store = mockStore({});

    return store.dispatch(getAccounts())
      .then(() => {
        const actions = store.getActions();
        expect(actions[0]).to.have.property('type', ACCOUNT_GET_ACCOUNTS_BEGIN);
        expect(actions[1]).to.have.property('type', ACCOUNT_GET_ACCOUNTS_SUCCESS);
      });
  });

  it('dispatches failure action when getCustomerAccounts fails', () => {
    const store = mockStore({});

    return store.dispatch(getAccounts({ error: true }))
      .catch(() => {
        const actions = store.getActions();
        expect(actions[0]).to.have.property('type', ACCOUNT_GET_ACCOUNTS_BEGIN);
        expect(actions[1]).to.have.property('type', ACCOUNT_GET_ACCOUNTS_FAILURE);
        expect(actions[1]).to.have.nested.property('data.error').that.exist;
      });
  });

  it('returns correct action by dismissGetCustomerAccountsError', () => {
    const expectedAction = {
      type: ACCOUNT_GET_ACCOUNTS_DISMISS_ERROR,
    };
    expect(dismissGetCustomerAccountsError()).to.deep.equal(expectedAction);
  });

  it('handles action type ACCOUNT_GET_ACCOUNTS_BEGIN correctly', () => {
    const prevState = { getCustomerAccountsPending: false };
    const state = reducer(
      prevState,
      { type: ACCOUNT_GET_ACCOUNTS_BEGIN }
    );
    expect(state).to.not.equal(prevState); // should be immutable
    expect(state.getCustomerAccountsPending).to.be.true;
  });

  it('handles action type ACCOUNT_GET_ACCOUNTS_SUCCESS correctly', () => {
    const prevState = { getCustomerAccountsPending: true };
    const state = reducer(
      prevState,
      { type: ACCOUNT_GET_ACCOUNTS_SUCCESS, data: {} }
    );
    expect(state).to.not.equal(prevState); // should be immutable
    expect(state.getCustomerAccountsPending).to.be.false;
  });

  it('handles action type ACCOUNT_GET_ACCOUNTS_FAILURE correctly', () => {
    const prevState = { getCustomerAccountsPending: true };
    const state = reducer(
      prevState,
      { type: ACCOUNT_GET_ACCOUNTS_FAILURE, data: { error: new Error('some error') } }
    );
    expect(state).to.not.equal(prevState); // should be immutable
    expect(state.getCustomerAccountsPending).to.be.false;
    expect(state.getCustomerAccountsError).to.exist;
  });

  it('handles action type ACCOUNT_GET_ACCOUNTS_DISMISS_ERROR correctly', () => {
    const prevState = { getCustomerAccountsError: new Error('some error') };
    const state = reducer(
      prevState,
      { type: ACCOUNT_GET_ACCOUNTS_DISMISS_ERROR }
    );
    expect(state).to.not.equal(prevState); // should be immutable
    expect(state.getCustomerAccountsError).to.be.null;
  });
});
