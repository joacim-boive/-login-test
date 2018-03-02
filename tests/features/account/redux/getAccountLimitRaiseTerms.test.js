import configureMockStore from 'redux-mock-store';
import thunk from 'redux-thunk';
import nock from 'nock';
import { expect } from 'chai';

import {
  ACCOUNT_GET_ACCOUNT_LIMIT_RAISE_TERMS_BEGIN,
  ACCOUNT_GET_ACCOUNT_LIMIT_RAISE_TERMS_SUCCESS,
  ACCOUNT_GET_ACCOUNT_LIMIT_RAISE_TERMS_FAILURE,
  ACCOUNT_GET_ACCOUNT_LIMIT_RAISE_TERMS_DISMISS_ERROR,
} from 'src/features/account/redux/constants';

import {
  getAccountLimitRaiseTerms,
  dismissGetAccountLimitRaiseTermsError,
  reducer,
} from 'src/features/account/redux/getAccountLimitRaiseTerms';

const middlewares = [thunk];
const mockStore = configureMockStore(middlewares);

describe('account/redux/getAccountLimitRaiseTerms', () => {
  afterEach(() => {
    nock.cleanAll();
  });

  it('dispatches success action when getAccountLimitRaiseTerms succeeds', () => {
    const store = mockStore({});

    return store.dispatch(getAccountLimitRaiseTerms())
      .then(() => {
        const actions = store.getActions();
        expect(actions[0]).to.have.property('type', ACCOUNT_GET_ACCOUNT_LIMIT_RAISE_TERMS_BEGIN);
        expect(actions[1]).to.have.property('type', ACCOUNT_GET_ACCOUNT_LIMIT_RAISE_TERMS_SUCCESS);
      });
  });

  it('dispatches failure action when getAccountLimitRaiseTerms fails', () => {
    const store = mockStore({});

    return store.dispatch(getAccountLimitRaiseTerms({ error: true }))
      .catch(() => {
        const actions = store.getActions();
        expect(actions[0]).to.have.property('type', ACCOUNT_GET_ACCOUNT_LIMIT_RAISE_TERMS_BEGIN);
        expect(actions[1]).to.have.property('type', ACCOUNT_GET_ACCOUNT_LIMIT_RAISE_TERMS_FAILURE);
        expect(actions[1]).to.have.nested.property('data.error').that.exist;
      });
  });

  it('returns correct action by dismissGetAccountLimitRaiseTermsError', () => {
    const expectedAction = {
      type: ACCOUNT_GET_ACCOUNT_LIMIT_RAISE_TERMS_DISMISS_ERROR,
    };
    expect(dismissGetAccountLimitRaiseTermsError()).to.deep.equal(expectedAction);
  });

  it('handles action type ACCOUNT_GET_ACCOUNT_LIMIT_RAISE_TERMS_BEGIN correctly', () => {
    const prevState = { getAccountLimitRaiseTermsPending: false };
    const state = reducer(
      prevState,
      { type: ACCOUNT_GET_ACCOUNT_LIMIT_RAISE_TERMS_BEGIN }
    );
    expect(state).to.not.equal(prevState); // should be immutable
    expect(state.getAccountLimitRaiseTermsPending).to.be.true;
  });

  it('handles action type ACCOUNT_GET_ACCOUNT_LIMIT_RAISE_TERMS_SUCCESS correctly', () => {
    const prevState = { getAccountLimitRaiseTermsPending: true };
    const state = reducer(
      prevState,
      { type: ACCOUNT_GET_ACCOUNT_LIMIT_RAISE_TERMS_SUCCESS, data: {} }
    );
    expect(state).to.not.equal(prevState); // should be immutable
    expect(state.getAccountLimitRaiseTermsPending).to.be.false;
  });

  it('handles action type ACCOUNT_GET_ACCOUNT_LIMIT_RAISE_TERMS_FAILURE correctly', () => {
    const prevState = { getAccountLimitRaiseTermsPending: true };
    const state = reducer(
      prevState,
      { type: ACCOUNT_GET_ACCOUNT_LIMIT_RAISE_TERMS_FAILURE, data: { error: new Error('some error') } }
    );
    expect(state).to.not.equal(prevState); // should be immutable
    expect(state.getAccountLimitRaiseTermsPending).to.be.false;
    expect(state.getAccountLimitRaiseTermsError).to.exist;
  });

  it('handles action type ACCOUNT_GET_ACCOUNT_LIMIT_RAISE_TERMS_DISMISS_ERROR correctly', () => {
    const prevState = { getAccountLimitRaiseTermsError: new Error('some error') };
    const state = reducer(
      prevState,
      { type: ACCOUNT_GET_ACCOUNT_LIMIT_RAISE_TERMS_DISMISS_ERROR }
    );
    expect(state).to.not.equal(prevState); // should be immutable
    expect(state.getAccountLimitRaiseTermsError).to.be.null;
  });
});
