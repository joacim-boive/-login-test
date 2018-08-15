import React from 'react';
import { shallow } from 'enzyme';
import { MonthlyInvoicePage } from '../../../src/features/invoice/MonthlyInvoicePage';

describe('invoice/MonthlyInvoicePage', () => {
  it('renders node with correct class name', () => {
    const props = {
      invoice: {},
      actions: {},
    };
    const renderedComponent = shallow(
      <MonthlyInvoicePage {...props} />
    );

    expect(
      renderedComponent.find('.invoice-monthly-invoice-page').length
    ).toBe(1);
  });
});
