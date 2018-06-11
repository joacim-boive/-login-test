import React from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import { Link } from 'react-router-dom';
import './ArrowLink.scss';

export const ArrowLink = ({ className, icon, text, onClick, to, ...rest }) => {
    const classes = classNames({
        'arrow-link': true,
        [className]: className,
    });

    return (
        <Link {...rest} to={to} onClick={onClick} className={classes}>
            {icon ? <i className={icon} /> : null}
            <div className="arrow-link__wrapper">
                <div>{text}</div>
                <i className="icon-chevron-right" />
            </div>
        </Link>
    );
};

ArrowLink.propTypes = {
    className: PropTypes.string,
    icon: PropTypes.string,
    text: PropTypes.string.isRequired,
    onClick: PropTypes.func,
    to: PropTypes.string,
};

ArrowLink.defaultProps = {
    className: '',
    icon: '',
    onClick: () => {
        console.log('Clicked ArrowLink');
    },
    to: '',
};
