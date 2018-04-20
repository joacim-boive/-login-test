import React from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import { Link } from 'react-router-dom';
import './MobileMenuItem.scss';

const MobileMenuItem = ({ icon, active, children, linkTo, onClick }) => {
    const wrapperClass = classNames({
        'mobile-menu-item': true,
        'mobile-menu-item--active': active,
    });
    return (
        <Link to={linkTo} className={wrapperClass} onClick={onClick}>
            {icon && (
                <div className="mobile-menu-item__left">
                    <img className="mobile-menu-item__icon" src={icon} alt="icon" />
                    <span className="mobile-menu-item__icon-text">{children}</span>
                </div>
            )}
        </Link>
    );
};

MobileMenuItem.propTypes = {
    icon: PropTypes.string,
    active: PropTypes.bool,
    children: PropTypes.node,
    linkTo: PropTypes.string,
    onClick: PropTypes.func,
};

MobileMenuItem.defaultProps = {
    icon: '',
    active: false,
    children: '',
    linkTo: '',
    onClick: () => {},
};

export default MobileMenuItem;
