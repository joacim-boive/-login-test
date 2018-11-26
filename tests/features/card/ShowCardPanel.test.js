import React from 'react';
import { shallow } from 'enzyme';
import { ShowCardPanel } from '../../../src/features/card';

it('renders node with correct class name', () => {
  const renderedComponent = shallow(<ShowCardPanel />);
  expect(renderedComponent.find('.card-show-card-panel').length).toBe(1);
});
