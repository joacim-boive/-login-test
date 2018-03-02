import configureMockStore from 'redux-mock-store';
import thunk from 'redux-thunk';
import nock from 'nock';
import { expect } from 'chai';

import {
  CUSTOMER_GET_CUSTOMER_BEGIN,
  CUSTOMER_GET_CUSTOMER_SUCCESS,
  CUSTOMER_GET_CUSTOMER_FAILURE,
  CUSTOMER_GET_CUSTOMER_DISMISS_ERROR,
} from 'src/features/customer/redux/constants';

import {
  getCustomer,
  dismissGetCustomerError,
  reducer,
} from 'src/features/customer/redux/getCustomer';

const middlewares = [thunk];
const mockStore = configureMockStore(middlewares);

describe('customer/redux/getCustomer', () => {
  afterEach(() => {
    nock.cleanAll();
  });

  it('dispatches success action when getCustomer succeeds', () => {
    const store = mockStore({});

    return store.dispatch(getCustomer())
      .then(() => {
        const actions = store.getActions();
        expect(actions[0]).to.have.property('type', CUSTOMER_GET_CUSTOMER_BEGIN);
        expect(actions[1]).to.have.property('type', CUSTOMER_GET_CUSTOMER_SUCCESS);
      });
  });

  it('dispatches failure action when getCustomer fails', () => {
    const store = mockStore({});

    return store.dispatch(getCustomer({ error: true }))
      .catch(() => {
        const actions = store.getActions();
        expect(actions[0]).to.have.property('type', CUSTOMER_GET_CUSTOMER_BEGIN);
        expect(actions[1]).to.have.property('type', CUSTOMER_GET_CUSTOMER_FAILURE);
        expect(actions[1]).to.have.nested.property('data.error').that.exist;
      });
  });

  it('returns correct action by dismissGetCustomerError', () => {
    const expectedAction = {
      type: CUSTOMER_GET_CUSTOMER_DISMISS_ERROR,
    };
    expect(dismissGetCustomerError()).to.deep.equal(expectedAction);
  });

  it('handles action type CUSTOMER_GET_CUSTOMER_BEGIN correctly', () => {
    const prevState = { getCustomerPending: false };
    const state = reducer(
      prevState,
      { type: CUSTOMER_GET_CUSTOMER_BEGIN }
    );
    expect(state).to.not.equal(prevState); // should be immutable
    expect(state.getCustomerPending).to.be.true;
  });

  it('handles action type CUSTOMER_GET_CUSTOMER_SUCCESS correctly', () => {
    const prevState = { getCustomerPending: true };
    const state = reducer(
      prevState,
      { type: CUSTOMER_GET_CUSTOMER_SUCCESS, data: {} }
    );
    expect(state).to.not.equal(prevState); // should be immutable
    expect(state.getCustomerPending).to.be.false;
  });

  it('handles action type CUSTOMER_GET_CUSTOMER_FAILURE correctly', () => {
    const prevState = { getCustomerPending: true };
    const state = reducer(
      prevState,
      { type: CUSTOMER_GET_CUSTOMER_FAILURE, data: { error: new Error('some error') } }
    );
    expect(state).to.not.equal(prevState); // should be immutable
    expect(state.getCustomerPending).to.be.false;
    expect(state.getCustomerError).to.exist;
  });

  it('handles action type CUSTOMER_GET_CUSTOMER_DISMISS_ERROR correctly', () => {
    const prevState = { getCustomerError: new Error('some error') };
    const state = reducer(
      prevState,
      { type: CUSTOMER_GET_CUSTOMER_DISMISS_ERROR }
    );
    expect(state).to.not.equal(prevState); // should be immutable
    expect(state.getCustomerError).to.be.null;
  });
});
