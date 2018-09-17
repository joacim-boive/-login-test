import React from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';

export const Footer = ({ className, ...rest }) => {
    const classes = classNames({
        [className]: className,
    });

    return (
        <footer className={classes} {...rest}>
            <div />
            <div />
            <div />
        </footer>
    );
};

Footer.propTypes = {
    className: PropTypes.string,
};

Footer.defaultProps = {
    className: '',
};
