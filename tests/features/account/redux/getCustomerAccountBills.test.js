import configureMockStore from 'redux-mock-store';
import thunk from 'redux-thunk';
import nock from 'nock';
import { expect } from 'chai';

import {
  ACCOUNT_GET_ACCOUNT_BILLS_BEGIN,
  ACCOUNT_GET_ACCOUNT_BILLS_SUCCESS,
  ACCOUNT_GET_ACCOUNT_BILLS_FAILURE,
  ACCOUNT_GET_ACCOUNT_BILLS_DISMISS_ERROR,
} from 'src/features/account/redux/constants';

import {
  getAccountBills,
  dismissGetCustomerAccountBillsError,
  reducer,
} from 'src/features/account/redux/getAccountBills';

const middlewares = [thunk];
const mockStore = configureMockStore(middlewares);

describe('account/redux/getCustomerAccountBills', () => {
  afterEach(() => {
    nock.cleanAll();
  });

  it('dispatches success action when getCustomerAccountBills succeeds', () => {
    const store = mockStore({});

    return store.dispatch(getAccountBills())
      .then(() => {
        const actions = store.getActions();
        expect(actions[0]).to.have.property('type', ACCOUNT_GET_ACCOUNT_BILLS_BEGIN);
        expect(actions[1]).to.have.property('type', ACCOUNT_GET_ACCOUNT_BILLS_SUCCESS);
      });
  });

  it('dispatches failure action when getCustomerAccountBills fails', () => {
    const store = mockStore({});

    return store.dispatch(getAccountBills({ error: true }))
      .catch(() => {
        const actions = store.getActions();
        expect(actions[0]).to.have.property('type', ACCOUNT_GET_ACCOUNT_BILLS_BEGIN);
        expect(actions[1]).to.have.property('type', ACCOUNT_GET_ACCOUNT_BILLS_FAILURE);
        expect(actions[1]).to.have.nested.property('data.error').that.exist;
      });
  });

  it('returns correct action by dismissGetCustomerAccountBillsError', () => {
    const expectedAction = {
      type: ACCOUNT_GET_ACCOUNT_BILLS_DISMISS_ERROR,
    };
    expect(dismissGetCustomerAccountBillsError()).to.deep.equal(expectedAction);
  });

  it('handles action type ACCOUNT_GET_ACCOUNT_BILLS_BEGIN correctly', () => {
    const prevState = { getCustomerAccountBillsPending: false };
    const state = reducer(
      prevState,
      { type: ACCOUNT_GET_ACCOUNT_BILLS_BEGIN }
    );
    expect(state).to.not.equal(prevState); // should be immutable
    expect(state.getCustomerAccountBillsPending).to.be.true;
  });

  it('handles action type ACCOUNT_GET_ACCOUNT_BILLS_SUCCESS correctly', () => {
    const prevState = { getCustomerAccountBillsPending: true };
    const state = reducer(
      prevState,
      { type: ACCOUNT_GET_ACCOUNT_BILLS_SUCCESS, data: {} }
    );
    expect(state).to.not.equal(prevState); // should be immutable
    expect(state.getCustomerAccountBillsPending).to.be.false;
  });

  it('handles action type ACCOUNT_GET_ACCOUNT_BILLS_FAILURE correctly', () => {
    const prevState = { getCustomerAccountBillsPending: true };
    const state = reducer(
      prevState,
      { type: ACCOUNT_GET_ACCOUNT_BILLS_FAILURE, data: { error: new Error('some error') } }
    );
    expect(state).to.not.equal(prevState); // should be immutable
    expect(state.getCustomerAccountBillsPending).to.be.false;
    expect(state.getCustomerAccountBillsError).to.exist;
  });

  it('handles action type ACCOUNT_GET_ACCOUNT_BILLS_DISMISS_ERROR correctly', () => {
    const prevState = { getCustomerAccountBillsError: new Error('some error') };
    const state = reducer(
      prevState,
      { type: ACCOUNT_GET_ACCOUNT_BILLS_DISMISS_ERROR }
    );
    expect(state).to.not.equal(prevState); // should be immutable
    expect(state.getCustomerAccountBillsError).to.be.null;
  });
});
