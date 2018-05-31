import React from 'react';
import { shallow } from 'enzyme';
import { expect } from 'chai';
import { LoginInProgress } from 'src/features/authentication';

describe('authentication/LoginInProgress', () => {
  it('renders node with correct class name', () => {
    const renderedComponent = shallow(
      <LoginInProgress />
    );

    expect(
      renderedComponent.find('.authentication-login-in-progress').getElement()
    ).to.exist;
  });
});
