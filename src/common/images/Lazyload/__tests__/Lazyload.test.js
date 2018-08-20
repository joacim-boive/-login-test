import React from 'react';
import Adapter from 'enzyme-adapter-react-16';
import Enzyme, { shallow } from 'enzyme';
import Lazyload from '../index';

Enzyme.configure({ adapter: new Adapter() });

const alt = 'This is the alt text';
const src = '/logo.jpg';
const widths = [100, 200];

const defaultProps = {
    alt,
    src,
    widths,
};

const shallowRender = props => shallow(<Lazyload {...defaultProps} {...props} />);

describe('Lazyload', () => {
    it('renders correctly', () => {
        const component = shallowRender();
        expect(component.exists()).toBe(true);
    });

    it('should have an image tag', () => {
        const component = shallowRender();

        expect(component.find('img')).toHaveLength(1);
    });

    it('should have an alt-attribute set to the provided value', () => {
        const component = shallowRender();

        expect(component.find('img').props()).toHaveProperty('alt', alt);
        expect(component.find('img').props()).toHaveProperty('alt');
    });

    it('should have a data-widths attribute set to a string when values are provided', () => {
        const component = shallowRender();

        expect(component.find('img').props()).toHaveProperty('data-widths', `[${widths.join(',')}]`);
    });

    it('should not have a data-widths-attribute if no value is provided', () => {
        const component = shallowRender({ widths: null });

        expect(component.find('img').props()).toHaveProperty('data-widths', null);
    });
});
