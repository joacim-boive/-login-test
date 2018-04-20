import React from 'react';
import PropTypes from 'prop-types';
import './MobileNavigation.scss';

class MobileNavigation extends React.Component {
    render() {
        return <div className="mobile-navigation">{this.props.children}</div>;
    }
}

MobileNavigation.propTypes = {
    children: PropTypes.node.isRequired,
};

export default MobileNavigation;
