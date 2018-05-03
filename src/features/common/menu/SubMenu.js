import React from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import classNames from 'classnames';

export class SubMenu extends React.Component {
    componentDidMount() {
        window.document.body.addEventListener('click', () => {
            if (this.props.show) {
                this.props.requestClose();
            }
        });
    }

    render() {
        const { show, requestClose, children } = this.props;
        const noOfChildren = children.length;

        // note: if changed, update values in StickyNavigation.scss
        const itemHeight = 45;
        const menuHeight = 66;

        const classes = classNames({
            submenu: true,
            show,
        });

        // show? margin bottom equals to menu height
        // don't show? pull down menu equal to height of no of items - main menu height
        const marginBottom = show ? menuHeight : -1 * (itemHeight * noOfChildren - menuHeight);

        return (
            <div className={classes} style={{ marginBottom }} onClick={requestClose}>
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

SubMenu.propTypes = {
    show: PropTypes.bool.isRequired,
    children: PropTypes.node, // SubMenuItems
    requestClose: PropTypes.func.isRequired,
};

SubMenu.defaultProps = {
    children: '',
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
