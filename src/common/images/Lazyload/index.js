import React, { Component } from 'react';
import PropTypes from 'prop-types';
import cloudinary from './cloudinary';

import './Lazyload.scss';

class Lazyload extends Component {
    render() {
        const { alt, className, src, widths, rest } = this.props;

        return (
            <img
                alt={alt}
                className={className}
                src="data:image/gif;base64,R0lGODlhAQABAIAAAP///wAAACH5BAEAAAAALAAAAAABAAEAAAICRAEAOw=="
                data-src={`${cloudinary.defaults},w_{width}${src}`}
                data-absurl="false"
                data-sizes="auto"
                data-widths={`[${widths.join(',')}]`}
                {...rest}
            />
        );
    }
}

Lazyload.propTypes = {
    alt: PropTypes.string.isRequired,
    src: PropTypes.string.isRequired,
    widths: PropTypes.arrayOf(PropTypes.number),
    className: PropTypes.string,
    rest: PropTypes.any,
};

Lazyload.defaultProps = {
    widths: [],
    className: '',
    rest: null,
};

export default Lazyload;
