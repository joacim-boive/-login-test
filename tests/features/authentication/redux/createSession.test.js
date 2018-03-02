import configureMockStore from 'redux-mock-store';
import thunk from 'redux-thunk';
import nock from 'nock';
import { expect } from 'chai';

import {
  AUTHENTICATION_CREATE_SESSION_BEGIN,
  AUTHENTICATION_CREATE_SESSION_SUCCESS,
  AUTHENTICATION_CREATE_SESSION_FAILURE,
  AUTHENTICATION_CREATE_SESSION_DISMISS_ERROR,
} from 'src/features/authentication/redux/constants';

import {
  createSession,
  dismissCreateSessionError,
  reducer,
} from 'src/features/authentication/redux/createSession';

const middlewares = [thunk];
const mockStore = configureMockStore(middlewares);

describe('authentication/redux/createSession', () => {
  afterEach(() => {
    nock.cleanAll();
  });

  it('dispatches success action when createSession succeeds', () => {
    const store = mockStore({});

    return store.dispatch(createSession())
      .then(() => {
        const actions = store.getActions();
        expect(actions[0]).to.have.property('type', AUTHENTICATION_CREATE_SESSION_BEGIN);
        expect(actions[1]).to.have.property('type', AUTHENTICATION_CREATE_SESSION_SUCCESS);
      });
  });

  it('dispatches failure action when createSession fails', () => {
    const store = mockStore({});

    return store.dispatch(createSession({ error: true }))
      .catch(() => {
        const actions = store.getActions();
        expect(actions[0]).to.have.property('type', AUTHENTICATION_CREATE_SESSION_BEGIN);
        expect(actions[1]).to.have.property('type', AUTHENTICATION_CREATE_SESSION_FAILURE);
        expect(actions[1]).to.have.nested.property('data.error').that.exist;
      });
  });

  it('returns correct action by dismissCreateSessionError', () => {
    const expectedAction = {
      type: AUTHENTICATION_CREATE_SESSION_DISMISS_ERROR,
    };
    expect(dismissCreateSessionError()).to.deep.equal(expectedAction);
  });

  it('handles action type AUTHENTICATION_CREATE_SESSION_BEGIN correctly', () => {
    const prevState = { createSessionPending: false };
    const state = reducer(
      prevState,
      { type: AUTHENTICATION_CREATE_SESSION_BEGIN }
    );
    expect(state).to.not.equal(prevState); // should be immutable
    expect(state.createSessionPending).to.be.true;
  });

  it('handles action type AUTHENTICATION_CREATE_SESSION_SUCCESS correctly', () => {
    const prevState = { createSessionPending: true };
    const state = reducer(
      prevState,
      { type: AUTHENTICATION_CREATE_SESSION_SUCCESS, data: {} }
    );
    expect(state).to.not.equal(prevState); // should be immutable
    expect(state.createSessionPending).to.be.false;
  });

  it('handles action type AUTHENTICATION_CREATE_SESSION_FAILURE correctly', () => {
    const prevState = { createSessionPending: true };
    const state = reducer(
      prevState,
      { type: AUTHENTICATION_CREATE_SESSION_FAILURE, data: { error: new Error('some error') } }
    );
    expect(state).to.not.equal(prevState); // should be immutable
    expect(state.createSessionPending).to.be.false;
    expect(state.createSessionError).to.exist;
  });

  it('handles action type AUTHENTICATION_CREATE_SESSION_DISMISS_ERROR correctly', () => {
    const prevState = { createSessionError: new Error('some error') };
    const state = reducer(
      prevState,
      { type: AUTHENTICATION_CREATE_SESSION_DISMISS_ERROR }
    );
    expect(state).to.not.equal(prevState); // should be immutable
    expect(state.createSessionError).to.be.null;
  });
});
