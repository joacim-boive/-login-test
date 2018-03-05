import configureMockStore from 'redux-mock-store';
import thunk from 'redux-thunk';
import nock from 'nock';
import { expect } from 'chai';

import {
  ACCOUNT_GET_ACCOUNT_ALLOWED_PART_PAYMENTS_BEGIN,
  ACCOUNT_GET_ACCOUNT_ALLOWED_PART_PAYMENTS_SUCCESS,
  ACCOUNT_GET_ACCOUNT_ALLOWED_PART_PAYMENTS_FAILURE,
  ACCOUNT_GET_ACCOUNT_ALLOWED_PART_PAYMENTS_DISMISS_ERROR,
} from 'src/features/account/redux/constants';

import {
  getAccountAllowedPartPayments,
  dismissGetAccountAllowedPartPaymentsError,
  reducer,
} from 'src/features/account/redux/getAccountAllowedPartPayments';

const middlewares = [thunk];
const mockStore = configureMockStore(middlewares);

describe('account/redux/getAccountAllowedPartPayments', () => {
  afterEach(() => {
    nock.cleanAll();
  });

  it('dispatches success action when getAccountAllowedPartPayments succeeds', () => {
    const store = mockStore({});

    return store.dispatch(getAccountAllowedPartPayments())
      .then(() => {
        const actions = store.getActions();
        expect(actions[0]).to.have.property('type', ACCOUNT_GET_ACCOUNT_ALLOWED_PART_PAYMENTS_BEGIN);
        expect(actions[1]).to.have.property('type', ACCOUNT_GET_ACCOUNT_ALLOWED_PART_PAYMENTS_SUCCESS);
      });
  });

  it('dispatches failure action when getAccountAllowedPartPayments fails', () => {
    const store = mockStore({});

    return store.dispatch(getAccountAllowedPartPayments({ error: true }))
      .catch(() => {
        const actions = store.getActions();
        expect(actions[0]).to.have.property('type', ACCOUNT_GET_ACCOUNT_ALLOWED_PART_PAYMENTS_BEGIN);
        expect(actions[1]).to.have.property('type', ACCOUNT_GET_ACCOUNT_ALLOWED_PART_PAYMENTS_FAILURE);
        expect(actions[1]).to.have.nested.property('data.error').that.exist;
      });
  });

  it('returns correct action by dismissGetAccountAllowedPartPaymentsError', () => {
    const expectedAction = {
      type: ACCOUNT_GET_ACCOUNT_ALLOWED_PART_PAYMENTS_DISMISS_ERROR,
    };
    expect(dismissGetAccountAllowedPartPaymentsError()).to.deep.equal(expectedAction);
  });

  it('handles action type ACCOUNT_GET_ACCOUNT_ALLOWED_PART_PAYMENTS_BEGIN correctly', () => {
    const prevState = { getAccountAllowedPartPaymentsPending: false };
    const state = reducer(
      prevState,
      { type: ACCOUNT_GET_ACCOUNT_ALLOWED_PART_PAYMENTS_BEGIN }
    );
    expect(state).to.not.equal(prevState); // should be immutable
    expect(state.getAccountAllowedPartPaymentsPending).to.be.true;
  });

  it('handles action type ACCOUNT_GET_ACCOUNT_ALLOWED_PART_PAYMENTS_SUCCESS correctly', () => {
    const prevState = { getAccountAllowedPartPaymentsPending: true };
    const state = reducer(
      prevState,
      { type: ACCOUNT_GET_ACCOUNT_ALLOWED_PART_PAYMENTS_SUCCESS, data: {} }
    );
    expect(state).to.not.equal(prevState); // should be immutable
    expect(state.getAccountAllowedPartPaymentsPending).to.be.false;
  });

  it('handles action type ACCOUNT_GET_ACCOUNT_ALLOWED_PART_PAYMENTS_FAILURE correctly', () => {
    const prevState = { getAccountAllowedPartPaymentsPending: true };
    const state = reducer(
      prevState,
      { type: ACCOUNT_GET_ACCOUNT_ALLOWED_PART_PAYMENTS_FAILURE, data: { error: new Error('some error') } }
    );
    expect(state).to.not.equal(prevState); // should be immutable
    expect(state.getAccountAllowedPartPaymentsPending).to.be.false;
    expect(state.getAccountAllowedPartPaymentsError).to.exist;
  });

  it('handles action type ACCOUNT_GET_ACCOUNT_ALLOWED_PART_PAYMENTS_DISMISS_ERROR correctly', () => {
    const prevState = { getAccountAllowedPartPaymentsError: new Error('some error') };
    const state = reducer(
      prevState,
      { type: ACCOUNT_GET_ACCOUNT_ALLOWED_PART_PAYMENTS_DISMISS_ERROR }
    );
    expect(state).to.not.equal(prevState); // should be immutable
    expect(state.getAccountAllowedPartPaymentsError).to.be.null;
  });
});
