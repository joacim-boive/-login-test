import React from 'react';
import { shallow } from 'enzyme';
import { ApplyForCardFailurePanel } from '../../../src/features/card';

it('renders node with correct class name', () => {
  const renderedComponent = shallow(<ApplyForCardFailurePanel />);
  expect(renderedComponent.find('.card-apply-for-card-failure-panel').length).toBe(1);
});
