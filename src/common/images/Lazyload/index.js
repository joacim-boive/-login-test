import React, { Component } from 'react';
import PropTypes from 'prop-types';
import cloudinary from './cloudinary';

import './lazysizes';

/**
 * Lazyloading of images using Lazysizes
 * https://github.com/aFarkas/lazysizes
 *
 * The highres file has to exist on the Cloudinary CDN for this to work.
 *
 * src - is the smallest possible inline image to not issue any unnecessary HTTP requests before the actual image loads.
 * w_{width} - is a hook that Lazysizes uses to determine the optimum size for this particular request.
 * data-sizes - set to "auto" to allow Lazysizes to select the best size.
 * data-widths - here you specify an array of sizes for Lazysizes to choose from - it will automically select the closest
 * match for this particular request.
 */
class Lazyload extends Component {
    render() {
        const { alt, className, src, widths, rest } = this.props;

        return (
            <img
                alt={alt}
                className={className}
                src="data:image/gif;base64,R0lGODlhAQABAIAAAP///wAAACH5BAEAAAAALAAAAAABAAEAAAICRAEAOw=="
                data-src={`${cloudinary.defaults}${src}`}
                data-absurl="false"
                data-sizes="auto"
                data-widths={widths ? `[${widths.join(',')}]` : null}
                {...rest}
            />
        );
    }
}

Lazyload.propTypes = {
    alt: PropTypes.string,
    src: PropTypes.string.isRequired,
    widths: PropTypes.arrayOf(PropTypes.number),
    className: PropTypes.string,
    rest: PropTypes.any,
};

Lazyload.defaultProps = {
    alt: '',
    widths: null,
    className: '',
    rest: null,
};

export default Lazyload;
