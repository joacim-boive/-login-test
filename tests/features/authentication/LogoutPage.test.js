import React from 'react';
import { shallow } from 'enzyme';
import { expect } from 'chai';
import { LogoutPage } from 'src/features/authentication/LogoutPage';

describe('authentication/LogoutPage', () => {
  it('renders node with correct class name', () => {
    const props = {
      authentication: {},
      actions: {},
    };
    const renderedComponent = shallow(
      <LogoutPage {...props} />
    );

    expect(
      renderedComponent.find('.authentication-logout-page').getElement()
    ).to.exist;
  });
});
