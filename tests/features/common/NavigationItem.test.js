import React from 'react';
import { shallow } from 'enzyme';
import { expect } from 'chai';
import { NavigationItem } from 'src/features/common';

describe('common/NavigationItem', () => {
  it('renders node with correct class name', () => {
    const renderedComponent = shallow(
      <NavigationItem />
    );

    expect(
      renderedComponent.find('.common-navigation-item').getElement()
    ).to.exist;
  });
});
