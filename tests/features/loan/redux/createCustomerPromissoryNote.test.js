import configureMockStore from 'redux-mock-store';
import thunk from 'redux-thunk';
import nock from 'nock';
import { expect } from 'chai';

import {
  LOAN_CREATE_CUSTOMER_PROMISSORY_NOTE_BEGIN,
  LOAN_CREATE_CUSTOMER_PROMISSORY_NOTE_SUCCESS,
  LOAN_CREATE_CUSTOMER_PROMISSORY_NOTE_FAILURE,
  LOAN_CREATE_CUSTOMER_PROMISSORY_NOTE_DISMISS_ERROR,
} from 'src/features/loan/redux/constants';

import {
  createCustomerPromissoryNote,
  dismissCreateCustomerPromissoryNoteError,
  reducer,
} from 'src/features/loan/redux/createCustomerPromissoryNote';

const middlewares = [thunk];
const mockStore = configureMockStore(middlewares);

describe('loan/redux/createCustomerPromissoryNote', () => {
  afterEach(() => {
    nock.cleanAll();
  });

  it('dispatches success action when createCustomerPromissoryNote succeeds', () => {
    const store = mockStore({});

    return store.dispatch(createCustomerPromissoryNote())
      .then(() => {
        const actions = store.getActions();
        expect(actions[0]).to.have.property('type', LOAN_CREATE_CUSTOMER_PROMISSORY_NOTE_BEGIN);
        expect(actions[1]).to.have.property('type', LOAN_CREATE_CUSTOMER_PROMISSORY_NOTE_SUCCESS);
      });
  });

  it('dispatches failure action when createCustomerPromissoryNote fails', () => {
    const store = mockStore({});

    return store.dispatch(createCustomerPromissoryNote({ error: true }))
      .catch(() => {
        const actions = store.getActions();
        expect(actions[0]).to.have.property('type', LOAN_CREATE_CUSTOMER_PROMISSORY_NOTE_BEGIN);
        expect(actions[1]).to.have.property('type', LOAN_CREATE_CUSTOMER_PROMISSORY_NOTE_FAILURE);
        expect(actions[1]).to.have.nested.property('data.error').that.exist;
      });
  });

  it('returns correct action by dismissCreateCustomerPromissoryNoteError', () => {
    const expectedAction = {
      type: LOAN_CREATE_CUSTOMER_PROMISSORY_NOTE_DISMISS_ERROR,
    };
    expect(dismissCreateCustomerPromissoryNoteError()).to.deep.equal(expectedAction);
  });

  it('handles action type LOAN_CREATE_CUSTOMER_PROMISSORY_NOTE_BEGIN correctly', () => {
    const prevState = { createCustomerPromissoryNotePending: false };
    const state = reducer(
      prevState,
      { type: LOAN_CREATE_CUSTOMER_PROMISSORY_NOTE_BEGIN }
    );
    expect(state).to.not.equal(prevState); // should be immutable
    expect(state.createCustomerPromissoryNotePending).to.be.true;
  });

  it('handles action type LOAN_CREATE_CUSTOMER_PROMISSORY_NOTE_SUCCESS correctly', () => {
    const prevState = { createCustomerPromissoryNotePending: true };
    const state = reducer(
      prevState,
      { type: LOAN_CREATE_CUSTOMER_PROMISSORY_NOTE_SUCCESS, data: {} }
    );
    expect(state).to.not.equal(prevState); // should be immutable
    expect(state.createCustomerPromissoryNotePending).to.be.false;
  });

  it('handles action type LOAN_CREATE_CUSTOMER_PROMISSORY_NOTE_FAILURE correctly', () => {
    const prevState = { createCustomerPromissoryNotePending: true };
    const state = reducer(
      prevState,
      { type: LOAN_CREATE_CUSTOMER_PROMISSORY_NOTE_FAILURE, data: { error: new Error('some error') } }
    );
    expect(state).to.not.equal(prevState); // should be immutable
    expect(state.createCustomerPromissoryNotePending).to.be.false;
    expect(state.createCustomerPromissoryNoteError).to.exist;
  });

  it('handles action type LOAN_CREATE_CUSTOMER_PROMISSORY_NOTE_DISMISS_ERROR correctly', () => {
    const prevState = { createCustomerPromissoryNoteError: new Error('some error') };
    const state = reducer(
      prevState,
      { type: LOAN_CREATE_CUSTOMER_PROMISSORY_NOTE_DISMISS_ERROR }
    );
    expect(state).to.not.equal(prevState); // should be immutable
    expect(state.createCustomerPromissoryNoteError).to.be.null;
  });
});
