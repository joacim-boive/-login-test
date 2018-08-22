/* eslint-disable no-undef,import/no-extraneous-dependencies */
import React from 'react';
import Adapter from 'enzyme-adapter-react-16';
import Enzyme, { shallow } from 'enzyme';
import { AccountLinksPanel } from '../AccountLinksPanel';
import { ArrowLink } from '../../../common/arrow-link/ArrowLink';
import accountsActiveJSON from '../__mocks__/accountsActive.json';
import userJSON from '../__mocks__/user.json';

jest.mock('@ecster/ecster-i18n/lib/Translate', () => ({
    getText: text => text,
}));

Enzyme.configure({ adapter: new Adapter() });

const defaultProps = {
    account: accountsActiveJSON[0],
    user: userJSON,
    className: '',
};

const shallowRender = props => shallow(<AccountLinksPanel {...defaultProps} {...props} />);

describe('AccountLinksPanel', () => {
    it('renders correctly', () => {
        const component = shallowRender();
        expect(component.exists());
    });

    it('shows 6 ArrowLinks by default', () => {
        const component = shallowRender();
        expect(component.find(ArrowLink).length).toBe(6);
    });

    it('sets className if given', () => {
        const component = shallowRender({ className: 'fooBar' });
        expect(component.hasClass('fooBar')).toBe(true);
    });
});
