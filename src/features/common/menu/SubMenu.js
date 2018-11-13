import React from 'react';
import PropTypes from 'prop-types';
import { Link } from '@ecster/ecster-components';
import classNames from 'classnames';

import './SubMenu.scss';

const validatePosition = props => {
    if (props.top && props.bottom) {
        return new Error('Only one of "top" and "bottom" can be true');
    }
    if (!props.top && !props.bottom) {
        return new Error('One of "top" or "bottom" must be specified');
    }
    return undefined;
};

export class SubMenu extends React.Component {
    static propTypes = {
        show: PropTypes.bool.isRequired,
        children: PropTypes.node, // SubMenuItems
        requestClose: PropTypes.func.isRequired,
        top: validatePosition,
        bottom: validatePosition,
    };

    static defaultProps = {
        children: '',
        top: false,
        bottom: false,
    };

    constructor(props) {
        super(props);
        this.arrowRef = React.createRef();
    }

    closeMenu = () => {
        const { show, requestClose } = this.props;
        if (show) {
            requestClose();
        }
    };

    handleClick = e => {
        e.stopPropagation();
        e.preventDefault();
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

export const SubMenuItem = ({ id, children, linkTo, iconClass, active }) => {
    const icon = iconClass ? <i className={`e-green ${iconClass}`} /> : undefined;

    return (
        <div
            className={classNames({
                'submenu-item': true,
                active,
            })}
        >
            <Link id={id} to={linkTo} underline={false}>
                <span className="submenu-item__text">{children}</span>
                {icon}
            </Link>
        </div>
    );
};

SubMenuItem.propTypes = {
    id: PropTypes.string,
    children: PropTypes.node, // Link text
    iconClass: PropTypes.string,
    linkTo: PropTypes.string,
    active: PropTypes.bool,
};

SubMenuItem.defaultProps = {
    id: undefined,
    children: '',
    iconClass: 'icon-chevron-right',
    linkTo: '',
    active: false,
};
