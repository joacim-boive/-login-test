import configureMockStore from 'redux-mock-store';
import thunk from 'redux-thunk';
import nock from 'nock';
import { expect } from 'chai';

import {
  LOAN_GET_PROMISSORY_NOTE_DEFAULT_PARAMETERS_BEGIN,
  LOAN_GET_PROMISSORY_NOTE_DEFAULT_PARAMETERS_SUCCESS,
  LOAN_GET_PROMISSORY_NOTE_DEFAULT_PARAMETERS_FAILURE,
  LOAN_GET_PROMISSORY_NOTE_DEFAULT_PARAMETERS_DISMISS_ERROR,
} from 'src/features/loan/redux/constants';

import {
  getPromissoryNoteDefaultParameters,
  dismissGetPromissoryNoteDefaultParametersError,
  reducer,
} from 'src/features/loan/redux/getPromissoryNoteDefaultParameters';

const middlewares = [thunk];
const mockStore = configureMockStore(middlewares);

describe('loan/redux/getPromissoryNoteDefaultParameters', () => {
  afterEach(() => {
    nock.cleanAll();
  });

  it('dispatches success action when getPromissoryNoteDefaultParameters succeeds', () => {
    const store = mockStore({});

    return store.dispatch(getPromissoryNoteDefaultParameters())
      .then(() => {
        const actions = store.getActions();
        expect(actions[0]).to.have.property('type', LOAN_GET_PROMISSORY_NOTE_DEFAULT_PARAMETERS_BEGIN);
        expect(actions[1]).to.have.property('type', LOAN_GET_PROMISSORY_NOTE_DEFAULT_PARAMETERS_SUCCESS);
      });
  });

  it('dispatches failure action when getPromissoryNoteDefaultParameters fails', () => {
    const store = mockStore({});

    return store.dispatch(getPromissoryNoteDefaultParameters({ error: true }))
      .catch(() => {
        const actions = store.getActions();
        expect(actions[0]).to.have.property('type', LOAN_GET_PROMISSORY_NOTE_DEFAULT_PARAMETERS_BEGIN);
        expect(actions[1]).to.have.property('type', LOAN_GET_PROMISSORY_NOTE_DEFAULT_PARAMETERS_FAILURE);
        expect(actions[1]).to.have.nested.property('data.error').that.exist;
      });
  });

  it('returns correct action by dismissGetPromissoryNoteDefaultParametersError', () => {
    const expectedAction = {
      type: LOAN_GET_PROMISSORY_NOTE_DEFAULT_PARAMETERS_DISMISS_ERROR,
    };
    expect(dismissGetPromissoryNoteDefaultParametersError()).to.deep.equal(expectedAction);
  });

  it('handles action type LOAN_GET_PROMISSORY_NOTE_DEFAULT_PARAMETERS_BEGIN correctly', () => {
    const prevState = { getPromissoryNoteDefaultParametersPending: false };
    const state = reducer(
      prevState,
      { type: LOAN_GET_PROMISSORY_NOTE_DEFAULT_PARAMETERS_BEGIN }
    );
    expect(state).to.not.equal(prevState); // should be immutable
    expect(state.getPromissoryNoteDefaultParametersPending).to.be.true;
  });

  it('handles action type LOAN_GET_PROMISSORY_NOTE_DEFAULT_PARAMETERS_SUCCESS correctly', () => {
    const prevState = { getPromissoryNoteDefaultParametersPending: true };
    const state = reducer(
      prevState,
      { type: LOAN_GET_PROMISSORY_NOTE_DEFAULT_PARAMETERS_SUCCESS, data: {} }
    );
    expect(state).to.not.equal(prevState); // should be immutable
    expect(state.getPromissoryNoteDefaultParametersPending).to.be.false;
  });

  it('handles action type LOAN_GET_PROMISSORY_NOTE_DEFAULT_PARAMETERS_FAILURE correctly', () => {
    const prevState = { getPromissoryNoteDefaultParametersPending: true };
    const state = reducer(
      prevState,
      { type: LOAN_GET_PROMISSORY_NOTE_DEFAULT_PARAMETERS_FAILURE, data: { error: new Error('some error') } }
    );
    expect(state).to.not.equal(prevState); // should be immutable
    expect(state.getPromissoryNoteDefaultParametersPending).to.be.false;
    expect(state.getPromissoryNoteDefaultParametersError).to.exist;
  });

  it('handles action type LOAN_GET_PROMISSORY_NOTE_DEFAULT_PARAMETERS_DISMISS_ERROR correctly', () => {
    const prevState = { getPromissoryNoteDefaultParametersError: new Error('some error') };
    const state = reducer(
      prevState,
      { type: LOAN_GET_PROMISSORY_NOTE_DEFAULT_PARAMETERS_DISMISS_ERROR }
    );
    expect(state).to.not.equal(prevState); // should be immutable
    expect(state.getPromissoryNoteDefaultParametersError).to.be.null;
  });
});
