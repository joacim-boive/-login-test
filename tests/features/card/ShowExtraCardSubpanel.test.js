import React from 'react';
import { shallow } from 'enzyme';
import { ShowExtraCardSubpanel } from '../../../src/features/card';

it('renders node with correct class name', () => {
  const renderedComponent = shallow(<ShowExtraCardSubpanel />);
  expect(renderedComponent.find('.card-show-extra-card-subpanel').length).toBe(1);
});
