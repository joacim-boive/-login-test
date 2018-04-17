import React from 'react';
import { shallow } from 'enzyme';
import { expect } from 'chai';
import { AuthenticatedPage } from 'src/features/common';

describe('common/AuthenticatedPageTemplate', () => {
  it('renders node with correct class name', () => {
    const renderedComponent = shallow(
      <AuthenticatedPage />
    );

    expect(
      renderedComponent.find('.common-authenticated-page').getElement()
    ).to.exist;
  });
});
