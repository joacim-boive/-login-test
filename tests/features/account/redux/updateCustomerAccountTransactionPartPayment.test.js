import configureMockStore from 'redux-mock-store';
import thunk from 'redux-thunk';
import nock from 'nock';
import { expect } from 'chai';

import {
  ACCOUNT_UPDATE_CUSTOMER_ACCOUNT_TRANSACTION_PART_PAYMENT_BEGIN,
  ACCOUNT_UPDATE_CUSTOMER_ACCOUNT_TRANSACTION_PART_PAYMENT_SUCCESS,
  ACCOUNT_UPDATE_CUSTOMER_ACCOUNT_TRANSACTION_PART_PAYMENT_FAILURE,
  ACCOUNT_UPDATE_CUSTOMER_ACCOUNT_TRANSACTION_PART_PAYMENT_DISMISS_ERROR,
} from 'src/features/account/redux/constants';

import {
  updateCustomerAccountTransactionPartPayment,
  dismissUpdateCustomerAccountTransactionPartPaymentError,
  reducer,
} from 'src/features/account/redux/updateCustomerAccountTransactionPartPayment';

const middlewares = [thunk];
const mockStore = configureMockStore(middlewares);

describe('account/redux/updateCustomerAccountTransactionPartPayment', () => {
  afterEach(() => {
    nock.cleanAll();
  });

  it('dispatches success action when updateCustomerAccountTransactionPartPayment succeeds', () => {
    const store = mockStore({});

    return store.dispatch(updateCustomerAccountTransactionPartPayment())
      .then(() => {
        const actions = store.getActions();
        expect(actions[0]).to.have.property('type', ACCOUNT_UPDATE_CUSTOMER_ACCOUNT_TRANSACTION_PART_PAYMENT_BEGIN);
        expect(actions[1]).to.have.property('type', ACCOUNT_UPDATE_CUSTOMER_ACCOUNT_TRANSACTION_PART_PAYMENT_SUCCESS);
      });
  });

  it('dispatches failure action when updateCustomerAccountTransactionPartPayment fails', () => {
    const store = mockStore({});

    return store.dispatch(updateCustomerAccountTransactionPartPayment({ error: true }))
      .catch(() => {
        const actions = store.getActions();
        expect(actions[0]).to.have.property('type', ACCOUNT_UPDATE_CUSTOMER_ACCOUNT_TRANSACTION_PART_PAYMENT_BEGIN);
        expect(actions[1]).to.have.property('type', ACCOUNT_UPDATE_CUSTOMER_ACCOUNT_TRANSACTION_PART_PAYMENT_FAILURE);
        expect(actions[1]).to.have.nested.property('data.error').that.exist;
      });
  });

  it('returns correct action by dismissUpdateCustomerAccountTransactionPartPaymentError', () => {
    const expectedAction = {
      type: ACCOUNT_UPDATE_CUSTOMER_ACCOUNT_TRANSACTION_PART_PAYMENT_DISMISS_ERROR,
    };
    expect(dismissUpdateCustomerAccountTransactionPartPaymentError()).to.deep.equal(expectedAction);
  });

  it('handles action type ACCOUNT_UPDATE_CUSTOMER_ACCOUNT_TRANSACTION_PART_PAYMENT_BEGIN correctly', () => {
    const prevState = { updateCustomerAccountTransactionPartPaymentPending: false };
    const state = reducer(
      prevState,
      { type: ACCOUNT_UPDATE_CUSTOMER_ACCOUNT_TRANSACTION_PART_PAYMENT_BEGIN }
    );
    expect(state).to.not.equal(prevState); // should be immutable
    expect(state.updateCustomerAccountTransactionPartPaymentPending).to.be.true;
  });

  it('handles action type ACCOUNT_UPDATE_CUSTOMER_ACCOUNT_TRANSACTION_PART_PAYMENT_SUCCESS correctly', () => {
    const prevState = { updateCustomerAccountTransactionPartPaymentPending: true };
    const state = reducer(
      prevState,
      { type: ACCOUNT_UPDATE_CUSTOMER_ACCOUNT_TRANSACTION_PART_PAYMENT_SUCCESS, data: {} }
    );
    expect(state).to.not.equal(prevState); // should be immutable
    expect(state.updateCustomerAccountTransactionPartPaymentPending).to.be.false;
  });

  it('handles action type ACCOUNT_UPDATE_CUSTOMER_ACCOUNT_TRANSACTION_PART_PAYMENT_FAILURE correctly', () => {
    const prevState = { updateCustomerAccountTransactionPartPaymentPending: true };
    const state = reducer(
      prevState,
      { type: ACCOUNT_UPDATE_CUSTOMER_ACCOUNT_TRANSACTION_PART_PAYMENT_FAILURE, data: { error: new Error('some error') } }
    );
    expect(state).to.not.equal(prevState); // should be immutable
    expect(state.updateCustomerAccountTransactionPartPaymentPending).to.be.false;
    expect(state.updateCustomerAccountTransactionPartPaymentError).to.exist;
  });

  it('handles action type ACCOUNT_UPDATE_CUSTOMER_ACCOUNT_TRANSACTION_PART_PAYMENT_DISMISS_ERROR correctly', () => {
    const prevState = { updateCustomerAccountTransactionPartPaymentError: new Error('some error') };
    const state = reducer(
      prevState,
      { type: ACCOUNT_UPDATE_CUSTOMER_ACCOUNT_TRANSACTION_PART_PAYMENT_DISMISS_ERROR }
    );
    expect(state).to.not.equal(prevState); // should be immutable
    expect(state.updateCustomerAccountTransactionPartPaymentError).to.be.null;
  });
});
