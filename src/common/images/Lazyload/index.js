import React from 'react';
import PropTypes from 'prop-types';
import cloudinary from './cloudinary';

import './lazysizes';

const Lazyload = props => {
    const { alt, className, src, widths, ...rest } = props;

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
};

Lazyload.propTypes = {
    alt: PropTypes.string,
    src: PropTypes.string.isRequired,
    widths: PropTypes.arrayOf(PropTypes.number),
    className: PropTypes.string,
};

Lazyload.defaultProps = {
    alt: '',
    widths: null,
    className: '',
};

export default Lazyload;
