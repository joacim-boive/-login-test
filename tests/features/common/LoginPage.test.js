import React from 'react';
import { shallow } from 'enzyme';
import { expect } from 'chai';
import { LoginPage } from 'src/features/common';

describe('common/LoginPageTemplate', () => {
  it('renders node with correct class name', () => {
    const renderedComponent = shallow(
      <LoginPage />
    );

    expect(
      renderedComponent.find('.common-login-page').getElement()
    ).to.exist;
  });
});
