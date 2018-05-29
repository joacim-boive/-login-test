/* eslint-disable jsx-a11y/anchor-is-valid, react/no-multi-comp */
import React from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import { Link } from 'react-router-dom';

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

export const MenuItem = ({ active, children, linkTo, onClick }) => (
    <div
        className={classNames({
            'menu-item': true,
            active,
        })}
    >
        <Link to={linkTo} onClick={onClick}>
            {children}
        </Link>
    </div>
);

// export class MenuItem extends React.Component {
//     onClick = e => {
//         e.stopPropagation();
//         this.props.onClick();
//     };
//
//     render() {
//         const { active, children, linkTo, onClick } = this.props;
//         return (
//             <div
//                 className={classNames({
//                     'menu-item': true,
//                     active,
//                 })}
//             >
//                 <Link to={linkTo} onClick={this.onClick}>
//                     {children}
//                 </Link>
//             </div>
//         );
//     }
// }

export const MenuItemText = ({ children }) => <div className="menu-item__text">{children}</div>;

MenuItem.propTypes = {
    children: PropTypes.node.isRequired,
    active: PropTypes.bool,
    linkTo: PropTypes.string,
    onClick: PropTypes.func,
};

MenuItem.defaultProps = {
    active: false,
    linkTo: '',
    onClick: () => {},
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
