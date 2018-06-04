import React from 'react';
import { shallow } from 'enzyme';
import { TransactionsOverview } from '../../../src/features/account/TransactionsOverview';

describe('account/TransactionsOverview', () => {
  it('renders node with correct class name', () => {
    const props = {
      account: {},
      actions: {},
    };
    const renderedComponent = shallow(
      <TransactionsOverview {...props} />
    );

    expect(
      renderedComponent.find('.account-transactions-overview').length
    ).toBe(1);
  });
});
