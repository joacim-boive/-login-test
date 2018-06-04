import React from 'react';
import { shallow } from 'enzyme';
import { AccountTransactionsOverview } from '../../../src/features/customer/AccountTransactionsOverview';

describe('customer/AccountTransactionsOverview', () => {
  it('renders node with correct class name', () => {
    const props = {
      account: {},
      actions: {},
    };
    const renderedComponent = shallow(
      <AccountTransactionsOverview {...props} />
    );

    expect(
      renderedComponent.find('.customer-account-transactions-overview').length
    ).toBe(1);
  });
});
