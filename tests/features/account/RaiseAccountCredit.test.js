import React from 'react';
import { shallow } from 'enzyme';
import { RaiseCreditPage } from '../../../src/features/account/raise-credit/RaiseCreditPage';

describe('account/RaiseCreditPage', () => {
  it('renders node with correct class name', () => {
    const props = {
      account: {},
      actions: {},
    };
    const renderedComponent = shallow(
      <RaiseCreditPage {...props} />
    );

    expect(
      renderedComponent.find('.account-raise-account-credit').length
    ).toBe(1);
  });
});
