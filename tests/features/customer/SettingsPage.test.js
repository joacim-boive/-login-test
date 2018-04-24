import React from 'react';
import { shallow } from 'enzyme';
import { expect } from 'chai';
import { SettingsPage } from 'src/features/customer/SettingsPage';

describe('customer/SettingsPage', () => {
  it('renders node with correct class name', () => {
    const props = {
      customer: {},
      actions: {},
    };
    const renderedComponent = shallow(
      <SettingsPage {...props} />
    );

    expect(
      renderedComponent.find('.customer-settings-page').getElement()
    ).to.exist;
  });
});
