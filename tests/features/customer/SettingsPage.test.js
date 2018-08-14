import React from 'react';
import { shallow } from 'enzyme';
import { expect } from 'chai';
import { ProfilePage } from 'src/features/customer/ProfilePage';

describe('customer/ProfilePage', () => {
  it('renders node with correct class name', () => {
    const props = {
      customer: {},
      actions: {},
    };
    const renderedComponent = shallow(
      <ProfilePage {...props} />
    );

    expect(
      renderedComponent.find('.customer-settings-page').getElement()
    ).to.exist;
  });
});
