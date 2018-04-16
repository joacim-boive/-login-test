import React, { Component } from 'react';
import PropTypes from 'prop-types';

export default class Panel extends Component {
    static propTypes = {
        children: PropTypes.node,
    };

    static defaultProps = {
        children: undefined,
    };

    render() {
        return <div className="common-panel">{this.props.children}</div>;
    }
}
