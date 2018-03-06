import React from 'react';
import { shallow } from 'enzyme';
import { expect } from 'chai';
import { Start } from 'src/features/home/Start';

describe('home/Start', () => {
  it('renders node with correct class name', () => {
    const props = {
      home: {},
      actions: {},
    };
    const renderedComponent = shallow(
      <Start {...props} />
    );

    expect(
      renderedComponent.find('.home-start').getElement()
    ).to.exist;
  });
});
