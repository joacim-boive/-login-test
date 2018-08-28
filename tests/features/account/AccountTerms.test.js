import React from 'react';
import { shallow } from 'enzyme';
import { AccountTermsPage } from '../../../src/features/account/terms/AccountTermsPage';

describe('account/AccountTermsPage', () => {
  it('renders node with correct class name', () => {
    const props = {
      account: {},
      actions: {},
    };
    const renderedComponent = shallow(
      <AccountTermsPage {...props} />
    );

    expect(
      renderedComponent.find('.account-account-terms').length
    ).toBe(1);
  });
});
