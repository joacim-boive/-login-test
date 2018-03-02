import configureMockStore from 'redux-mock-store';
import thunk from 'redux-thunk';
import nock from 'nock';
import { expect } from 'chai';

import {
  CUSTOMER_GET_CUSTOMER_PROPERTIES_BEGIN,
  CUSTOMER_GET_CUSTOMER_PROPERTIES_SUCCESS,
  CUSTOMER_GET_CUSTOMER_PROPERTIES_FAILURE,
  CUSTOMER_GET_CUSTOMER_PROPERTIES_DISMISS_ERROR,
} from 'src/features/customer/redux/constants';

import {
  getCustomerProperties,
  dismissGetCustomerPropertiesError,
  reducer,
} from 'src/features/customer/redux/getCustomerProperties';

const middlewares = [thunk];
const mockStore = configureMockStore(middlewares);

describe('customer/redux/getCustomerProperties', () => {
  afterEach(() => {
    nock.cleanAll();
  });

  it('dispatches success action when getCustomerProperties succeeds', () => {
    const store = mockStore({});

    return store.dispatch(getCustomerProperties())
      .then(() => {
        const actions = store.getActions();
        expect(actions[0]).to.have.property('type', CUSTOMER_GET_CUSTOMER_PROPERTIES_BEGIN);
        expect(actions[1]).to.have.property('type', CUSTOMER_GET_CUSTOMER_PROPERTIES_SUCCESS);
      });
  });

  it('dispatches failure action when getCustomerProperties fails', () => {
    const store = mockStore({});

    return store.dispatch(getCustomerProperties({ error: true }))
      .catch(() => {
        const actions = store.getActions();
        expect(actions[0]).to.have.property('type', CUSTOMER_GET_CUSTOMER_PROPERTIES_BEGIN);
        expect(actions[1]).to.have.property('type', CUSTOMER_GET_CUSTOMER_PROPERTIES_FAILURE);
        expect(actions[1]).to.have.nested.property('data.error').that.exist;
      });
  });

  it('returns correct action by dismissGetCustomerPropertiesError', () => {
    const expectedAction = {
      type: CUSTOMER_GET_CUSTOMER_PROPERTIES_DISMISS_ERROR,
    };
    expect(dismissGetCustomerPropertiesError()).to.deep.equal(expectedAction);
  });

  it('handles action type CUSTOMER_GET_CUSTOMER_PROPERTIES_BEGIN correctly', () => {
    const prevState = { getCustomerPropertiesPending: false };
    const state = reducer(
      prevState,
      { type: CUSTOMER_GET_CUSTOMER_PROPERTIES_BEGIN }
    );
    expect(state).to.not.equal(prevState); // should be immutable
    expect(state.getCustomerPropertiesPending).to.be.true;
  });

  it('handles action type CUSTOMER_GET_CUSTOMER_PROPERTIES_SUCCESS correctly', () => {
    const prevState = { getCustomerPropertiesPending: true };
    const state = reducer(
      prevState,
      { type: CUSTOMER_GET_CUSTOMER_PROPERTIES_SUCCESS, data: {} }
    );
    expect(state).to.not.equal(prevState); // should be immutable
    expect(state.getCustomerPropertiesPending).to.be.false;
  });

  it('handles action type CUSTOMER_GET_CUSTOMER_PROPERTIES_FAILURE correctly', () => {
    const prevState = { getCustomerPropertiesPending: true };
    const state = reducer(
      prevState,
      { type: CUSTOMER_GET_CUSTOMER_PROPERTIES_FAILURE, data: { error: new Error('some error') } }
    );
    expect(state).to.not.equal(prevState); // should be immutable
    expect(state.getCustomerPropertiesPending).to.be.false;
    expect(state.getCustomerPropertiesError).to.exist;
  });

  it('handles action type CUSTOMER_GET_CUSTOMER_PROPERTIES_DISMISS_ERROR correctly', () => {
    const prevState = { getCustomerPropertiesError: new Error('some error') };
    const state = reducer(
      prevState,
      { type: CUSTOMER_GET_CUSTOMER_PROPERTIES_DISMISS_ERROR }
    );
    expect(state).to.not.equal(prevState); // should be immutable
    expect(state.getCustomerPropertiesError).to.be.null;
  });
});
