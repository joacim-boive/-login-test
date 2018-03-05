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
  dismissGetAccountBillsError,
  reducer,
} from 'src/features/account/redux/getAccountBills';

const middlewares = [thunk];
const mockStore = configureMockStore(middlewares);

describe('account/redux/getAccountBills', () => {
  afterEach(() => {
    nock.cleanAll();
  });

  it('dispatches success action when getAccountBills succeeds', () => {
    const store = mockStore({});

    return store.dispatch(getAccountBills())
      .then(() => {
        const actions = store.getActions();
        expect(actions[0]).to.have.property('type', ACCOUNT_GET_ACCOUNT_BILLS_BEGIN);
        expect(actions[1]).to.have.property('type', ACCOUNT_GET_ACCOUNT_BILLS_SUCCESS);
      });
  });

  it('dispatches failure action when getAccountBills fails', () => {
    const store = mockStore({});

    return store.dispatch(getAccountBills({ error: true }))
      .catch(() => {
        const actions = store.getActions();
        expect(actions[0]).to.have.property('type', ACCOUNT_GET_ACCOUNT_BILLS_BEGIN);
        expect(actions[1]).to.have.property('type', ACCOUNT_GET_ACCOUNT_BILLS_FAILURE);
        expect(actions[1]).to.have.nested.property('data.error').that.exist;
      });
  });

  it('returns correct action by dismissGetAccountBillsError', () => {
    const expectedAction = {
      type: ACCOUNT_GET_ACCOUNT_BILLS_DISMISS_ERROR,
    };
    expect(dismissGetAccountBillsError()).to.deep.equal(expectedAction);
  });

  it('handles action type ACCOUNT_GET_ACCOUNT_BILLS_BEGIN correctly', () => {
    const prevState = { getAccountBillsPending: false };
    const state = reducer(
      prevState,
      { type: ACCOUNT_GET_ACCOUNT_BILLS_BEGIN }
    );
    expect(state).to.not.equal(prevState); // should be immutable
    expect(state.getAccountBillsPending).to.be.true;
  });

  it('handles action type ACCOUNT_GET_ACCOUNT_BILLS_SUCCESS correctly', () => {
    const prevState = { getAccountBillsPending: true };
    const state = reducer(
      prevState,
      { type: ACCOUNT_GET_ACCOUNT_BILLS_SUCCESS, data: {} }
    );
    expect(state).to.not.equal(prevState); // should be immutable
    expect(state.getAccountBillsPending).to.be.false;
  });

  it('handles action type ACCOUNT_GET_ACCOUNT_BILLS_FAILURE correctly', () => {
    const prevState = { getAccountBillsPending: true };
    const state = reducer(
      prevState,
      { type: ACCOUNT_GET_ACCOUNT_BILLS_FAILURE, data: { error: new Error('some error') } }
    );
    expect(state).to.not.equal(prevState); // should be immutable
    expect(state.getAccountBillsPending).to.be.false;
    expect(state.getAccountBillsError).to.exist;
  });

  it('handles action type ACCOUNT_GET_ACCOUNT_BILLS_DISMISS_ERROR correctly', () => {
    const prevState = { getAccountBillsError: new Error('some error') };
    const state = reducer(
      prevState,
      { type: ACCOUNT_GET_ACCOUNT_BILLS_DISMISS_ERROR }
    );
    expect(state).to.not.equal(prevState); // should be immutable
    expect(state.getAccountBillsError).to.be.null;
  });
});
