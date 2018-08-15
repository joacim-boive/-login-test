import React from 'react';
import { shallow } from 'enzyme';
import { ExtraCardPage } from '../../../src/features/card/ExtraCardPage';

describe('card/ExtraCardPage', () => {
  it('renders node with correct class name', () => {
    const props = {
      card: {},
      actions: {},
    };
    const renderedComponent = shallow(
      <ExtraCardPage {...props} />
    );

    expect(
      renderedComponent.find('.card-extra-card-page').length
    ).toBe(1);
  });
});
