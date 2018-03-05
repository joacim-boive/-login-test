import configureMockStore from 'redux-mock-store';
import thunk from 'redux-thunk';
import nock from 'nock';
import { expect } from 'chai';

import {
  ACCOUNT_UPDATE_ACCOUNT_TRANSACTION_PART_PAYMENT_BEGIN,
  ACCOUNT_UPDATE_ACCOUNT_TRANSACTION_PART_PAYMENT_SUCCESS,
  ACCOUNT_UPDATE_ACCOUNT_TRANSACTION_PART_PAYMENT_FAILURE,
  ACCOUNT_UPDATE_ACCOUNT_TRANSACTION_PART_PAYMENT_DISMISS_ERROR,
} from 'src/features/account/redux/constants';

import {
  updateAccountTransactionPartPayment,
  dismissUpdateAccountTransactionPartPaymentError,
  reducer,
} from 'src/features/account/redux/updateAccountTransactionPartPayment';

const middlewares = [thunk];
const mockStore = configureMockStore(middlewares);

describe('account/redux/updateAccountTransactionPartPayment', () => {
  afterEach(() => {
    nock.cleanAll();
  });

  it('dispatches success action when updateAccountTransactionPartPayment succeeds', () => {
    const store = mockStore({});

    return store.dispatch(updateAccountTransactionPartPayment())
      .then(() => {
        const actions = store.getActions();
        expect(actions[0]).to.have.property('type', ACCOUNT_UPDATE_ACCOUNT_TRANSACTION_PART_PAYMENT_BEGIN);
        expect(actions[1]).to.have.property('type', ACCOUNT_UPDATE_ACCOUNT_TRANSACTION_PART_PAYMENT_SUCCESS);
      });
  });

  it('dispatches failure action when updateAccountTransactionPartPayment fails', () => {
    const store = mockStore({});

    return store.dispatch(updateAccountTransactionPartPayment({ error: true }))
      .catch(() => {
        const actions = store.getActions();
        expect(actions[0]).to.have.property('type', ACCOUNT_UPDATE_ACCOUNT_TRANSACTION_PART_PAYMENT_BEGIN);
        expect(actions[1]).to.have.property('type', ACCOUNT_UPDATE_ACCOUNT_TRANSACTION_PART_PAYMENT_FAILURE);
        expect(actions[1]).to.have.nested.property('data.error').that.exist;
      });
  });

  it('returns correct action by dismissUpdateAccountTransactionPartPaymentError', () => {
    const expectedAction = {
      type: ACCOUNT_UPDATE_ACCOUNT_TRANSACTION_PART_PAYMENT_DISMISS_ERROR,
    };
    expect(dismissUpdateAccountTransactionPartPaymentError()).to.deep.equal(expectedAction);
  });

  it('handles action type ACCOUNT_UPDATE_ACCOUNT_TRANSACTION_PART_PAYMENT_BEGIN correctly', () => {
    const prevState = { updateAccountTransactionPartPaymentPending: false };
    const state = reducer(
      prevState,
      { type: ACCOUNT_UPDATE_ACCOUNT_TRANSACTION_PART_PAYMENT_BEGIN }
    );
    expect(state).to.not.equal(prevState); // should be immutable
    expect(state.updateAccountTransactionPartPaymentPending).to.be.true;
  });

  it('handles action type ACCOUNT_UPDATE_ACCOUNT_TRANSACTION_PART_PAYMENT_SUCCESS correctly', () => {
    const prevState = { updateAccountTransactionPartPaymentPending: true };
    const state = reducer(
      prevState,
      { type: ACCOUNT_UPDATE_ACCOUNT_TRANSACTION_PART_PAYMENT_SUCCESS, data: {} }
    );
    expect(state).to.not.equal(prevState); // should be immutable
    expect(state.updateAccountTransactionPartPaymentPending).to.be.false;
  });

  it('handles action type ACCOUNT_UPDATE_ACCOUNT_TRANSACTION_PART_PAYMENT_FAILURE correctly', () => {
    const prevState = { updateAccountTransactionPartPaymentPending: true };
    const state = reducer(
      prevState,
      { type: ACCOUNT_UPDATE_ACCOUNT_TRANSACTION_PART_PAYMENT_FAILURE, data: { error: new Error('some error') } }
    );
    expect(state).to.not.equal(prevState); // should be immutable
    expect(state.updateAccountTransactionPartPaymentPending).to.be.false;
    expect(state.updateAccountTransactionPartPaymentError).to.exist;
  });

  it('handles action type ACCOUNT_UPDATE_ACCOUNT_TRANSACTION_PART_PAYMENT_DISMISS_ERROR correctly', () => {
    const prevState = { updateAccountTransactionPartPaymentError: new Error('some error') };
    const state = reducer(
      prevState,
      { type: ACCOUNT_UPDATE_ACCOUNT_TRANSACTION_PART_PAYMENT_DISMISS_ERROR }
    );
    expect(state).to.not.equal(prevState); // should be immutable
    expect(state.updateAccountTransactionPartPaymentError).to.be.null;
  });
});
