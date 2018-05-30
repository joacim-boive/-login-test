import React from 'react';
import { shallow } from 'enzyme';
import { expect } from 'chai';
import { LoginForm } from 'src/features/authentication/LoginForm';

describe('authentication/LoginForm', () => {
  it('renders node with correct class name', () => {
    const props = {
      authentication: {},
      actions: {},
    };
    const renderedComponent = shallow(
      <LoginForm {...props} />
    );

    expect(
      renderedComponent.find('.authentication-login-form').getElement()
    ).to.exist;
  });
});
