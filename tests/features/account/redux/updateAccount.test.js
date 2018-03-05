import configureMockStore from 'redux-mock-store';
import thunk from 'redux-thunk';
import nock from 'nock';
import { expect } from 'chai';

import {
  ACCOUNT_UPDATE_ACCOUNT_BEGIN,
  ACCOUNT_UPDATE_ACCOUNT_SUCCESS,
  ACCOUNT_UPDATE_ACCOUNT_FAILURE,
  ACCOUNT_UPDATE_ACCOUNT_DISMISS_ERROR,
} from 'src/features/account/redux/constants';

import {
  updateAccount,
  dismissUpdateAccountError,
  reducer,
} from 'src/features/account/redux/updateAccount';

const middlewares = [thunk];
const mockStore = configureMockStore(middlewares);

describe('account/redux/updateAccount', () => {
  afterEach(() => {
    nock.cleanAll();
  });

  it('dispatches success action when updateAccount succeeds', () => {
    const store = mockStore({});

    return store.dispatch(updateAccount())
      .then(() => {
        const actions = store.getActions();
        expect(actions[0]).to.have.property('type', ACCOUNT_UPDATE_ACCOUNT_BEGIN);
        expect(actions[1]).to.have.property('type', ACCOUNT_UPDATE_ACCOUNT_SUCCESS);
      });
  });

  it('dispatches failure action when updateAccount fails', () => {
    const store = mockStore({});

    return store.dispatch(updateAccount({ error: true }))
      .catch(() => {
        const actions = store.getActions();
        expect(actions[0]).to.have.property('type', ACCOUNT_UPDATE_ACCOUNT_BEGIN);
        expect(actions[1]).to.have.property('type', ACCOUNT_UPDATE_ACCOUNT_FAILURE);
        expect(actions[1]).to.have.nested.property('data.error').that.exist;
      });
  });

  it('returns correct action by dismissUpdateAccountError', () => {
    const expectedAction = {
      type: ACCOUNT_UPDATE_ACCOUNT_DISMISS_ERROR,
    };
    expect(dismissUpdateAccountError()).to.deep.equal(expectedAction);
  });

  it('handles action type ACCOUNT_UPDATE_ACCOUNT_BEGIN correctly', () => {
    const prevState = { updateAccountPending: false };
    const state = reducer(
      prevState,
      { type: ACCOUNT_UPDATE_ACCOUNT_BEGIN }
    );
    expect(state).to.not.equal(prevState); // should be immutable
    expect(state.updateAccountPending).to.be.true;
  });

  it('handles action type ACCOUNT_UPDATE_ACCOUNT_SUCCESS correctly', () => {
    const prevState = { updateAccountPending: true };
    const state = reducer(
      prevState,
      { type: ACCOUNT_UPDATE_ACCOUNT_SUCCESS, data: {} }
    );
    expect(state).to.not.equal(prevState); // should be immutable
    expect(state.updateAccountPending).to.be.false;
  });

  it('handles action type ACCOUNT_UPDATE_ACCOUNT_FAILURE correctly', () => {
    const prevState = { updateAccountPending: true };
    const state = reducer(
      prevState,
      { type: ACCOUNT_UPDATE_ACCOUNT_FAILURE, data: { error: new Error('some error') } }
    );
    expect(state).to.not.equal(prevState); // should be immutable
    expect(state.updateAccountPending).to.be.false;
    expect(state.updateAccountError).to.exist;
  });

  it('handles action type ACCOUNT_UPDATE_ACCOUNT_DISMISS_ERROR correctly', () => {
    const prevState = { updateAccountError: new Error('some error') };
    const state = reducer(
      prevState,
      { type: ACCOUNT_UPDATE_ACCOUNT_DISMISS_ERROR }
    );
    expect(state).to.not.equal(prevState); // should be immutable
    expect(state.updateAccountError).to.be.null;
  });
});
