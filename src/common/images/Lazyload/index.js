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
    state = {
        isError: false,
    };

    handleError = event => {
        this.setState({ isError: true });

        console.error(`Unable to load image for Ecster card: ${event.target.currentSrc}`);
    };

    render() {
        const { alt, className, src, widths, customTransform, ...rest } = this.props;
        const { isError } = this.state;

        const style = {
            display: isError ? 'none' : 'inherit',
        };

        const dataSrc = customTransform ? `${cloudinary.url}/${customTransform}${src}` : `${cloudinary.defaults}${src}`;
        return (
            <img
                style={style}
                onError={this.handleError}
                alt={alt}
                className={className}
                src="data:image/gif;base64,R0lGODlhAQABAIAAAP///wAAACH5BAEAAAAALAAAAAABAAEAAAICRAEAOw=="
                data-src={dataSrc}
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
    customTransform: PropTypes.string,
};

Lazyload.defaultProps = {
    alt: '',
    widths: null,
    className: '',
    customTransform: undefined,
};

export default Lazyload;
