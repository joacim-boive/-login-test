import React from 'react';
import { shallow } from 'enzyme';
import { ApplyForExtraCardPanel } from '../../../src/features/card';

it('renders node with correct class name', () => {
  const renderedComponent = shallow(<ApplyForExtraCardPanel />);
  expect(renderedComponent.find('.card-apply-for-extra-card-panel').length).toBe(1);
});
