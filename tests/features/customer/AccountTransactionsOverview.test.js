import React from 'react';
import Adapter from 'enzyme-adapter-react-16';
import Enzyme, { shallow } from 'enzyme';
import { AccountTransactionsOverview } from '../../../src/features/customer/AccountTransactionsOverview';

Enzyme.configure({ adapter: new Adapter() });

describe('customer/AccountTransactionsOverview', () => {
    it('renders node with correct class name', () => {
        const props = {
            account: {},
            actions: {},
        };
        const renderedComponent = shallow(<AccountTransactionsOverview {...props} />);

        expect(renderedComponent.find('.customer-account-transactions-overview').length).toBe(1);
    });
});
