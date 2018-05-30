import React from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import './ButtonPanel.scss';

export const ButtonPanel = ({ className, onClick, children, ...rest }) => {
    const classes = classNames({
        'button-panel': true,
        [className]: className,
    });

    return (
        <button {...rest} className={classes} onClick={onClick}>
            {children}
        </button>
    );
};

ButtonPanel.propTypes = {
    className: PropTypes.string,
    onClick: PropTypes.func.isRequired,
    children: PropTypes.node.isRequired,
};

ButtonPanel.defaultProps = {
    className: '',
};