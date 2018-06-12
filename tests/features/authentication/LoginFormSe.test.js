import React from 'react';
import { shallow } from 'enzyme';
import { expect } from 'chai';
import { LoginFormSE } from 'src/features/authentication/LoginFormSE';

describe('authentication/LoginFormSE', () => {
  it('renders node with correct class name', () => {
    const props = {
      authentication: {},
      actions: {},
    };
    const renderedComponent = shallow(
      <LoginFormSE {...props} />
    );

    expect(
      renderedComponent.find('.authentication-login-form-se').getElement()
    ).to.exist;
  });
});
