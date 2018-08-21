/* eslint-disable no-undef,import/no-extraneous-dependencies */
import React from 'react';
import Adapter from 'enzyme-adapter-react-16';
import Enzyme, { shallow } from 'enzyme';
import { Component as AccountPanel } from './../AccountPanel';
import accountsActiveJSON from '../__mocks__/accountsActive.json';
import userJSON from '../__mocks__/user.json';

Enzyme.configure({ adapter: new Adapter() });

const defaultProps = {
    account: accountsActiveJSON[0],
    user: userJSON,
    getAccountTransactions: () => {},
    getAccountBills: () => {},
    className: '',
};

const shallowRender = props => shallow(<AccountPanel {...defaultProps} {...props} />);

describe('AccountPanel', () => {
    it('renders correctly', () => {
        const component = shallowRender();
        expect(component.exists());
    });
});
