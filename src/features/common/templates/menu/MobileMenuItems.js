import React from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';

class MobileMenuItems extends React.Component {
    render() {
        return (
            <div
                className={classNames({
                    'mobile-navigation__wrapper': true,
                    dark: this.props.dark,
                    light: !this.props.dark,
                })}
            >
                <div className="mobile-navigation__menu">{this.props.children}</div>
            </div>
        );
    }
}

MobileMenuItems.propTypes = {
    children: PropTypes.node.isRequired,
    dark: PropTypes.bool,
};

MobileMenuItems.defaultProps = {
    dark: false,
};

export default MobileMenuItems;
