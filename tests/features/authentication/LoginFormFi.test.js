import React from 'react';
import { shallow } from 'enzyme';
import { expect } from 'chai';
import { LoginFormFI } from 'src/features/authentication/LoginFormFI';

describe('authentication/LoginFormFI', () => {
  it('renders node with correct class name', () => {
    const props = {
      authentication: {},
      actions: {},
    };
    const renderedComponent = shallow(
      <LoginFormFI {...props} />
    );

    expect(
      renderedComponent.find('.authentication-login-form-fi').getElement()
    ).to.exist;
  });
});
