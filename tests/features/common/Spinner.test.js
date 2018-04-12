import React from 'react';
import { shallow } from 'enzyme';
import { expect } from 'chai';
import { Spinner } from 'src/features/common';

describe('common/Spinner', () => {
  it('renders node with correct class name', () => {
    const renderedComponent = shallow(
      <Spinner />
    );

    expect(
      renderedComponent.find('.common-spinner').getElement()
    ).to.exist;
  });
});
