import React from 'react';
import Adapter from 'enzyme-adapter-react-16';
import Enzyme, { shallow } from 'enzyme';
import { NoAccountsPanel } from '../../../src/features/account';

Enzyme.configure({ adapter: new Adapter() });

it('renders node with correct class name', () => {
    const renderedComponent = shallow(<NoAccountsPanel />);
    expect(renderedComponent.find('.account-no-accounts-panel')).toHaveLength(1);
});
