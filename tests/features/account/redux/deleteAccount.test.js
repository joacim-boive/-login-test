import configureMockStore from 'redux-mock-store';
import thunk from 'redux-thunk';
import nock from 'nock';
import { expect } from 'chai';

import {
    ACCOUNT_DELETE_ACCOUNT_BEGIN,
    ACCOUNT_DELETE_ACCOUNT_SUCCESS,
    ACCOUNT_DELETE_ACCOUNT_FAILURE,
    ACCOUNT_DELETE_ACCOUNT_DISMISS_ERROR,
} from 'src/features/account/redux/constants';

import { deleteAccount, dismissDeleteAccountError, reducer } from 'src/features/account/redux/deleteAccount';

const middlewares = [thunk];
const mockStore = configureMockStore(middlewares);

describe('account/redux/deleteAccount', () => {
    afterEach(() => {
        nock.cleanAll();
    });

    it('dispatches success action when deleteAccount succeeds', () => {
        const store = mockStore({});

        return store.dispatch(deleteAccount()).then(() => {
            const actions = store.getActions();
            expect(actions[0]).to.have.property('type', ACCOUNT_DELETE_ACCOUNT_BEGIN);
            expect(actions[1]).to.have.property('type', ACCOUNT_DELETE_ACCOUNT_SUCCESS);
        });
    });

    it('dispatches failure action when deleteAccount fails', () => {
        const store = mockStore({});

        return store.dispatch(deleteAccount({ error: true })).catch(() => {
            const actions = store.getActions();
            expect(actions[0]).to.have.property('type', ACCOUNT_DELETE_ACCOUNT_BEGIN);
            expect(actions[1]).to.have.property('type', ACCOUNT_DELETE_ACCOUNT_FAILURE);
            expect(actions[1]).to.have.nested.property('data.error').that.exist;
        });
    });

    it('returns correct action by dismissDeleteAccountError', () => {
        const expectedAction = {
            type: ACCOUNT_DELETE_ACCOUNT_DISMISS_ERROR,
        };
        expect(dismissDeleteAccountError()).to.deep.equal(expectedAction);
    });

    it('handles action type ACCOUNT_DELETE_CUSTOMER_ACCOUNT_BEGIN correctly', () => {
        const prevState = { deleteAccountPending: false };
        const state = reducer(prevState, {
            type: ACCOUNT_DELETE_ACCOUNT_BEGIN,
        });
        expect(state).to.not.equal(prevState); // should be immutable
        expect(state.deleteAccountPending).to.be.true;
    });

    it('handles action type ACCOUNT_DELETE_CUSTOMER_ACCOUNT_SUCCESS correctly', () => {
        const prevState = { deleteAccountPending: true };
        const state = reducer(prevState, {
            type: ACCOUNT_DELETE_ACCOUNT_SUCCESS,
            data: {},
        });
        expect(state).to.not.equal(prevState); // should be immutable
        expect(state.deleteAccountPending).to.be.false;
    });

    it('handles action type ACCOUNT_DELETE_CUSTOMER_ACCOUNT_FAILURE correctly', () => {
        const prevState = { deleteAccountPending: true };
        const state = reducer(prevState, {
            type: ACCOUNT_DELETE_ACCOUNT_FAILURE,
            data: { error: new Error('some error') },
        });
        expect(state).to.not.equal(prevState); // should be immutable
        expect(state.deleteAccountPending).to.be.false;
        expect(state.deleteAccountError).to.exist;
    });

    it('handles action type ACCOUNT_DELETE_CUSTOMER_ACCOUNT_DISMISS_ERROR correctly', () => {
        const prevState = { deleteAccountError: new Error('some error') };
        const state = reducer(prevState, {
            type: ACCOUNT_DELETE_ACCOUNT_DISMISS_ERROR,
        });
        expect(state).to.not.equal(prevState); // should be immutable
        expect(state.deleteAccountError).to.be.null;
    });
});
