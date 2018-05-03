import React from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import './StickyNavigation.scss';

class StickyNavigation extends React.Component {
    render() {
        return (
            <div className="sticky-navigation">
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

StickyNavigation.propTypes = {
    children: PropTypes.node.isRequired,
    showOverlay: PropTypes.bool.isRequired,
};

export default StickyNavigation;
