import React from 'react';
import { shallow } from 'enzyme';
import { expect } from 'chai';
import { ContactUsPage } from 'src/features/customer/ContactUsPage';

describe('customer/ContactUsPage', () => {
  it('renders node with correct class name', () => {
    const props = {
      customer: {},
      actions: {},
    };
    const renderedComponent = shallow(
      <ContactUsPage {...props} />
    );

    expect(
      renderedComponent.find('.customer-contact-us-page').getElement()
    ).to.exist;
  });
});
