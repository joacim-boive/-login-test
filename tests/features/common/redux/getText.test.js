import configureMockStore from 'redux-mock-store';
import thunk from 'redux-thunk';
import nock from 'nock';
import { expect } from 'chai';

import {
  COMMON_GET_TEXT_BEGIN,
  COMMON_GET_TEXT_SUCCESS,
  COMMON_GET_TEXT_FAILURE,
  COMMON_GET_TEXT_DISMISS_ERROR,
} from 'src/features/common/redux/constants';

import {
  getText,
  dismissGetTextError,
  reducer,
} from 'src/features/common/redux/getText';

const middlewares = [thunk];
const mockStore = configureMockStore(middlewares);

describe('common/redux/getText', () => {
  afterEach(() => {
    nock.cleanAll();
  });

  it('dispatches success action when getText succeeds', () => {
    const store = mockStore({});

    return store.dispatch(getText())
      .then(() => {
        const actions = store.getActions();
        expect(actions[0]).to.have.property('type', COMMON_GET_TEXT_BEGIN);
        expect(actions[1]).to.have.property('type', COMMON_GET_TEXT_SUCCESS);
      });
  });

  it('dispatches failure action when getText fails', () => {
    const store = mockStore({});

    return store.dispatch(getText({ error: true }))
      .catch(() => {
        const actions = store.getActions();
        expect(actions[0]).to.have.property('type', COMMON_GET_TEXT_BEGIN);
        expect(actions[1]).to.have.property('type', COMMON_GET_TEXT_FAILURE);
        expect(actions[1]).to.have.nested.property('data.error').that.exist;
      });
  });

  it('returns correct action by dismissGetTextError', () => {
    const expectedAction = {
      type: COMMON_GET_TEXT_DISMISS_ERROR,
    };
    expect(dismissGetTextError()).to.deep.equal(expectedAction);
  });

  it('handles action type COMMON_GET_TEXT_BEGIN correctly', () => {
    const prevState = { getTextPending: false };
    const state = reducer(
      prevState,
      { type: COMMON_GET_TEXT_BEGIN }
    );
    expect(state).to.not.equal(prevState); // should be immutable
    expect(state.getTextPending).to.be.true;
  });

  it('handles action type COMMON_GET_TEXT_SUCCESS correctly', () => {
    const prevState = { getTextPending: true };
    const state = reducer(
      prevState,
      { type: COMMON_GET_TEXT_SUCCESS, data: {} }
    );
    expect(state).to.not.equal(prevState); // should be immutable
    expect(state.getTextPending).to.be.false;
  });

  it('handles action type COMMON_GET_TEXT_FAILURE correctly', () => {
    const prevState = { getTextPending: true };
    const state = reducer(
      prevState,
      { type: COMMON_GET_TEXT_FAILURE, data: { error: new Error('some error') } }
    );
    expect(state).to.not.equal(prevState); // should be immutable
    expect(state.getTextPending).to.be.false;
    expect(state.getTextError).to.exist;
  });

  it('handles action type COMMON_GET_TEXT_DISMISS_ERROR correctly', () => {
    const prevState = { getTextError: new Error('some error') };
    const state = reducer(
      prevState,
      { type: COMMON_GET_TEXT_DISMISS_ERROR }
    );
    expect(state).to.not.equal(prevState); // should be immutable
    expect(state.getTextError).to.be.null;
  });
});
