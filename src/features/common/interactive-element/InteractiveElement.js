import React from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import './InteractiveElement.scss';

export const InteractiveElement = ({ className, children, ...rest }) => {
    const classes = classNames({
        'interactive-element': true,
        [className]: className,
    });
    return (
        <button className={classes} {...rest}>
            {children}
        </button>
    );
};

InteractiveElement.propTypes = {
    className: PropTypes.string,
    children: PropTypes.node,
};

InteractiveElement.defaultProps = {
    className: '',
    children: <div />,
};
