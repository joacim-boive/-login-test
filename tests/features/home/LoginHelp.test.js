import React from 'react';
import { shallow } from 'enzyme';
import { expect } from 'chai';
import { LoginHelp } from 'src/features/home';

describe('home/LoginHelp', () => {
    it('renders node with correct class name', () => {
        const renderedComponent = shallow(<LoginHelp />);

        expect(renderedComponent.find('.home-login-help').getElement()).to.exist;
    });
});
