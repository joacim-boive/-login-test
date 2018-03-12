import React from 'react';
import { shallow } from 'enzyme';
import { expect } from 'chai';
import { OverviewPage } from 'src/features/account/OverviewPage';

describe('account/OverviewPage', () => {
  it('renders node with correct class name', () => {
    const props = {
      account: {},
      actions: {},
    };
    const renderedComponent = shallow(
      <OverviewPage {...props} />
    );

    expect(
      renderedComponent.find('.account-overview-page').getElement()
    ).to.exist;
  });
});
