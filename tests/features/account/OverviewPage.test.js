/* eslint-disable no-undef,import/no-extraneous-dependencies */
import React from 'react';
import Enzyme, { shallow } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
import { OverviewPage } from 'src/features/account/OverviewPage';
import accountsJSON from '../../../src/features/account/components/__mocks__/accounts.json';
import accountsActiveJSON from '../../../src/features/account/components/__mocks__/accountsActive.json';

Enzyme.configure({ adapter: new Adapter() });

const defaultProps = {
    accounts: accountsJSON.accounts,
    accountsActive: accountsActiveJSON.accounts,
    actions: {},
    user: {},
    getAccounts: () => {},
};

const shallowRender = props => shallow(<OverviewPage {...defaultProps} {...props} />);

describe('account/OverviewPage', () => {
    it('renders node with correct class name', () => {
        const wrapper = shallowRender();

        expect(wrapper.find('.account-overview-page').exists());
    });

    it('renders all Accounts as children', () => {
        const wrapper = shallowRender();
        const container = wrapper.find('.account-overview-page');

        expect(container.children()).toHaveLength(2);
    });
});
