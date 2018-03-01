import configureMockStore from 'redux-mock-store';
import thunk from 'redux-thunk';
import nock from 'nock';
import { expect } from 'chai';

import {
  AUTHENTICATION_GET_SESSION_ASYNC_BEGIN,
  AUTHENTICATION_GET_SESSION_ASYNC_SUCCESS,
  AUTHENTICATION_GET_SESSION_ASYNC_FAILURE,
  AUTHENTICATION_GET_SESSION_ASYNC_DISMISS_ERROR,
} from 'src/features/authentication/redux/constants';

import {
  getSessionAsync,
  dismissGetSessionAsyncError,
  reducer,
} from 'src/features/authentication/redux/getSessionAsync';

const middlewares = [thunk];
const mockStore = configureMockStore(middlewares);

describe('authentication/redux/getSessionAsync', () => {
  afterEach(() => {
    nock.cleanAll();
  });

  it('dispatches success action when getSessionAsync succeeds', () => {
    const store = mockStore({});

    return store.dispatch(getSessionAsync())
      .then(() => {
        const actions = store.getActions();
        expect(actions[0]).to.have.property('type', AUTHENTICATION_GET_SESSION_ASYNC_BEGIN);
        expect(actions[1]).to.have.property('type', AUTHENTICATION_GET_SESSION_ASYNC_SUCCESS);
      });
  });

  it('dispatches failure action when getSessionAsync fails', () => {
    const store = mockStore({});

    return store.dispatch(getSessionAsync({ error: true }))
      .catch(() => {
        const actions = store.getActions();
        expect(actions[0]).to.have.property('type', AUTHENTICATION_GET_SESSION_ASYNC_BEGIN);
        expect(actions[1]).to.have.property('type', AUTHENTICATION_GET_SESSION_ASYNC_FAILURE);
        expect(actions[1]).to.have.nested.property('data.error').that.exist;
      });
  });

  it('returns correct action by dismissGetSessionAsyncError', () => {
    const expectedAction = {
      type: AUTHENTICATION_GET_SESSION_ASYNC_DISMISS_ERROR,
    };
    expect(dismissGetSessionAsyncError()).to.deep.equal(expectedAction);
  });

  it('handles action type AUTHENTICATION_GET_SESSION_ASYNC_BEGIN correctly', () => {
    const prevState = { getSessionAsyncPending: false };
    const state = reducer(
      prevState,
      { type: AUTHENTICATION_GET_SESSION_ASYNC_BEGIN }
    );
    expect(state).to.not.equal(prevState); // should be immutable
    expect(state.getSessionAsyncPending).to.be.true;
  });

  it('handles action type AUTHENTICATION_GET_SESSION_ASYNC_SUCCESS correctly', () => {
    const prevState = { getSessionAsyncPending: true };
    const state = reducer(
      prevState,
      { type: AUTHENTICATION_GET_SESSION_ASYNC_SUCCESS, data: {} }
    );
    expect(state).to.not.equal(prevState); // should be immutable
    expect(state.getSessionAsyncPending).to.be.false;
  });

  it('handles action type AUTHENTICATION_GET_SESSION_ASYNC_FAILURE correctly', () => {
    const prevState = { getSessionAsyncPending: true };
    const state = reducer(
      prevState,
      { type: AUTHENTICATION_GET_SESSION_ASYNC_FAILURE, data: { error: new Error('some error') } }
    );
    expect(state).to.not.equal(prevState); // should be immutable
    expect(state.getSessionAsyncPending).to.be.false;
    expect(state.getSessionAsyncError).to.exist;
  });

  it('handles action type AUTHENTICATION_GET_SESSION_ASYNC_DISMISS_ERROR correctly', () => {
    const prevState = { getSessionAsyncError: new Error('some error') };
    const state = reducer(
      prevState,
      { type: AUTHENTICATION_GET_SESSION_ASYNC_DISMISS_ERROR }
    );
    expect(state).to.not.equal(prevState); // should be immutable
    expect(state.getSessionAsyncError).to.be.null;
  });
});
