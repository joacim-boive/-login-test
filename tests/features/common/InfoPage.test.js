import React from 'react';
import { shallow } from 'enzyme';
import { expect } from 'chai';
import { InfoPage } from 'src/features/common/InfoPage';

describe('common/InfoPage', () => {
  it('renders node with correct class name', () => {
    const props = {
      common: {},
      actions: {},
    };
    const renderedComponent = shallow(
      <InfoPage {...props} />
    );

    expect(
      renderedComponent.find('.common-info-page').getElement()
    ).to.exist;
  });
});
