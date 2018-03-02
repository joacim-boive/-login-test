import configureMockStore from 'redux-mock-store';
import thunk from 'redux-thunk';
import nock from 'nock';
import { expect } from 'chai';

import {
  ACCOUNT_GET_ACCOUNT_PAYMENT_TERMS_BEGIN,
  ACCOUNT_GET_ACCOUNT_PAYMENT_TERMS_SUCCESS,
  ACCOUNT_GET_ACCOUNT_PAYMENT_TERMS_FAILURE,
  ACCOUNT_GET_ACCOUNT_PAYMENT_TERMS_DISMISS_ERROR,
} from 'src/features/account/redux/constants';

import {
  getAccountPaymentTerms,
  dismissGetAccountPaymentTermsError,
  reducer,
} from 'src/features/account/redux/getAccountPaymentTerms';

const middlewares = [thunk];
const mockStore = configureMockStore(middlewares);

describe('account/redux/getAccountPaymentTerms', () => {
  afterEach(() => {
    nock.cleanAll();
  });

  it('dispatches success action when getAccountPaymentTerms succeeds', () => {
    const store = mockStore({});

    return store.dispatch(getAccountPaymentTerms())
      .then(() => {
        const actions = store.getActions();
        expect(actions[0]).to.have.property('type', ACCOUNT_GET_ACCOUNT_PAYMENT_TERMS_BEGIN);
        expect(actions[1]).to.have.property('type', ACCOUNT_GET_ACCOUNT_PAYMENT_TERMS_SUCCESS);
      });
  });

  it('dispatches failure action when getAccountPaymentTerms fails', () => {
    const store = mockStore({});

    return store.dispatch(getAccountPaymentTerms({ error: true }))
      .catch(() => {
        const actions = store.getActions();
        expect(actions[0]).to.have.property('type', ACCOUNT_GET_ACCOUNT_PAYMENT_TERMS_BEGIN);
        expect(actions[1]).to.have.property('type', ACCOUNT_GET_ACCOUNT_PAYMENT_TERMS_FAILURE);
        expect(actions[1]).to.have.nested.property('data.error').that.exist;
      });
  });

  it('returns correct action by dismissGetAccountPaymentTermsError', () => {
    const expectedAction = {
      type: ACCOUNT_GET_ACCOUNT_PAYMENT_TERMS_DISMISS_ERROR,
    };
    expect(dismissGetAccountPaymentTermsError()).to.deep.equal(expectedAction);
  });

  it('handles action type ACCOUNT_GET_ACCOUNT_PAYMENT_TERMS_BEGIN correctly', () => {
    const prevState = { getAccountPaymentTermsPending: false };
    const state = reducer(
      prevState,
      { type: ACCOUNT_GET_ACCOUNT_PAYMENT_TERMS_BEGIN }
    );
    expect(state).to.not.equal(prevState); // should be immutable
    expect(state.getAccountPaymentTermsPending).to.be.true;
  });

  it('handles action type ACCOUNT_GET_ACCOUNT_PAYMENT_TERMS_SUCCESS correctly', () => {
    const prevState = { getAccountPaymentTermsPending: true };
    const state = reducer(
      prevState,
      { type: ACCOUNT_GET_ACCOUNT_PAYMENT_TERMS_SUCCESS, data: {} }
    );
    expect(state).to.not.equal(prevState); // should be immutable
    expect(state.getAccountPaymentTermsPending).to.be.false;
  });

  it('handles action type ACCOUNT_GET_ACCOUNT_PAYMENT_TERMS_FAILURE correctly', () => {
    const prevState = { getAccountPaymentTermsPending: true };
    const state = reducer(
      prevState,
      { type: ACCOUNT_GET_ACCOUNT_PAYMENT_TERMS_FAILURE, data: { error: new Error('some error') } }
    );
    expect(state).to.not.equal(prevState); // should be immutable
    expect(state.getAccountPaymentTermsPending).to.be.false;
    expect(state.getAccountPaymentTermsError).to.exist;
  });

  it('handles action type ACCOUNT_GET_ACCOUNT_PAYMENT_TERMS_DISMISS_ERROR correctly', () => {
    const prevState = { getAccountPaymentTermsError: new Error('some error') };
    const state = reducer(
      prevState,
      { type: ACCOUNT_GET_ACCOUNT_PAYMENT_TERMS_DISMISS_ERROR }
    );
    expect(state).to.not.equal(prevState); // should be immutable
    expect(state.getAccountPaymentTermsError).to.be.null;
  });
});
