import React from 'react';
import { shallow } from 'enzyme';
import { expect } from 'chai';
import { SupportPage } from 'src/features/customer/SupportPage';

describe('customer/SupportPage', () => {
  it('renders node with correct class name', () => {
    const props = {
      customer: {},
      actions: {},
    };
    const renderedComponent = shallow(
      <SupportPage {...props} />
    );

    expect(
      renderedComponent.find('.customer-support-page').getElement()
    ).to.exist;
  });
});
