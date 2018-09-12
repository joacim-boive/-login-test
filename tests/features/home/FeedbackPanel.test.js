import React from 'react';
import { shallow } from 'enzyme';
import { FeedbackPanel } from '../../../src/features/home';

it('renders node with correct class name', () => {
  const renderedComponent = shallow(<FeedbackPanel />);
  expect(renderedComponent.find('.home-feedback-panel').length).toBe(1);
});
