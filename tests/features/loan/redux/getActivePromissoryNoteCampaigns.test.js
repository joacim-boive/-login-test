import configureMockStore from 'redux-mock-store';
import thunk from 'redux-thunk';
import nock from 'nock';
import { expect } from 'chai';

import {
  LOAN_GET_ACTIVE_PROMISSORY_NOTE_CAMPAIGNS_BEGIN,
  LOAN_GET_ACTIVE_PROMISSORY_NOTE_CAMPAIGNS_SUCCESS,
  LOAN_GET_ACTIVE_PROMISSORY_NOTE_CAMPAIGNS_FAILURE,
  LOAN_GET_ACTIVE_PROMISSORY_NOTE_CAMPAIGNS_DISMISS_ERROR,
} from 'src/features/loan/redux/constants';

import {
  getActivePromissoryNoteCampaigns,
  dismissGetActivePromissoryNoteCampaignsError,
  reducer,
} from 'src/features/loan/redux/getActivePromissoryNoteCampaigns';

const middlewares = [thunk];
const mockStore = configureMockStore(middlewares);

describe('loan/redux/getActivePromissoryNoteCampaigns', () => {
  afterEach(() => {
    nock.cleanAll();
  });

  it('dispatches success action when getActivePromissoryNoteCampaigns succeeds', () => {
    const store = mockStore({});

    return store.dispatch(getActivePromissoryNoteCampaigns())
      .then(() => {
        const actions = store.getActions();
        expect(actions[0]).to.have.property('type', LOAN_GET_ACTIVE_PROMISSORY_NOTE_CAMPAIGNS_BEGIN);
        expect(actions[1]).to.have.property('type', LOAN_GET_ACTIVE_PROMISSORY_NOTE_CAMPAIGNS_SUCCESS);
      });
  });

  it('dispatches failure action when getActivePromissoryNoteCampaigns fails', () => {
    const store = mockStore({});

    return store.dispatch(getActivePromissoryNoteCampaigns({ error: true }))
      .catch(() => {
        const actions = store.getActions();
        expect(actions[0]).to.have.property('type', LOAN_GET_ACTIVE_PROMISSORY_NOTE_CAMPAIGNS_BEGIN);
        expect(actions[1]).to.have.property('type', LOAN_GET_ACTIVE_PROMISSORY_NOTE_CAMPAIGNS_FAILURE);
        expect(actions[1]).to.have.nested.property('data.error').that.exist;
      });
  });

  it('returns correct action by dismissGetActivePromissoryNoteCampaignsError', () => {
    const expectedAction = {
      type: LOAN_GET_ACTIVE_PROMISSORY_NOTE_CAMPAIGNS_DISMISS_ERROR,
    };
    expect(dismissGetActivePromissoryNoteCampaignsError()).to.deep.equal(expectedAction);
  });

  it('handles action type LOAN_GET_ACTIVE_PROMISSORY_NOTE_CAMPAIGNS_BEGIN correctly', () => {
    const prevState = { getActivePromissoryNoteCampaignsPending: false };
    const state = reducer(
      prevState,
      { type: LOAN_GET_ACTIVE_PROMISSORY_NOTE_CAMPAIGNS_BEGIN }
    );
    expect(state).to.not.equal(prevState); // should be immutable
    expect(state.getActivePromissoryNoteCampaignsPending).to.be.true;
  });

  it('handles action type LOAN_GET_ACTIVE_PROMISSORY_NOTE_CAMPAIGNS_SUCCESS correctly', () => {
    const prevState = { getActivePromissoryNoteCampaignsPending: true };
    const state = reducer(
      prevState,
      { type: LOAN_GET_ACTIVE_PROMISSORY_NOTE_CAMPAIGNS_SUCCESS, data: {} }
    );
    expect(state).to.not.equal(prevState); // should be immutable
    expect(state.getActivePromissoryNoteCampaignsPending).to.be.false;
  });

  it('handles action type LOAN_GET_ACTIVE_PROMISSORY_NOTE_CAMPAIGNS_FAILURE correctly', () => {
    const prevState = { getActivePromissoryNoteCampaignsPending: true };
    const state = reducer(
      prevState,
      { type: LOAN_GET_ACTIVE_PROMISSORY_NOTE_CAMPAIGNS_FAILURE, data: { error: new Error('some error') } }
    );
    expect(state).to.not.equal(prevState); // should be immutable
    expect(state.getActivePromissoryNoteCampaignsPending).to.be.false;
    expect(state.getActivePromissoryNoteCampaignsError).to.exist;
  });

  it('handles action type LOAN_GET_ACTIVE_PROMISSORY_NOTE_CAMPAIGNS_DISMISS_ERROR correctly', () => {
    const prevState = { getActivePromissoryNoteCampaignsError: new Error('some error') };
    const state = reducer(
      prevState,
      { type: LOAN_GET_ACTIVE_PROMISSORY_NOTE_CAMPAIGNS_DISMISS_ERROR }
    );
    expect(state).to.not.equal(prevState); // should be immutable
    expect(state.getActivePromissoryNoteCampaignsError).to.be.null;
  });
});
