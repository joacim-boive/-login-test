/* eslint-disable no-undef,import/no-extraneous-dependencies */
import React from 'react';
import Enzyme, { shallow } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
import { InvoicePage } from 'src/features/invoice/InvoicePage';

Enzyme.configure({ adapter: new Adapter() });

const defaultProps = {
  invoice: {},
  actions: {},
};

const shallowRender = props => shallow(<InvoicePage {...defaultProps} {...props} />);

describe('invoice/InvoicePage', () => {
    it('renders node with correct class name', () => {
        const wrapper = shallowRender();

        expect(wrapper.find('.invoice-invoice-page').exists());
    });
});
