import React from 'react';
import { shallow } from 'enzyme';
import { ShowExtraCardsPanel } from '../../../src/features/card';

it('renders node with correct class name', () => {
  const renderedComponent = shallow(<ShowExtraCardsPanel />);
  expect(renderedComponent.find('.card-show-extra-cards-panel').length).toBe(1);
});
