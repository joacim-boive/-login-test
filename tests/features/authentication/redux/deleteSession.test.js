import configureMockStore from 'redux-mock-store';
import thunk from 'redux-thunk';
import nock from 'nock';
import { expect } from 'chai';

import {
  AUTHENTICATION_DELETE_SESSION_BEGIN,
  AUTHENTICATION_DELETE_SESSION_SUCCESS,
  AUTHENTICATION_DELETE_SESSION_FAILURE,
  AUTHENTICATION_DELETE_SESSION_DISMISS_ERROR,
} from 'src/features/authentication/redux/constants';

import {
  deleteSession,
  dismissDeleteSessionError,
  reducer,
} from 'src/features/authentication/redux/deleteSession';

const middlewares = [thunk];
const mockStore = configureMockStore(middlewares);

describe('authentication/redux/deleteSession', () => {
  afterEach(() => {
    nock.cleanAll();
  });

  it('dispatches success action when deleteSession succeeds', () => {
    const store = mockStore({});

    return store.dispatch(deleteSession())
      .then(() => {
        const actions = store.getActions();
        expect(actions[0]).to.have.property('type', AUTHENTICATION_DELETE_SESSION_BEGIN);
        expect(actions[1]).to.have.property('type', AUTHENTICATION_DELETE_SESSION_SUCCESS);
      });
  });

  it('dispatches failure action when deleteSession fails', () => {
    const store = mockStore({});

    return store.dispatch(deleteSession({ error: true }))
      .catch(() => {
        const actions = store.getActions();
        expect(actions[0]).to.have.property('type', AUTHENTICATION_DELETE_SESSION_BEGIN);
        expect(actions[1]).to.have.property('type', AUTHENTICATION_DELETE_SESSION_FAILURE);
        expect(actions[1]).to.have.nested.property('data.error').that.exist;
      });
  });

  it('returns correct action by dismissDeleteSessionError', () => {
    const expectedAction = {
      type: AUTHENTICATION_DELETE_SESSION_DISMISS_ERROR,
    };
    expect(dismissDeleteSessionError()).to.deep.equal(expectedAction);
  });

  it('handles action type AUTHENTICATION_DELETE_SESSION_BEGIN correctly', () => {
    const prevState = { deleteSessionPending: false };
    const state = reducer(
      prevState,
      { type: AUTHENTICATION_DELETE_SESSION_BEGIN }
    );
    expect(state).to.not.equal(prevState); // should be immutable
    expect(state.deleteSessionPending).to.be.true;
  });

  it('handles action type AUTHENTICATION_DELETE_SESSION_SUCCESS correctly', () => {
    const prevState = { deleteSessionPending: true };
    const state = reducer(
      prevState,
      { type: AUTHENTICATION_DELETE_SESSION_SUCCESS, data: {} }
    );
    expect(state).to.not.equal(prevState); // should be immutable
    expect(state.deleteSessionPending).to.be.false;
  });

  it('handles action type AUTHENTICATION_DELETE_SESSION_FAILURE correctly', () => {
    const prevState = { deleteSessionPending: true };
    const state = reducer(
      prevState,
      { type: AUTHENTICATION_DELETE_SESSION_FAILURE, data: { error: new Error('some error') } }
    );
    expect(state).to.not.equal(prevState); // should be immutable
    expect(state.deleteSessionPending).to.be.false;
    expect(state.deleteSessionError).to.exist;
  });

  it('handles action type AUTHENTICATION_DELETE_SESSION_DISMISS_ERROR correctly', () => {
    const prevState = { deleteSessionError: new Error('some error') };
    const state = reducer(
      prevState,
      { type: AUTHENTICATION_DELETE_SESSION_DISMISS_ERROR }
    );
    expect(state).to.not.equal(prevState); // should be immutable
    expect(state.deleteSessionError).to.be.null;
  });
});
