import React from 'react';
import { shallow } from 'enzyme';
import { ActivateCardPanel } from '../../../src/features/card';

it('renders node with correct class name', () => {
  const renderedComponent = shallow(<ActivateCardPanel />);
  expect(renderedComponent.find('.card-activate-card-panel').length).toBe(1);
});
