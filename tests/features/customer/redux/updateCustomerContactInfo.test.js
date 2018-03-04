import configureMockStore from 'redux-mock-store';
import thunk from 'redux-thunk';
import nock from 'nock';
import { expect } from 'chai';

import {
  CUSTOMER_UPDATE_CUSTOMER_CONTACT_INFO_BEGIN,
  CUSTOMER_UPDATE_CUSTOMER_CONTACT_INFO_SUCCESS,
  CUSTOMER_UPDATE_CUSTOMER_CONTACT_INFO_FAILURE,
  CUSTOMER_UPDATE_CUSTOMER_CONTACT_INFO_DISMISS_ERROR,
} from 'src/features/customer/redux/constants';

import {
  updateCustomerContactInfo,
  dismissUpdateCustomerContactInfoError,
  reducer,
} from 'src/features/customer/redux/updateCustomerContactInfo';

const middlewares = [thunk];
const mockStore = configureMockStore(middlewares);

describe('customer/redux/updateCustomerContactInfo', () => {
  afterEach(() => {
    nock.cleanAll();
  });

  it('dispatches success action when updateCustomerContactInfo succeeds', () => {
    const store = mockStore({});

    return store.dispatch(updateCustomerContactInfo())
      .then(() => {
        const actions = store.getActions();
        expect(actions[0]).to.have.property('type', CUSTOMER_UPDATE_CUSTOMER_CONTACT_INFO_BEGIN);
        expect(actions[1]).to.have.property('type', CUSTOMER_UPDATE_CUSTOMER_CONTACT_INFO_SUCCESS);
      });
  });

  it('dispatches failure action when updateCustomerContactInfo fails', () => {
    const store = mockStore({});

    return store.dispatch(updateCustomerContactInfo({ error: true }))
      .catch(() => {
        const actions = store.getActions();
        expect(actions[0]).to.have.property('type', CUSTOMER_UPDATE_CUSTOMER_CONTACT_INFO_BEGIN);
        expect(actions[1]).to.have.property('type', CUSTOMER_UPDATE_CUSTOMER_CONTACT_INFO_FAILURE);
        expect(actions[1]).to.have.nested.property('data.error').that.exist;
      });
  });

  it('returns correct action by dismissUpdateCustomerContactInfoError', () => {
    const expectedAction = {
      type: CUSTOMER_UPDATE_CUSTOMER_CONTACT_INFO_DISMISS_ERROR,
    };
    expect(dismissUpdateCustomerContactInfoError()).to.deep.equal(expectedAction);
  });

  it('handles action type CUSTOMER_UPDATE_CUSTOMER_CONTACT_INFO_BEGIN correctly', () => {
    const prevState = { updateCustomerContactInfoPending: false };
    const state = reducer(
      prevState,
      { type: CUSTOMER_UPDATE_CUSTOMER_CONTACT_INFO_BEGIN }
    );
    expect(state).to.not.equal(prevState); // should be immutable
    expect(state.updateCustomerContactInfoPending).to.be.true;
  });

  it('handles action type CUSTOMER_UPDATE_CUSTOMER_CONTACT_INFO_SUCCESS correctly', () => {
    const prevState = { updateCustomerContactInfoPending: true };
    const state = reducer(
      prevState,
      { type: CUSTOMER_UPDATE_CUSTOMER_CONTACT_INFO_SUCCESS, data: {} }
    );
    expect(state).to.not.equal(prevState); // should be immutable
    expect(state.updateCustomerContactInfoPending).to.be.false;
  });

  it('handles action type CUSTOMER_UPDATE_CUSTOMER_CONTACT_INFO_FAILURE correctly', () => {
    const prevState = { updateCustomerContactInfoPending: true };
    const state = reducer(
      prevState,
      { type: CUSTOMER_UPDATE_CUSTOMER_CONTACT_INFO_FAILURE, data: { error: new Error('some error') } }
    );
    expect(state).to.not.equal(prevState); // should be immutable
    expect(state.updateCustomerContactInfoPending).to.be.false;
    expect(state.updateCustomerContactInfoError).to.exist;
  });

  it('handles action type CUSTOMER_UPDATE_CUSTOMER_CONTACT_INFO_DISMISS_ERROR correctly', () => {
    const prevState = { updateCustomerContactInfoError: new Error('some error') };
    const state = reducer(
      prevState,
      { type: CUSTOMER_UPDATE_CUSTOMER_CONTACT_INFO_DISMISS_ERROR }
    );
    expect(state).to.not.equal(prevState); // should be immutable
    expect(state.updateCustomerContactInfoError).to.be.null;
  });
});
