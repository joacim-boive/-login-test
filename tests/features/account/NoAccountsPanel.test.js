import React from 'react';
import { shallow } from 'enzyme';
import { NoAccountsPanel } from '../../../src/features/account';

it('renders node with correct class name', () => {
  const renderedComponent = shallow(<NoAccountsPanel />);
  expect(renderedComponent.find('.account-no-accounts-panel').length).toBe(1);
});
