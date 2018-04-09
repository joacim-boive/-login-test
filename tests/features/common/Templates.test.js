import React from 'react';
import { shallow } from 'enzyme';
import { expect } from 'chai';
import { Templates } from 'src/features/common';

describe('common/Templates', () => {
  it('renders node with correct class name', () => {
    const renderedComponent = shallow(
      <Templates />
    );

    expect(
      renderedComponent.find('.common-templates').getElement()
    ).to.exist;
  });
});
