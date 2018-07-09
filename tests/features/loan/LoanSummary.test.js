import React from 'react';
import { shallow } from 'enzyme';
import { LoanSummary } from '../../../src/features/loan/LoanSummary';

describe('loan/LoanSummary', () => {
  it('renders node with correct class name', () => {
    const props = {
      loan: {},
      actions: {},
    };
    const renderedComponent = shallow(
      <LoanSummary {...props} />
    );

    expect(
      renderedComponent.find('.loan-loan-summary').length
    ).toBe(1);
  });
});
