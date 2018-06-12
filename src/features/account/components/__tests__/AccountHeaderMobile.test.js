/* eslint-disable no-undef,import/no-extraneous-dependencies */
import React from 'react';
import Adapter from 'enzyme-adapter-react-16';
import Enzyme, { shallow } from 'enzyme';
import { AccountHeaderMobile } from './../AccountHeaderMobile';
import accountsActiveJSON from './__mocks__/accountsActive.json';

Enzyme.configure({ adapter: new Adapter() });

const defaultProps = {
    account: accountsActiveJSON[0],
};

const shallowRender = props => shallow(<AccountHeaderMobile {...defaultProps} {...props} />);

describe('AccountHeaderMobile', () => {
    it('renders correctly', () => {
        const component = shallowRender();
        expect(component.exists());
    });

    it('shows account name correctly', () => {
        const component = shallowRender();
        expect(
            component
                .find('.account-header-mobile__card-number')
                .find('h3')
                .text()
        ).toBe('Ecster');
    });

    it('shows account number correctly', () => {
        const component = shallowRender();
        expect(
            component
                .find('.account-header-mobile__card-number')
                .childAt(1)
                .text()
        ).toBe('9752 2380 0038 2595 ');
    });
});
