/* eslint-disable no-undef,import/no-extraneous-dependencies */
import React from 'react';
import Enzyme, { shallow } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
import { OverviewPage } from 'src/features/invoice/OverviewPage';

Enzyme.configure({ adapter: new Adapter() });

const defaultProps = {
  invoice: {},
  actions: {},
};

const shallowRender = props => shallow(<OverviewPage {...defaultProps} {...props} />);

describe('invoice/OverviewPage', () => {
    it('renders node with correct class name', () => {
        const wrapper = shallowRender();

        expect(wrapper.find('.invoice-overview-page').exists());
    });
});
