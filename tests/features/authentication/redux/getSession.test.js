import configureMockStore from 'redux-mock-store';
import thunk from 'redux-thunk';
import nock from 'nock';
import { expect } from 'chai';

import {
  AUTHENTICATION_GET_SESSION_BEGIN,
  AUTHENTICATION_GET_SESSION_SUCCESS,
  AUTHENTICATION_GET_SESSION_FAILURE,
  AUTHENTICATION_GET_SESSION_DISMISS_ERROR,
} from 'src/features/authentication/redux/constants';

import {
  getSession,
  dismissGetSessionError,
  reducer,
} from 'src/features/authentication/redux/getSession';

const middlewares = [thunk];
const mockStore = configureMockStore(middlewares);

describe('authentication/redux/getSession', () => {
  afterEach(() => {
    nock.cleanAll();
  });

  it('dispatches success action when getSession succeeds', () => {
    const store = mockStore({});

    return store.dispatch(getSession())
      .then(() => {
        const actions = store.getActions();
        expect(actions[0]).to.have.property('type', AUTHENTICATION_GET_SESSION_BEGIN);
        expect(actions[1]).to.have.property('type', AUTHENTICATION_GET_SESSION_SUCCESS);
      });
  });

  it('dispatches failure action when getSession fails', () => {
    const store = mockStore({});

    return store.dispatch(getSession({ error: true }))
      .catch(() => {
        const actions = store.getActions();
        expect(actions[0]).to.have.property('type', AUTHENTICATION_GET_SESSION_BEGIN);
        expect(actions[1]).to.have.property('type', AUTHENTICATION_GET_SESSION_FAILURE);
        expect(actions[1]).to.have.nested.property('data.error').that.exist;
      });
  });

  it('returns correct action by dismissGetSessionError', () => {
    const expectedAction = {
      type: AUTHENTICATION_GET_SESSION_DISMISS_ERROR,
    };
    expect(dismissGetSessionError()).to.deep.equal(expectedAction);
  });

  it('handles action type AUTHENTICATION_GET_SESSION_BEGIN correctly', () => {
    const prevState = { getSessionPending: false };
    const state = reducer(
      prevState,
      { type: AUTHENTICATION_GET_SESSION_BEGIN }
    );
    expect(state).to.not.equal(prevState); // should be immutable
    expect(state.getSessionPending).to.be.true;
  });

  it('handles action type AUTHENTICATION_GET_SESSION_SUCCESS correctly', () => {
    const prevState = { getSessionPending: true };
    const state = reducer(
      prevState,
      { type: AUTHENTICATION_GET_SESSION_SUCCESS, data: {} }
    );
    expect(state).to.not.equal(prevState); // should be immutable
    expect(state.getSessionPending).to.be.false;
  });

  it('handles action type AUTHENTICATION_GET_SESSION_FAILURE correctly', () => {
    const prevState = { getSessionPending: true };
    const state = reducer(
      prevState,
      { type: AUTHENTICATION_GET_SESSION_FAILURE, data: { error: new Error('some error') } }
    );
    expect(state).to.not.equal(prevState); // should be immutable
    expect(state.getSessionPending).to.be.false;
    expect(state.getSessionError).to.exist;
  });

  it('handles action type AUTHENTICATION_GET_SESSION_DISMISS_ERROR correctly', () => {
    const prevState = { getSessionError: new Error('some error') };
    const state = reducer(
      prevState,
      { type: AUTHENTICATION_GET_SESSION_DISMISS_ERROR }
    );
    expect(state).to.not.equal(prevState); // should be immutable
    expect(state.getSessionError).to.be.null;
  });
});
