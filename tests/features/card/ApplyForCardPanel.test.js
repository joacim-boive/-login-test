import React from 'react';
import { shallow } from 'enzyme';
import { ApplyForCardPanel } from '../../../src/features/card';

it('renders node with correct class name', () => {
  const renderedComponent = shallow(<ApplyForCardPanel />);
  expect(renderedComponent.find('.card-apply-for-card-panel').length).toBe(1);
});
