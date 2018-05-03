import React from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import classNames from 'classnames';

import './SubMenu.scss';

export class SubMenu extends React.Component {
    componentDidMount() {
        window.document.body.addEventListener('click', () => {
            if (this.props.show) {
                this.props.requestClose();
            }
        });
    }

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

        let marginBottom = 0;
        let marginTop = 0;

        if (top) {
            // show? margin bottom equals menu height
            // don't show? pull down menu equal to height of no of items - main menu height
            marginTop = show ? menuHeight : -1 * (itemHeight * noOfChildren - menuHeight);
        }

        if (bottom) {
            // show? margin bottom equals menu height
            // don't show? pull down menu equal to height of no of items - main menu height
            marginBottom = show ? menuHeight : -1 * (itemHeight * noOfChildren - menuHeight);
        }

        return (
            <div className={classes} style={{ marginTop, marginBottom }} onClick={requestClose}>
                {children}
            </div>
        );
    }
}

export const SubMenuItem = ({ children, linkTo, iconClass }) => {
    const icon = iconClass ? <i className={`e-green ${iconClass}`} /> : undefined;

    return (
        <div className="submenu-item">
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
};

SubMenuItem.defaultProps = {
    children: '',
    iconClass: 'icon-chevron-right',
    linkTo: '',
};

export default SubMenu;
