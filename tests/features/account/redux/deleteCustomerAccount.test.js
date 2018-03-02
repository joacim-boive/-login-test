import configureMockStore from 'redux-mock-store';
import thunk from 'redux-thunk';
import nock from 'nock';
import { expect } from 'chai';

import {
  ACCOUNT_DELETE_CUSTOMER_ACCOUNT_BEGIN,
  ACCOUNT_DELETE_CUSTOMER_ACCOUNT_SUCCESS,
  ACCOUNT_DELETE_CUSTOMER_ACCOUNT_FAILURE,
  ACCOUNT_DELETE_CUSTOMER_ACCOUNT_DISMISS_ERROR,
} from 'src/features/account/redux/constants';

import {
  deleteCustomerAccount,
  dismissDeleteCustomerAccountError,
  reducer,
} from 'src/features/account/redux/deleteCustomerAccount';

const middlewares = [thunk];
const mockStore = configureMockStore(middlewares);

describe('account/redux/deleteCustomerAccount', () => {
  afterEach(() => {
    nock.cleanAll();
  });

  it('dispatches success action when deleteCustomerAccount succeeds', () => {
    const store = mockStore({});

    return store.dispatch(deleteCustomerAccount())
      .then(() => {
        const actions = store.getActions();
        expect(actions[0]).to.have.property('type', ACCOUNT_DELETE_CUSTOMER_ACCOUNT_BEGIN);
        expect(actions[1]).to.have.property('type', ACCOUNT_DELETE_CUSTOMER_ACCOUNT_SUCCESS);
      });
  });

  it('dispatches failure action when deleteCustomerAccount fails', () => {
    const store = mockStore({});

    return store.dispatch(deleteCustomerAccount({ error: true }))
      .catch(() => {
        const actions = store.getActions();
        expect(actions[0]).to.have.property('type', ACCOUNT_DELETE_CUSTOMER_ACCOUNT_BEGIN);
        expect(actions[1]).to.have.property('type', ACCOUNT_DELETE_CUSTOMER_ACCOUNT_FAILURE);
        expect(actions[1]).to.have.nested.property('data.error').that.exist;
      });
  });

  it('returns correct action by dismissDeleteCustomerAccountError', () => {
    const expectedAction = {
      type: ACCOUNT_DELETE_CUSTOMER_ACCOUNT_DISMISS_ERROR,
    };
    expect(dismissDeleteCustomerAccountError()).to.deep.equal(expectedAction);
  });

  it('handles action type ACCOUNT_DELETE_CUSTOMER_ACCOUNT_BEGIN correctly', () => {
    const prevState = { deleteCustomerAccountPending: false };
    const state = reducer(
      prevState,
      { type: ACCOUNT_DELETE_CUSTOMER_ACCOUNT_BEGIN }
    );
    expect(state).to.not.equal(prevState); // should be immutable
    expect(state.deleteCustomerAccountPending).to.be.true;
  });

  it('handles action type ACCOUNT_DELETE_CUSTOMER_ACCOUNT_SUCCESS correctly', () => {
    const prevState = { deleteCustomerAccountPending: true };
    const state = reducer(
      prevState,
      { type: ACCOUNT_DELETE_CUSTOMER_ACCOUNT_SUCCESS, data: {} }
    );
    expect(state).to.not.equal(prevState); // should be immutable
    expect(state.deleteCustomerAccountPending).to.be.false;
  });

  it('handles action type ACCOUNT_DELETE_CUSTOMER_ACCOUNT_FAILURE correctly', () => {
    const prevState = { deleteCustomerAccountPending: true };
    const state = reducer(
      prevState,
      { type: ACCOUNT_DELETE_CUSTOMER_ACCOUNT_FAILURE, data: { error: new Error('some error') } }
    );
    expect(state).to.not.equal(prevState); // should be immutable
    expect(state.deleteCustomerAccountPending).to.be.false;
    expect(state.deleteCustomerAccountError).to.exist;
  });

  it('handles action type ACCOUNT_DELETE_CUSTOMER_ACCOUNT_DISMISS_ERROR correctly', () => {
    const prevState = { deleteCustomerAccountError: new Error('some error') };
    const state = reducer(
      prevState,
      { type: ACCOUNT_DELETE_CUSTOMER_ACCOUNT_DISMISS_ERROR }
    );
    expect(state).to.not.equal(prevState); // should be immutable
    expect(state.deleteCustomerAccountError).to.be.null;
  });
});
