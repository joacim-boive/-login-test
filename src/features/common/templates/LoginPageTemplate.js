import React, { Component } from 'react';
import PropTypes from 'prop-types';

export default class LoginPage extends Component {
    static propTypes = {
        children: PropTypes.node.isRequired,
    };

    render() {
        return <div className="common-login-page">{this.props.children}</div>;
    }
}
