import React from 'react';
import { shallow } from 'enzyme';
import { ManageCardPage } from '../../../src/features/card/ManageCardPage';

describe('card/ManageCardPage', () => {
  it('renders node with correct class name', () => {
    const props = {
      card: {},
      actions: {},
    };
    const renderedComponent = shallow(
      <ManageCardPage {...props} />
    );

    expect(
      renderedComponent.find('.card-manage-card-page').length
    ).toBe(1);
  });
});
