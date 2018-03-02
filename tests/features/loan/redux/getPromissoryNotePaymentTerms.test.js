import configureMockStore from 'redux-mock-store';
import thunk from 'redux-thunk';
import nock from 'nock';
import { expect } from 'chai';

import {
  LOAN_GET_PROMISSORY_NOTE_PAYMENT_TERMS_BEGIN,
  LOAN_GET_PROMISSORY_NOTE_PAYMENT_TERMS_SUCCESS,
  LOAN_GET_PROMISSORY_NOTE_PAYMENT_TERMS_FAILURE,
  LOAN_GET_PROMISSORY_NOTE_PAYMENT_TERMS_DISMISS_ERROR,
} from 'src/features/loan/redux/constants';

import {
  getPromissoryNotePaymentTerms,
  dismissGetPromissoryNotePaymentTermsError,
  reducer,
} from 'src/features/loan/redux/getPromissoryNotePaymentTerms';

const middlewares = [thunk];
const mockStore = configureMockStore(middlewares);

describe('loan/redux/getPromissoryNotePaymentTerms', () => {
  afterEach(() => {
    nock.cleanAll();
  });

  it('dispatches success action when getPromissoryNotePaymentTerms succeeds', () => {
    const store = mockStore({});

    return store.dispatch(getPromissoryNotePaymentTerms())
      .then(() => {
        const actions = store.getActions();
        expect(actions[0]).to.have.property('type', LOAN_GET_PROMISSORY_NOTE_PAYMENT_TERMS_BEGIN);
        expect(actions[1]).to.have.property('type', LOAN_GET_PROMISSORY_NOTE_PAYMENT_TERMS_SUCCESS);
      });
  });

  it('dispatches failure action when getPromissoryNotePaymentTerms fails', () => {
    const store = mockStore({});

    return store.dispatch(getPromissoryNotePaymentTerms({ error: true }))
      .catch(() => {
        const actions = store.getActions();
        expect(actions[0]).to.have.property('type', LOAN_GET_PROMISSORY_NOTE_PAYMENT_TERMS_BEGIN);
        expect(actions[1]).to.have.property('type', LOAN_GET_PROMISSORY_NOTE_PAYMENT_TERMS_FAILURE);
        expect(actions[1]).to.have.nested.property('data.error').that.exist;
      });
  });

  it('returns correct action by dismissGetPromissoryNotePaymentTermsError', () => {
    const expectedAction = {
      type: LOAN_GET_PROMISSORY_NOTE_PAYMENT_TERMS_DISMISS_ERROR,
    };
    expect(dismissGetPromissoryNotePaymentTermsError()).to.deep.equal(expectedAction);
  });

  it('handles action type LOAN_GET_PROMISSORY_NOTE_PAYMENT_TERMS_BEGIN correctly', () => {
    const prevState = { getPromissoryNotePaymentTermsPending: false };
    const state = reducer(
      prevState,
      { type: LOAN_GET_PROMISSORY_NOTE_PAYMENT_TERMS_BEGIN }
    );
    expect(state).to.not.equal(prevState); // should be immutable
    expect(state.getPromissoryNotePaymentTermsPending).to.be.true;
  });

  it('handles action type LOAN_GET_PROMISSORY_NOTE_PAYMENT_TERMS_SUCCESS correctly', () => {
    const prevState = { getPromissoryNotePaymentTermsPending: true };
    const state = reducer(
      prevState,
      { type: LOAN_GET_PROMISSORY_NOTE_PAYMENT_TERMS_SUCCESS, data: {} }
    );
    expect(state).to.not.equal(prevState); // should be immutable
    expect(state.getPromissoryNotePaymentTermsPending).to.be.false;
  });

  it('handles action type LOAN_GET_PROMISSORY_NOTE_PAYMENT_TERMS_FAILURE correctly', () => {
    const prevState = { getPromissoryNotePaymentTermsPending: true };
    const state = reducer(
      prevState,
      { type: LOAN_GET_PROMISSORY_NOTE_PAYMENT_TERMS_FAILURE, data: { error: new Error('some error') } }
    );
    expect(state).to.not.equal(prevState); // should be immutable
    expect(state.getPromissoryNotePaymentTermsPending).to.be.false;
    expect(state.getPromissoryNotePaymentTermsError).to.exist;
  });

  it('handles action type LOAN_GET_PROMISSORY_NOTE_PAYMENT_TERMS_DISMISS_ERROR correctly', () => {
    const prevState = { getPromissoryNotePaymentTermsError: new Error('some error') };
    const state = reducer(
      prevState,
      { type: LOAN_GET_PROMISSORY_NOTE_PAYMENT_TERMS_DISMISS_ERROR }
    );
    expect(state).to.not.equal(prevState); // should be immutable
    expect(state.getPromissoryNotePaymentTermsError).to.be.null;
  });
});
