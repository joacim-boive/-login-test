// TODO: move to ecster-components

import React from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';

import './WhiteBox.scss';

const WhiteBox = ({ children, className, ...rest }) => (
    <section
        {...rest}
        className={classNames({
            'white-box': true,
            [className]: true,
        })}
    >
        {children}
    </section>
);

export default WhiteBox;

WhiteBox.propTypes = {
    children: PropTypes.shape().isRequired,
    className: PropTypes.string,
};

WhiteBox.defaultProps = {
    className: '',
};
