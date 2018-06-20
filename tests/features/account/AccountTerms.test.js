import React from 'react';
import { shallow } from 'enzyme';
import { AccountTerms } from '../../../src/features/account/AccountTerms';

describe('account/AccountTerms', () => {
  it('renders node with correct class name', () => {
    const props = {
      account: {},
      actions: {},
    };
    const renderedComponent = shallow(
      <AccountTerms {...props} />
    );

    expect(
      renderedComponent.find('.account-account-terms').length
    ).toBe(1);
  });
});
