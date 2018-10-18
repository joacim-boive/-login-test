import React from 'react';
import { shallow } from 'enzyme';
import { OnboardingDialog } from '../../../src/features/common';

it('renders node with correct class name', () => {
  const renderedComponent = shallow(<OnboardingDialog />);
  expect(renderedComponent.find('.common-onboarding-dialog').length).toBe(1);
});
