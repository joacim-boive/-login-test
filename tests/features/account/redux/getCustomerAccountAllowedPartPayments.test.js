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
  dismissGetCustomerAccountAllowedPartPaymentsError,
  reducer,
} from 'src/features/account/redux/getAccountAllowedPartPayments';

const middlewares = [thunk];
const mockStore = configureMockStore(middlewares);

describe('account/redux/getCustomerAccountAllowedPartPayments', () => {
  afterEach(() => {
    nock.cleanAll();
  });

  it('dispatches success action when getCustomerAccountAllowedPartPayments succeeds', () => {
    const store = mockStore({});

    return store.dispatch(getAccountAllowedPartPayments())
      .then(() => {
        const actions = store.getActions();
        expect(actions[0]).to.have.property('type', ACCOUNT_GET_ACCOUNT_ALLOWED_PART_PAYMENTS_BEGIN);
        expect(actions[1]).to.have.property('type', ACCOUNT_GET_ACCOUNT_ALLOWED_PART_PAYMENTS_SUCCESS);
      });
  });

  it('dispatches failure action when getCustomerAccountAllowedPartPayments fails', () => {
    const store = mockStore({});

    return store.dispatch(getAccountAllowedPartPayments({ error: true }))
      .catch(() => {
        const actions = store.getActions();
        expect(actions[0]).to.have.property('type', ACCOUNT_GET_ACCOUNT_ALLOWED_PART_PAYMENTS_BEGIN);
        expect(actions[1]).to.have.property('type', ACCOUNT_GET_ACCOUNT_ALLOWED_PART_PAYMENTS_FAILURE);
        expect(actions[1]).to.have.nested.property('data.error').that.exist;
      });
  });

  it('returns correct action by dismissGetCustomerAccountAllowedPartPaymentsError', () => {
    const expectedAction = {
      type: ACCOUNT_GET_ACCOUNT_ALLOWED_PART_PAYMENTS_DISMISS_ERROR,
    };
    expect(dismissGetCustomerAccountAllowedPartPaymentsError()).to.deep.equal(expectedAction);
  });

  it('handles action type ACCOUNT_GET_ACCOUNT_ALLOWED_PART_PAYMENTS_BEGIN correctly', () => {
    const prevState = { getCustomerAccountAllowedPartPaymentsPending: false };
    const state = reducer(
      prevState,
      { type: ACCOUNT_GET_ACCOUNT_ALLOWED_PART_PAYMENTS_BEGIN }
    );
    expect(state).to.not.equal(prevState); // should be immutable
    expect(state.getCustomerAccountAllowedPartPaymentsPending).to.be.true;
  });

  it('handles action type ACCOUNT_GET_ACCOUNT_ALLOWED_PART_PAYMENTS_SUCCESS correctly', () => {
    const prevState = { getCustomerAccountAllowedPartPaymentsPending: true };
    const state = reducer(
      prevState,
      { type: ACCOUNT_GET_ACCOUNT_ALLOWED_PART_PAYMENTS_SUCCESS, data: {} }
    );
    expect(state).to.not.equal(prevState); // should be immutable
    expect(state.getCustomerAccountAllowedPartPaymentsPending).to.be.false;
  });

  it('handles action type ACCOUNT_GET_ACCOUNT_ALLOWED_PART_PAYMENTS_FAILURE correctly', () => {
    const prevState = { getCustomerAccountAllowedPartPaymentsPending: true };
    const state = reducer(
      prevState,
      { type: ACCOUNT_GET_ACCOUNT_ALLOWED_PART_PAYMENTS_FAILURE, data: { error: new Error('some error') } }
    );
    expect(state).to.not.equal(prevState); // should be immutable
    expect(state.getCustomerAccountAllowedPartPaymentsPending).to.be.false;
    expect(state.getCustomerAccountAllowedPartPaymentsError).to.exist;
  });

  it('handles action type ACCOUNT_GET_ACCOUNT_ALLOWED_PART_PAYMENTS_DISMISS_ERROR correctly', () => {
    const prevState = { getCustomerAccountAllowedPartPaymentsError: new Error('some error') };
    const state = reducer(
      prevState,
      { type: ACCOUNT_GET_ACCOUNT_ALLOWED_PART_PAYMENTS_DISMISS_ERROR }
    );
    expect(state).to.not.equal(prevState); // should be immutable
    expect(state.getCustomerAccountAllowedPartPaymentsError).to.be.null;
  });
});
