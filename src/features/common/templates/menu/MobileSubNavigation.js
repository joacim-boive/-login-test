/* eslint-disable jsx-a11y/no-static-element-interactions */
import React from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import classNames from 'classnames';
import './MobileSubNavigation.scss';

export const MobileSubNavigationSeparator = () => <div className="mobile-sub-navigation__separator" />;

export class MobileSubNavigation extends React.Component {
    componentDidMount() {
        window.document.body.addEventListener('click', () => {
            if (this.props.show) {
                this.props.requestClose();
            }
        });
    }
    componentWillReceiveProps(nextProps) {
        console.log('mobile sub navigation: ', nextProps);
    }

    render() {
        const { show, requestClose, fromTop, children } = this.props;

        const wrapperClassName = classNames({
            'mobile-sub-navigation': true,
            'mobile-sub-navigation--show': show,
            'mobile-sub-navigation--from-top': fromTop,
        });
        const overlayClassName = classNames({
            'mobile-sub-navigation__overlay': true,
            'mobile-sub-navigation__overlay--show': show,
        });
        return (
            <div>
                <div className={wrapperClassName} onClick={requestClose}>
                    {children}
                </div>
                <div className={overlayClassName} onClick={requestClose} />
            </div>
        );
    }
}

export const MobileSubNavigationItem = ({ children, linkTo, iconClass }) => {
    const icon = iconClass ? <i className={`e-green ${iconClass}`} /> : undefined;

    return (
        <Link className="mobile-sub-navigation__link" to={linkTo}>
            <span>{children}</span>
            {icon}
        </Link>
    );
};

MobileSubNavigation.propTypes = {
    show: PropTypes.bool.isRequired,
    requestClose: PropTypes.func,
    fromTop: PropTypes.bool,
    children: PropTypes.node,
};

MobileSubNavigation.defaultProps = {
    show: false,
    requestClose: () => {},
    fromTop: false,
    children: '',
};

MobileSubNavigationItem.propTypes = {
    children: PropTypes.node,
    iconClass: PropTypes.bool,
    linkTo: PropTypes.string,
};

MobileSubNavigationItem.defaultProps = {
    children: '',
    chevron: false,
    linkTo: '',
};

export default MobileSubNavigation;
