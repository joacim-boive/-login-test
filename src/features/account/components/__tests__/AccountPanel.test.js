/* eslint-disable no-undef,import/no-extraneous-dependencies */
import React from 'react';
import Adapter from 'enzyme-adapter-react-16';
import Enzyme, { shallow } from 'enzyme';
import { AccountPanel } from './../AccountLinksPanel';

Enzyme.configure({ adapter: new Adapter() });

const defaultProps = {
    className: '',
};

const shallowRender = props => shallow(<AccountPanel {...defaultProps} {...props} />);

describe('AccountPanel', () => {
    it('renders correctly', () => {
        const component = shallowRender();
        expect(component.exists());
    });

    it('shows 6 ArrowLinks by default', () => {
        const component = shallowRender();
        expect(component.find(ArrowLink).length).toBe(6);
    });
});
