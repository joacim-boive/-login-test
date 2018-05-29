import React from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import classNames from 'classnames';

import './SubMenu.scss';

export class SubMenu extends React.Component {
    closeMenu = e => {
        if (this.props.show) {
            e.stopPropagation();
            this.props.requestClose();
        }
    };

    handleClick = e => {
        this.closeMenu(e);
    };

    handleEscape = e => {
        if (e.which === 27) {
            this.closeMenu(e);
        }
    };

    addListeners = () => {
        window.document.body.addEventListener('click', this.handleClick);
        window.document.body.addEventListener('keyup', this.handleEscape);
    };

    removeListeners = () => {
        window.document.body.removeEventListener('click', this.handleClick);
        window.document.body.removeEventListener('keyup', this.handleEscape);
    };

    render() {
        const { show, requestClose, children, top, bottom } = this.props;
        const noOfChildren = children.length;

        // note: if changed, update values in StickyNavigation.scss
        const itemHeight = 45;
        const menuHeight = 66;

        const classes = classNames({
            submenu: true,
            show,
            'from-top': top,
            'from-bottom': bottom,
        });

        if (show) {
            this.addListeners();
        } else {
            this.removeListeners();
        }

        let marginBottom = 0;
        let marginTop = 0;

        if (top) {
            // show? margin bottom equals menu height
            // don't show? pull upp menu equal to height of no of items - main menu height + 4px for box shadow
            // marginTop = show ? menuHeight : -1 * (itemHeight * noOfChildren - menuHeight + 4);
            marginTop = show ? 0 : -1 * (itemHeight * noOfChildren + 4);
        }

        if (bottom) {
            // show? margin bottom equals menu height
            // don't show? pull down menu equal to height of no of items - main menu height
            // marginBottom = show ? menuHeight : -1 * (itemHeight * noOfChildren - menuHeight);
            marginBottom = show ? menuHeight : -1 * (itemHeight * noOfChildren - menuHeight);
        }

        return (
            <div>
                {top && show && <div className="arrow" />}
                <div className={classes} style={{ marginTop, marginBottom }} onClick={requestClose}>
                    {children}
                </div>
            </div>
        );
    }
}

export const SubMenuItem = ({ children, linkTo, iconClass, active }) => {
    const icon = iconClass ? <i className={`e-green ${iconClass}`} /> : undefined;

    return (
        <div
            className={classNames({
                'submenu-item': true,
                active,
            })}
        >
            <Link to={linkTo}>
                <span className="submenu-item__text">{children}</span>
                {icon}
            </Link>
        </div>
    );
};

const validatePosition = props => {
    if (props.top && props.bottom) {
        return new Error('Only one of "top" and "bottom" can be true');
    }
    if (!props.top && !props.bottom) {
        return new Error('One of "top" or "bottom" must be specified');
    }
    return undefined;
};

SubMenu.propTypes = {
    show: PropTypes.bool.isRequired,
    children: PropTypes.node, // SubMenuItems
    requestClose: PropTypes.func.isRequired,
    top: validatePosition,
    bottom: validatePosition,
};

SubMenu.defaultProps = {
    children: '',
    top: false,
    bottom: false,
};

SubMenuItem.propTypes = {
    children: PropTypes.node, // Link text
    iconClass: PropTypes.string,
    linkTo: PropTypes.string,
    active: PropTypes.bool,
};

SubMenuItem.defaultProps = {
    children: '',
    iconClass: 'icon-chevron-right',
    linkTo: '',
    active: false,
};
