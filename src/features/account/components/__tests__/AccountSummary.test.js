/* eslint-disable no-undef,import/no-extraneous-dependencies */
import React from 'react';
import Adapter from 'enzyme-adapter-react-16';
import Enzyme, { shallow } from 'enzyme';
import { AccountSummary } from './../AccountSummary';
import accounts from '../../../../features/account/components/__tests__/__mocks__/accountsActive.json';

Enzyme.configure({ adapter: new Adapter() });

const defaultProps = {
    account: accounts[0],
};

const shallowRender = props => shallow(<AccountSummary {...defaultProps} {...props} />);

describe('AccountSummary', () => {
    it('renders correctly', () => {
        const component = shallowRender();
        expect(component.exists());
    });

    it('renders spendable money', () => {
        const component = shallowRender();
        expect(
            component
                .find('article')
                .at(0)
                .text()
        ).toBe('SEK 5,272.00');
    });
});
