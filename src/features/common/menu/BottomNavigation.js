import React from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import './BottomNavigation.scss';

class BottomNavigation extends React.Component {
    render() {
        return (
            <div className="bottom-navigation">
                {this.props.children}
                <div
                    className={classNames({
                        'page-overlay': true,
                        show: this.props.showOverlay,
                    })}
                />
            </div>
        );
    }
}

BottomNavigation.propTypes = {
    children: PropTypes.node.isRequired,
    showOverlay: PropTypes.bool.isRequired,
};

BottomNavigation.defaultProps = {};

export default BottomNavigation;
