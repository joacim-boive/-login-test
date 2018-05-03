/* eslint-disable jsx-a11y/anchor-is-valid */
import React from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import { Link } from 'react-router-dom';

export class MainMenu extends React.Component {
    render() {
        return (
            <div
                className={classNames({
                    'main-menu': true,
                    dark: this.props.dark,
                    light: !this.props.dark,
                })}
            >
                {this.props.children}
            </div>
        );
    }
}

export const MenuItem = ({ icon, active, children, linkTo, onClick }) => (
    <div
        className={classNames({
            'menu-item': true,
            active,
        })}
    >
        <Link to={linkTo} onClick={onClick}>
            {icon && <img className="menu-item__icon" src={icon} alt="icon" />}
            <div className="menu-item__text">{children}</div>
        </Link>
    </div>
);

MenuItem.propTypes = {
    icon: PropTypes.string,
    active: PropTypes.bool,
    children: PropTypes.node,
    linkTo: PropTypes.string,
    onClick: PropTypes.func,
};

MenuItem.defaultProps = {
    icon: '',
    active: false,
    children: '',
    linkTo: '',
    onClick: () => {},
};

MainMenu.propTypes = {
    children: PropTypes.node.isRequired,
    dark: PropTypes.bool,
};

MainMenu.defaultProps = {
    dark: false,
};
