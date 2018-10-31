/* eslint-disable jsx-a11y/anchor-is-valid, react/no-multi-comp */
import React from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import { Link } from '@ecster/ecster-components';

export class BottomMenu extends React.Component {
    render() {
        return (
            <div
                className={classNames({
                    'bottom-menu': true,
                    dark: this.props.dark,
                    light: !this.props.dark,
                })}
            >
                {this.props.children}
            </div>
        );
    }
}

export const MenuItem = ({ id, active, children, linkTo }) => (
    <div
        className={classNames({
            'menu-item': true,
            active,
        })}
    >
        <Link id={id} to={linkTo} underline={false}>
            {children}
        </Link>
    </div>
);

export const MenuItemText = ({ children }) => <div className="menu-item__text">{children}</div>;

MenuItem.propTypes = {
    id: PropTypes.string,
    children: PropTypes.node.isRequired,
    active: PropTypes.bool,
    linkTo: PropTypes.string,
};

MenuItem.defaultProps = {
    id: undefined,
    active: false,
    linkTo: '',
};

MenuItemText.propTypes = {
    children: PropTypes.string,
};

MenuItemText.defaultProps = {
    children: '',
};

BottomMenu.propTypes = {
    children: PropTypes.node.isRequired,
    dark: PropTypes.bool,
};

BottomMenu.defaultProps = {
    dark: false,
};
