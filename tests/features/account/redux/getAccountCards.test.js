import configureMockStore from 'redux-mock-store';
import thunk from 'redux-thunk';
import nock from 'nock';
import { expect } from 'chai';

import {
  ACCOUNT_GET_ACCOUNT_CARDS_BEGIN,
  ACCOUNT_GET_ACCOUNT_CARDS_SUCCESS,
  ACCOUNT_GET_ACCOUNT_CARDS_FAILURE,
  ACCOUNT_GET_ACCOUNT_CARDS_DISMISS_ERROR,
} from 'src/features/account/redux/constants';

import {
  getAccountCards,
  dismissGetAccountCardsError,
  reducer,
} from 'src/features/account/redux/getAccountCards';

const middlewares = [thunk];
const mockStore = configureMockStore(middlewares);

describe('account/redux/getAccountCards', () => {
  afterEach(() => {
    nock.cleanAll();
  });

  it('dispatches success action when getAccountCards succeeds', () => {
    const store = mockStore({});

    return store.dispatch(getAccountCards())
      .then(() => {
        const actions = store.getActions();
        expect(actions[0]).to.have.property('type', ACCOUNT_GET_ACCOUNT_CARDS_BEGIN);
        expect(actions[1]).to.have.property('type', ACCOUNT_GET_ACCOUNT_CARDS_SUCCESS);
      });
  });

  it('dispatches failure action when getAccountCards fails', () => {
    const store = mockStore({});

    return store.dispatch(getAccountCards({ error: true }))
      .catch(() => {
        const actions = store.getActions();
        expect(actions[0]).to.have.property('type', ACCOUNT_GET_ACCOUNT_CARDS_BEGIN);
        expect(actions[1]).to.have.property('type', ACCOUNT_GET_ACCOUNT_CARDS_FAILURE);
        expect(actions[1]).to.have.nested.property('data.error').that.exist;
      });
  });

  it('returns correct action by dismissGetAccountCardsError', () => {
    const expectedAction = {
      type: ACCOUNT_GET_ACCOUNT_CARDS_DISMISS_ERROR,
    };
    expect(dismissGetAccountCardsError()).to.deep.equal(expectedAction);
  });

  it('handles action type ACCOUNT_GET_ACCOUNT_CARDS_BEGIN correctly', () => {
    const prevState = { getAccountCardsPending: false };
    const state = reducer(
      prevState,
      { type: ACCOUNT_GET_ACCOUNT_CARDS_BEGIN }
    );
    expect(state).to.not.equal(prevState); // should be immutable
    expect(state.getAccountCardsPending).to.be.true;
  });

  it('handles action type ACCOUNT_GET_ACCOUNT_CARDS_SUCCESS correctly', () => {
    const prevState = { getAccountCardsPending: true };
    const state = reducer(
      prevState,
      { type: ACCOUNT_GET_ACCOUNT_CARDS_SUCCESS, data: {} }
    );
    expect(state).to.not.equal(prevState); // should be immutable
    expect(state.getAccountCardsPending).to.be.false;
  });

  it('handles action type ACCOUNT_GET_ACCOUNT_CARDS_FAILURE correctly', () => {
    const prevState = { getAccountCardsPending: true };
    const state = reducer(
      prevState,
      { type: ACCOUNT_GET_ACCOUNT_CARDS_FAILURE, data: { error: new Error('some error') } }
    );
    expect(state).to.not.equal(prevState); // should be immutable
    expect(state.getAccountCardsPending).to.be.false;
    expect(state.getAccountCardsError).to.exist;
  });

  it('handles action type ACCOUNT_GET_ACCOUNT_CARDS_DISMISS_ERROR correctly', () => {
    const prevState = { getAccountCardsError: new Error('some error') };
    const state = reducer(
      prevState,
      { type: ACCOUNT_GET_ACCOUNT_CARDS_DISMISS_ERROR }
    );
    expect(state).to.not.equal(prevState); // should be immutable
    expect(state.getAccountCardsError).to.be.null;
  });
});
