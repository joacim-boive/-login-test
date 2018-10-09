import React from 'react';
import { shallow } from 'enzyme';
import { AfterLogout } from '../../../src/features/home';

it('renders node with correct class name', () => {
  const renderedComponent = shallow(<AfterLogout />);
  expect(renderedComponent.find('.home-after-logout').length).toBe(1);
});
