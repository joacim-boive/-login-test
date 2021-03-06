import configureMockStore from 'redux-mock-store';
import thunk from 'redux-thunk';
import nock from 'nock';
import { expect } from 'chai';

import {
  ACCOUNT_UPDATE_ACCOUNT_CARD_BEGIN,
  ACCOUNT_UPDATE_ACCOUNT_CARD_SUCCESS,
  ACCOUNT_UPDATE_ACCOUNT_CARD_FAILURE,
  ACCOUNT_UPDATE_ACCOUNT_CARD_DISMISS_ERROR,
} from 'src/features/account/redux/constants';

import {
  updateAccountCard,
  dismissUpdateAccountCardError,
  reducer,
} from 'src/features/account/redux/updateAccountCard';

const middlewares = [thunk];
const mockStore = configureMockStore(middlewares);

describe('account/redux/updateAccountCard', () => {
  afterEach(() => {
    nock.cleanAll();
  });

  it('dispatches success action when updateAccountCard succeeds', () => {
    const store = mockStore({});

    return store.dispatch(updateAccountCard())
      .then(() => {
        const actions = store.getActions();
        expect(actions[0]).to.have.property('type', ACCOUNT_UPDATE_ACCOUNT_CARD_BEGIN);
        expect(actions[1]).to.have.property('type', ACCOUNT_UPDATE_ACCOUNT_CARD_SUCCESS);
      });
  });

  it('dispatches failure action when updateAccountCard fails', () => {
    const store = mockStore({});

    return store.dispatch(updateAccountCard({ error: true }))
      .catch(() => {
        const actions = store.getActions();
        expect(actions[0]).to.have.property('type', ACCOUNT_UPDATE_ACCOUNT_CARD_BEGIN);
        expect(actions[1]).to.have.property('type', ACCOUNT_UPDATE_ACCOUNT_CARD_FAILURE);
        expect(actions[1]).to.have.nested.property('data.error').that.exist;
      });
  });

  it('returns correct action by dismissUpdateAccountCardError', () => {
    const expectedAction = {
      type: ACCOUNT_UPDATE_ACCOUNT_CARD_DISMISS_ERROR,
    };
    expect(dismissUpdateAccountCardError()).to.deep.equal(expectedAction);
  });

  it('handles action type ACCOUNT_UPDATE_ACCOUNT_CARD_BEGIN correctly', () => {
    const prevState = { updateAccountCardPending: false };
    const state = reducer(
      prevState,
      { type: ACCOUNT_UPDATE_ACCOUNT_CARD_BEGIN }
    );
    expect(state).to.not.equal(prevState); // should be immutable
    expect(state.updateAccountCardPending).to.be.true;
  });

  it('handles action type ACCOUNT_UPDATE_ACCOUNT_CARD_SUCCESS correctly', () => {
    const prevState = { updateAccountCardPending: true };
    const state = reducer(
      prevState,
      { type: ACCOUNT_UPDATE_ACCOUNT_CARD_SUCCESS, data: {} }
    );
    expect(state).to.not.equal(prevState); // should be immutable
    expect(state.updateAccountCardPending).to.be.false;
  });

  it('handles action type ACCOUNT_UPDATE_ACCOUNT_CARD_FAILURE correctly', () => {
    const prevState = { updateAccountCardPending: true };
    const state = reducer(
      prevState,
      { type: ACCOUNT_UPDATE_ACCOUNT_CARD_FAILURE, data: { error: new Error('some error') } }
    );
    expect(state).to.not.equal(prevState); // should be immutable
    expect(state.updateAccountCardPending).to.be.false;
    expect(state.updateAccountCardError).to.exist;
  });

  it('handles action type ACCOUNT_UPDATE_ACCOUNT_CARD_DISMISS_ERROR correctly', () => {
    const prevState = { updateAccountCardError: new Error('some error') };
    const state = reducer(
      prevState,
      { type: ACCOUNT_UPDATE_ACCOUNT_CARD_DISMISS_ERROR }
    );
    expect(state).to.not.equal(prevState); // should be immutable
    expect(state.updateAccountCardError).to.be.null;
  });
});
