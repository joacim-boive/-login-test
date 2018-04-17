import React from 'react';
import { shallow } from 'enzyme';
import { expect } from 'chai';
import { AboutMbid } from 'src/features/home';

describe('home/AboutMbid', () => {
  it('renders node with correct class name', () => {
    const renderedComponent = shallow(
      <AboutMbid />
    );

    expect(
      renderedComponent.find('.home-about-mbid').getElement()
    ).to.exist;
  });
});
