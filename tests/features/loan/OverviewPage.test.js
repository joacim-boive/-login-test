import React from 'react';
import { shallow } from 'enzyme';
import { expect } from 'chai';
import { OverviewPage } from 'src/features/loan/OverviewPage';

describe('loan/OverviewPage', () => {
  it('renders node with correct class name', () => {
    const props = {
      loan: {},
      actions: {},
    };
    const renderedComponent = shallow(
      <OverviewPage {...props} />
    );

    expect(
      renderedComponent.find('.loan-overview-page').getElement()
    ).to.exist;
  });
});
