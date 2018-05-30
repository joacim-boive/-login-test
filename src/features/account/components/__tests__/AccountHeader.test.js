/* eslint-disable no-undef,import/no-extraneous-dependencies */
import React from 'react';
import Adapter from 'enzyme-adapter-react-16';

import Enzyme, { mount } from 'enzyme';
import { AccountHeader } from './../AccountHeader';

const defaultProps = {
    account: {},
};

Enzyme.configure({ adapter: new Adapter() });

const shallowRender = props => mount(<AccountHeader {...defaultProps} {...props} />);

describe('AccountHeader', () => {
    it('renders correctly', () => {
        const component = shallowRender();
        expect(component.exists());
    });
});
