/* eslint-disable no-undef,import/no-extraneous-dependencies */
import React from 'react';
import Adapter from 'enzyme-adapter-react-16';
import Enzyme, { shallow } from 'enzyme';
import { AccountTransactions } from './../AccountTransactions';
import transactions from '../../../../features/account/components/__tests__/__mocks__/transactions.json';
import { TransactionsPanel } from './../TransactionsPanel';

Enzyme.configure({ adapter: new Adapter() });

const defaultProps = {
    transactions,
};

const shallowRender = props => shallow(<AccountTransactions {...defaultProps} {...props} />);

describe('AccountTransactions', () => {
    it('renders correctly', () => {
        const component = shallowRender();
        expect(component.exists());
    });

    it('renders the correct number of TransactionsPanel', () => {
        const component = shallowRender();
        expect(component.find(TransactionsPanel).length).toBe(7);
    });
});
