import React from 'react';
import { shallow } from 'enzyme';
import { ActivateExtraCardSubpanel } from '../../../src/features/card';

it('renders node with correct class name', () => {
  const renderedComponent = shallow(<ActivateExtraCardSubpanel />);
  expect(renderedComponent.find('.card-activate-extra-card-subpanel').length).toBe(1);
});
