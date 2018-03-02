import configureMockStore from 'redux-mock-store';
import thunk from 'redux-thunk';
import nock from 'nock';
import { expect } from 'chai';

import {
  ACCOUNT_GET_CUSTOMER_ACCOUNT_BEGIN,
  ACCOUNT_GET_CUSTOMER_ACCOUNT_SUCCESS,
  ACCOUNT_GET_CUSTOMER_ACCOUNT_FAILURE,
  ACCOUNT_GET_CUSTOMER_ACCOUNT_DISMISS_ERROR,
} from 'src/features/account/redux/constants';

import {
  getCustomerAccount,
  dismissGetCustomerAccountError,
  reducer,
} from 'src/features/account/redux/getCustomerAccount';

const middlewares = [thunk];
const mockStore = configureMockStore(middlewares);

describe('account/redux/getCustomerAccount', () => {
  afterEach(() => {
    nock.cleanAll();
  });

  it('dispatches success action when getCustomerAccount succeeds', () => {
    const store = mockStore({});

    return store.dispatch(getCustomerAccount())
      .then(() => {
        const actions = store.getActions();
        expect(actions[0]).to.have.property('type', ACCOUNT_GET_CUSTOMER_ACCOUNT_BEGIN);
        expect(actions[1]).to.have.property('type', ACCOUNT_GET_CUSTOMER_ACCOUNT_SUCCESS);
      });
  });

  it('dispatches failure action when getCustomerAccount fails', () => {
    const store = mockStore({});

    return store.dispatch(getCustomerAccount({ error: true }))
      .catch(() => {
        const actions = store.getActions();
        expect(actions[0]).to.have.property('type', ACCOUNT_GET_CUSTOMER_ACCOUNT_BEGIN);
        expect(actions[1]).to.have.property('type', ACCOUNT_GET_CUSTOMER_ACCOUNT_FAILURE);
        expect(actions[1]).to.have.nested.property('data.error').that.exist;
      });
  });

  it('returns correct action by dismissGetCustomerAccountError', () => {
    const expectedAction = {
      type: ACCOUNT_GET_CUSTOMER_ACCOUNT_DISMISS_ERROR,
    };
    expect(dismissGetCustomerAccountError()).to.deep.equal(expectedAction);
  });

  it('handles action type ACCOUNT_GET_CUSTOMER_ACCOUNT_BEGIN correctly', () => {
    const prevState = { getCustomerAccountPending: false };
    const state = reducer(
      prevState,
      { type: ACCOUNT_GET_CUSTOMER_ACCOUNT_BEGIN }
    );
    expect(state).to.not.equal(prevState); // should be immutable
    expect(state.getCustomerAccountPending).to.be.true;
  });

  it('handles action type ACCOUNT_GET_CUSTOMER_ACCOUNT_SUCCESS correctly', () => {
    const prevState = { getCustomerAccountPending: true };
    const state = reducer(
      prevState,
      { type: ACCOUNT_GET_CUSTOMER_ACCOUNT_SUCCESS, data: {} }
    );
    expect(state).to.not.equal(prevState); // should be immutable
    expect(state.getCustomerAccountPending).to.be.false;
  });

  it('handles action type ACCOUNT_GET_CUSTOMER_ACCOUNT_FAILURE correctly', () => {
    const prevState = { getCustomerAccountPending: true };
    const state = reducer(
      prevState,
      { type: ACCOUNT_GET_CUSTOMER_ACCOUNT_FAILURE, data: { error: new Error('some error') } }
    );
    expect(state).to.not.equal(prevState); // should be immutable
    expect(state.getCustomerAccountPending).to.be.false;
    expect(state.getCustomerAccountError).to.exist;
  });

  it('handles action type ACCOUNT_GET_CUSTOMER_ACCOUNT_DISMISS_ERROR correctly', () => {
    const prevState = { getCustomerAccountError: new Error('some error') };
    const state = reducer(
      prevState,
      { type: ACCOUNT_GET_CUSTOMER_ACCOUNT_DISMISS_ERROR }
    );
    expect(state).to.not.equal(prevState); // should be immutable
    expect(state.getCustomerAccountError).to.be.null;
  });
});
