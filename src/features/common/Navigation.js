import React, { Component } from 'react';
import PropTypes from 'prop-types';
// import NavigationItem from './NavigationItem';

export default class Navigation extends Component {
    static propTypes = {
        // TODO: check type is NavigationItem
        children: PropTypes.node.isRequired,
    };

    render() {
        return <ul className="common-navigation">{this.props.children}</ul>;
    }
}
