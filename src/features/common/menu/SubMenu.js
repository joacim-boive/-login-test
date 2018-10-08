import React from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import classNames from 'classnames';

import './SubMenu.scss';

export class SubMenu extends React.Component {
    constructor(props) {
        super(props);
        this.arrowRef = React.createRef();
    }

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

    animateArrow = () => {
        const arrow = this.arrowRef.current;
        if (this.props.top && this.props.show) {
            arrow.classList.add('show');
        }
    };

    render() {
        const { show, requestClose, children, top, bottom } = this.props;

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

        return (
            <div className="submenu-wrap">
                {top && show && <div className="arrow" ref={this.arrowRef} />}
                <div role="presentation" className={classes} onClick={requestClose} onTransitionEnd={this.animateArrow}>
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
            <Link to={linkTo} href={linkTo} className="no-underline">
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
