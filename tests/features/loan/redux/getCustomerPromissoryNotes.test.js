import configureMockStore from 'redux-mock-store';
import thunk from 'redux-thunk';
import nock from 'nock';
import { expect } from 'chai';

import {
  LOAN_GET_CUSTOMER_PROMISSORY_NOTES_BEGIN,
  LOAN_GET_CUSTOMER_PROMISSORY_NOTES_SUCCESS,
  LOAN_GET_CUSTOMER_PROMISSORY_NOTES_FAILURE,
  LOAN_GET_CUSTOMER_PROMISSORY_NOTES_DISMISS_ERROR,
} from 'src/features/loan/redux/constants';

import {
  getCustomerPromissoryNotes,
  dismissGetCustomerPromissoryNotesError,
  reducer,
} from 'src/features/loan/redux/getCustomerPromissoryNotes';

const middlewares = [thunk];
const mockStore = configureMockStore(middlewares);

describe('loan/redux/getCustomerPromissoryNotes', () => {
  afterEach(() => {
    nock.cleanAll();
  });

  it('dispatches success action when getCustomerPromissoryNotes succeeds', () => {
    const store = mockStore({});

    return store.dispatch(getCustomerPromissoryNotes())
      .then(() => {
        const actions = store.getActions();
        expect(actions[0]).to.have.property('type', LOAN_GET_CUSTOMER_PROMISSORY_NOTES_BEGIN);
        expect(actions[1]).to.have.property('type', LOAN_GET_CUSTOMER_PROMISSORY_NOTES_SUCCESS);
      });
  });

  it('dispatches failure action when getCustomerPromissoryNotes fails', () => {
    const store = mockStore({});

    return store.dispatch(getCustomerPromissoryNotes({ error: true }))
      .catch(() => {
        const actions = store.getActions();
        expect(actions[0]).to.have.property('type', LOAN_GET_CUSTOMER_PROMISSORY_NOTES_BEGIN);
        expect(actions[1]).to.have.property('type', LOAN_GET_CUSTOMER_PROMISSORY_NOTES_FAILURE);
        expect(actions[1]).to.have.nested.property('data.error').that.exist;
      });
  });

  it('returns correct action by dismissGetCustomerPromissoryNotesError', () => {
    const expectedAction = {
      type: LOAN_GET_CUSTOMER_PROMISSORY_NOTES_DISMISS_ERROR,
    };
    expect(dismissGetCustomerPromissoryNotesError()).to.deep.equal(expectedAction);
  });

  it('handles action type LOAN_GET_CUSTOMER_PROMISSORY_NOTES_BEGIN correctly', () => {
    const prevState = { getCustomerPromissoryNotesPending: false };
    const state = reducer(
      prevState,
      { type: LOAN_GET_CUSTOMER_PROMISSORY_NOTES_BEGIN }
    );
    expect(state).to.not.equal(prevState); // should be immutable
    expect(state.getCustomerPromissoryNotesPending).to.be.true;
  });

  it('handles action type LOAN_GET_CUSTOMER_PROMISSORY_NOTES_SUCCESS correctly', () => {
    const prevState = { getCustomerPromissoryNotesPending: true };
    const state = reducer(
      prevState,
      { type: LOAN_GET_CUSTOMER_PROMISSORY_NOTES_SUCCESS, data: {} }
    );
    expect(state).to.not.equal(prevState); // should be immutable
    expect(state.getCustomerPromissoryNotesPending).to.be.false;
  });

  it('handles action type LOAN_GET_CUSTOMER_PROMISSORY_NOTES_FAILURE correctly', () => {
    const prevState = { getCustomerPromissoryNotesPending: true };
    const state = reducer(
      prevState,
      { type: LOAN_GET_CUSTOMER_PROMISSORY_NOTES_FAILURE, data: { error: new Error('some error') } }
    );
    expect(state).to.not.equal(prevState); // should be immutable
    expect(state.getCustomerPromissoryNotesPending).to.be.false;
    expect(state.getCustomerPromissoryNotesError).to.exist;
  });

  it('handles action type LOAN_GET_CUSTOMER_PROMISSORY_NOTES_DISMISS_ERROR correctly', () => {
    const prevState = { getCustomerPromissoryNotesError: new Error('some error') };
    const state = reducer(
      prevState,
      { type: LOAN_GET_CUSTOMER_PROMISSORY_NOTES_DISMISS_ERROR }
    );
    expect(state).to.not.equal(prevState); // should be immutable
    expect(state.getCustomerPromissoryNotesError).to.be.null;
  });
});
