/* eslint-disable no-undef,import/no-extraneous-dependencies */
import React from 'react';
import Adapter from 'enzyme-adapter-react-16';
import DataRow from '@ecster/ecster-components/DataColumns/DataRow';
import Enzyme, { shallow } from 'enzyme';
import { LatestTransactions } from '../LatestTransactions';
import transactionsJSON from '../__mocks__/transactions.json';

Enzyme.configure({ adapter: new Adapter() });

const defaultProps = {
    transactions: transactionsJSON.splice(0, 3),
};

const shallowRender = props => shallow(<LatestTransactions {...defaultProps} {...props} />);

describe('LatestTransactions', () => {
    it('renders correctly', () => {
        const component = shallowRender();
        expect(component.exists());
    });
    it('renders header plus 3 rows', () => {
        const component = shallowRender();
        expect(component.find(DataRow)).toHaveLength(4);
    });
});
