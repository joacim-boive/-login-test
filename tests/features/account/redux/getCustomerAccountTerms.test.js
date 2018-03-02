import configureMockStore from 'redux-mock-store';
import thunk from 'redux-thunk';
import nock from 'nock';
import { expect } from 'chai';

import {
  ACCOUNT_GET_CUSTOMER_ACCOUNT_TERMS_BEGIN,
  ACCOUNT_GET_CUSTOMER_ACCOUNT_TERMS_SUCCESS,
  ACCOUNT_GET_CUSTOMER_ACCOUNT_TERMS_FAILURE,
  ACCOUNT_GET_CUSTOMER_ACCOUNT_TERMS_DISMISS_ERROR,
} from 'src/features/account/redux/constants';

import {
  getCustomerAccountTerms,
  dismissGetCustomerAccountTermsError,
  reducer,
} from 'src/features/account/redux/getCustomerAccountTerms';

const middlewares = [thunk];
const mockStore = configureMockStore(middlewares);

describe('account/redux/getCustomerAccountTerms', () => {
  afterEach(() => {
    nock.cleanAll();
  });

  it('dispatches success action when getCustomerAccountTerms succeeds', () => {
    const store = mockStore({});

    return store.dispatch(getCustomerAccountTerms())
      .then(() => {
        const actions = store.getActions();
        expect(actions[0]).to.have.property('type', ACCOUNT_GET_CUSTOMER_ACCOUNT_TERMS_BEGIN);
        expect(actions[1]).to.have.property('type', ACCOUNT_GET_CUSTOMER_ACCOUNT_TERMS_SUCCESS);
      });
  });

  it('dispatches failure action when getCustomerAccountTerms fails', () => {
    const store = mockStore({});

    return store.dispatch(getCustomerAccountTerms({ error: true }))
      .catch(() => {
        const actions = store.getActions();
        expect(actions[0]).to.have.property('type', ACCOUNT_GET_CUSTOMER_ACCOUNT_TERMS_BEGIN);
        expect(actions[1]).to.have.property('type', ACCOUNT_GET_CUSTOMER_ACCOUNT_TERMS_FAILURE);
        expect(actions[1]).to.have.nested.property('data.error').that.exist;
      });
  });

  it('returns correct action by dismissGetCustomerAccountTermsError', () => {
    const expectedAction = {
      type: ACCOUNT_GET_CUSTOMER_ACCOUNT_TERMS_DISMISS_ERROR,
    };
    expect(dismissGetCustomerAccountTermsError()).to.deep.equal(expectedAction);
  });

  it('handles action type ACCOUNT_GET_CUSTOMER_ACCOUNT_TERMS_BEGIN correctly', () => {
    const prevState = { getCustoemrAccountTermsPending: false };
    const state = reducer(
      prevState,
      { type: ACCOUNT_GET_CUSTOMER_ACCOUNT_TERMS_BEGIN }
    );
    expect(state).to.not.equal(prevState); // should be immutable
    expect(state.getCustoemrAccountTermsPending).to.be.true;
  });

  it('handles action type ACCOUNT_GET_CUSTOMER_ACCOUNT_TERMS_SUCCESS correctly', () => {
    const prevState = { getCustoemrAccountTermsPending: true };
    const state = reducer(
      prevState,
      { type: ACCOUNT_GET_CUSTOMER_ACCOUNT_TERMS_SUCCESS, data: {} }
    );
    expect(state).to.not.equal(prevState); // should be immutable
    expect(state.getCustoemrAccountTermsPending).to.be.false;
  });

  it('handles action type ACCOUNT_GET_CUSTOMER_ACCOUNT_TERMS_FAILURE correctly', () => {
    const prevState = { getCustoemrAccountTermsPending: true };
    const state = reducer(
      prevState,
      { type: ACCOUNT_GET_CUSTOMER_ACCOUNT_TERMS_FAILURE, data: { error: new Error('some error') } }
    );
    expect(state).to.not.equal(prevState); // should be immutable
    expect(state.getCustoemrAccountTermsPending).to.be.false;
    expect(state.getCustoemrAccountTermsError).to.exist;
  });

  it('handles action type ACCOUNT_GET_CUSTOMER_ACCOUNT_TERMS_DISMISS_ERROR correctly', () => {
    const prevState = { getCustoemrAccountTermsError: new Error('some error') };
    const state = reducer(
      prevState,
      { type: ACCOUNT_GET_CUSTOMER_ACCOUNT_TERMS_DISMISS_ERROR }
    );
    expect(state).to.not.equal(prevState); // should be immutable
    expect(state.getCustoemrAccountTermsError).to.be.null;
  });
});
