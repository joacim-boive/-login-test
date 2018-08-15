import React from 'react';
import { shallow } from 'enzyme';
import { TerminateAccount } from '../../../src/features/account/terminate-account/TerminateAccount';

describe('account/TerminateAccount', () => {
  it('renders node with correct class name', () => {
    const props = {
      account: {},
      actions: {},
    };
    const renderedComponent = shallow(
      <TerminateAccount {...props} />
    );

    expect(
      renderedComponent.find('.account-terminate-account').length
    ).toBe(1);
  });
});
