import React from 'react';
import { shallow } from 'enzyme';
import { BlockCardPanel } from '../../../src/features/card';

it('renders node with correct class name', () => {
  const renderedComponent = shallow(<BlockCardPanel />);
  expect(renderedComponent.find('.card-block-card-panel').length).toBe(1);
});
