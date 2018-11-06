import configureMockStore from 'redux-mock-store';
import thunk from 'redux-thunk';
import nock from 'nock';

import {
  ACCOUNT_CREATE_ACCOUNT_CARD_BEGIN,
  ACCOUNT_CREATE_ACCOUNT_CARD_SUCCESS,
  ACCOUNT_CREATE_ACCOUNT_CARD_FAILURE,
  ACCOUNT_CREATE_ACCOUNT_CARD_DISMISS_ERROR,
} from '../../../../src/features/account/redux/constants';

import {
  createAccountCard,
  dismissCreateAccountCardError,
  reducer,
} from '../../../../src/features/account/redux/createAccountCard';

const middlewares = [thunk];
const mockStore = configureMockStore(middlewares);

describe('account/redux/createAccountCard', () => {
  afterEach(() => {
    nock.cleanAll();
  });

  it('dispatches success action when createAccountCard succeeds', () => {
    const store = mockStore({});

    return store.dispatch(createAccountCard())
      .then(() => {
        const actions = store.getActions();
        expect(actions[0]).toHaveProperty('type', ACCOUNT_CREATE_ACCOUNT_CARD_BEGIN);
        expect(actions[1]).toHaveProperty('type', ACCOUNT_CREATE_ACCOUNT_CARD_SUCCESS);
      });
  });

  it('dispatches failure action when createAccountCard fails', () => {
    const store = mockStore({});

    return store.dispatch(createAccountCard({ error: true }))
      .catch(() => {
        const actions = store.getActions();
        expect(actions[0]).toHaveProperty('type', ACCOUNT_CREATE_ACCOUNT_CARD_BEGIN);
        expect(actions[1]).toHaveProperty('type', ACCOUNT_CREATE_ACCOUNT_CARD_FAILURE);
        expect(actions[1]).toHaveProperty('data.error', expect.anything());
      });
  });

  it('returns correct action by dismissCreateAccountCardError', () => {
    const expectedAction = {
      type: ACCOUNT_CREATE_ACCOUNT_CARD_DISMISS_ERROR,
    };
    expect(dismissCreateAccountCardError()).toEqual(expectedAction);
  });

  it('handles action type ACCOUNT_CREATE_ACCOUNT_CARD_BEGIN correctly', () => {
    const prevState = { createAccountCardPending: false };
    const state = reducer(
      prevState,
      { type: ACCOUNT_CREATE_ACCOUNT_CARD_BEGIN }
    );
    expect(state).not.toBe(prevState); // should be immutable
    expect(state.createAccountCardPending).toBe(true);
  });

  it('handles action type ACCOUNT_CREATE_ACCOUNT_CARD_SUCCESS correctly', () => {
    const prevState = { createAccountCardPending: true };
    const state = reducer(
      prevState,
      { type: ACCOUNT_CREATE_ACCOUNT_CARD_SUCCESS, data: {} }
    );
    expect(state).not.toBe(prevState); // should be immutable
    expect(state.createAccountCardPending).toBe(false);
  });

  it('handles action type ACCOUNT_CREATE_ACCOUNT_CARD_FAILURE correctly', () => {
    const prevState = { createAccountCardPending: true };
    const state = reducer(
      prevState,
      { type: ACCOUNT_CREATE_ACCOUNT_CARD_FAILURE, data: { error: new Error('some error') } }
    );
    expect(state).not.toBe(prevState); // should be immutable
    expect(state.createAccountCardPending).toBe(false);
    expect(state.createAccountCardError).toEqual(expect.anything());
  });

  it('handles action type ACCOUNT_CREATE_ACCOUNT_CARD_DISMISS_ERROR correctly', () => {
    const prevState = { createAccountCardError: new Error('some error') };
    const state = reducer(
      prevState,
      { type: ACCOUNT_CREATE_ACCOUNT_CARD_DISMISS_ERROR }
    );
    expect(state).not.toBe(prevState); // should be immutable
    expect(state.createAccountCardError).toBe(null);
  });
});

