import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import * as actions from './redux/actions';

export class LoginFormFI extends Component {
    static propTypes = {
        authentication: PropTypes.object.isRequired,
        actions: PropTypes.object.isRequired,
    };

    render() {
        return <div className="authentication-login-form-fi">Page Content: authentication/LoginFormFi</div>;
    }
}

/* istanbul ignore next */
function mapStateToProps(state) {
    return {
        authentication: state.authentication,
    };
}

/* istanbul ignore next */
function mapDispatchToProps(dispatch) {
    return {
        actions: bindActionCreators({ ...actions }, dispatch),
    };
}

export default connect(mapStateToProps, mapDispatchToProps)(LoginFormFI);
