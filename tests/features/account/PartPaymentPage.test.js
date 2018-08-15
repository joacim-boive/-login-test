import React from 'react';
import { shallow } from 'enzyme';
import { PartPaymentPage } from '../../../src/features/account/part-payment/PartPaymentPage';

describe('account/PartPaymentPage', () => {
  it('renders node with correct class name', () => {
    const props = {
      account: {},
      actions: {},
    };
    const renderedComponent = shallow(
      <PartPaymentPage {...props} />
    );

    expect(
      renderedComponent.find('.account-part-payment-page').length
    ).toBe(1);
  });
});
