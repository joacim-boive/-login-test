import React from 'react';
import PropTypes from 'prop-types';

export default class LoginPageTemplate extends React.Component {
    static propTypes = {
        children: PropTypes.node.isRequired,
    };

    render() {
        return <div className="common-login-page">{this.props.children}</div>;
    }
}
