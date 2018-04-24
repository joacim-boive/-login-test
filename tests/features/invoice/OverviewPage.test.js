import React from 'react';
import { shallow } from 'enzyme';
import { expect } from 'chai';
import { OverviewPage } from 'src/features/invoice/OverviewPage';

describe('invoice/OverviewPage', () => {
  it('renders node with correct class name', () => {
    const props = {
      invoice: {},
      actions: {},
    };
    const renderedComponent = shallow(
      <OverviewPage {...props} />
    );

    expect(
      renderedComponent.find('.invoice-overview-page').getElement()
    ).to.exist;
  });
});
