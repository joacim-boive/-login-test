import React from 'react';
import { shallow } from 'enzyme';
import { ApplyForCardSuccessPanel } from '../../../src/features/card';

it('renders node with correct class name', () => {
  const renderedComponent = shallow(<ApplyForCardSuccessPanel />);
  expect(renderedComponent.find('.card-apply-for-card-success-panel').length).toBe(1);
});
