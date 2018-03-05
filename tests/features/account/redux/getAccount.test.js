import configureMockStore from 'redux-mock-store';
import thunk from 'redux-thunk';
import nock from 'nock';
import { expect } from 'chai';

import {
  ACCOUNT_GET_ACCOUNT_BEGIN,
  ACCOUNT_GET_ACCOUNT_SUCCESS,
  ACCOUNT_GET_ACCOUNT_FAILURE,
  ACCOUNT_GET_ACCOUNT_DISMISS_ERROR,
} from 'src/features/account/redux/constants';

import {
  getAccount,
  dismissGetAccountError,
  reducer,
} from 'src/features/account/redux/getAccount';

const middlewares = [thunk];
const mockStore = configureMockStore(middlewares);

describe('account/redux/getAccount', () => {
  afterEach(() => {
    nock.cleanAll();
  });

  it('dispatches success action when getAccount succeeds', () => {
    const store = mockStore({});

    return store.dispatch(getAccount())
      .then(() => {
        const actions = store.getActions();
        expect(actions[0]).to.have.property('type', ACCOUNT_GET_ACCOUNT_BEGIN);
        expect(actions[1]).to.have.property('type', ACCOUNT_GET_ACCOUNT_SUCCESS);
      });
  });

  it('dispatches failure action when getAccount fails', () => {
    const store = mockStore({});

    return store.dispatch(getAccount({ error: true }))
      .catch(() => {
        const actions = store.getActions();
        expect(actions[0]).to.have.property('type', ACCOUNT_GET_ACCOUNT_BEGIN);
        expect(actions[1]).to.have.property('type', ACCOUNT_GET_ACCOUNT_FAILURE);
        expect(actions[1]).to.have.nested.property('data.error').that.exist;
      });
  });

  it('returns correct action by dismissGetAccountError', () => {
    const expectedAction = {
      type: ACCOUNT_GET_ACCOUNT_DISMISS_ERROR,
    };
    expect(dismissGetAccountError()).to.deep.equal(expectedAction);
  });

  it('handles action type ACCOUNT_GET_ACCOUNT_BEGIN correctly', () => {
    const prevState = { getAccountPending: false };
    const state = reducer(
      prevState,
      { type: ACCOUNT_GET_ACCOUNT_BEGIN }
    );
    expect(state).to.not.equal(prevState); // should be immutable
    expect(state.getAccountPending).to.be.true;
  });

  it('handles action type ACCOUNT_GET_ACCOUNT_SUCCESS correctly', () => {
    const prevState = { getAccountPending: true };
    const state = reducer(
      prevState,
      { type: ACCOUNT_GET_ACCOUNT_SUCCESS, data: {} }
    );
    expect(state).to.not.equal(prevState); // should be immutable
    expect(state.getAccountPending).to.be.false;
  });

  it('handles action type ACCOUNT_GET_ACCOUNT_FAILURE correctly', () => {
    const prevState = { getAccountPending: true };
    const state = reducer(
      prevState,
      { type: ACCOUNT_GET_ACCOUNT_FAILURE, data: { error: new Error('some error') } }
    );
    expect(state).to.not.equal(prevState); // should be immutable
    expect(state.getAccountPending).to.be.false;
    expect(state.getAccountError).to.exist;
  });

  it('handles action type ACCOUNT_GET_ACCOUNT_DISMISS_ERROR correctly', () => {
    const prevState = { getAccountError: new Error('some error') };
    const state = reducer(
      prevState,
      { type: ACCOUNT_GET_ACCOUNT_DISMISS_ERROR }
    );
    expect(state).to.not.equal(prevState); // should be immutable
    expect(state.getAccountError).to.be.null;
  });
});
