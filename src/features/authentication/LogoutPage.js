import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { removeSession as removeSessionStorage } from '../../common/asyncAjax';
import { removeSession, deleteSession } from './redux/actions';

export class LogoutPage extends Component {
    static propTypes = {
        authentication: PropTypes.object.isRequired,
        removeSession: PropTypes.func.isRequired,
        deleteSession: PropTypes.func.isRequired,
    };

    constructor(props) {
        super(props);
        props.deleteSession(props.authentication.loginStatus.sessionKey);
    }

    componentWillReceiveProps(nextProps) {
        console.log('componentWillReceiveProps: this.props: ', this.props.authentication.deleteSessionPending);
        console.log('componentWillReceiveProps: nextProps: ', nextProps.authentication.deleteSessionPending);

        if (this.props.authentication.deleteSessionPending && nextProps.authentication.deleteSessionPending === false) {
            console.log('Server session deleted, removing local stuff..');
            removeSessionStorage();
            this.props.removeSession();
        }
    }

    render() {
        return <div className="authentication-logout-page">Page Content: authentication/LogoutPage</div>;
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
        removeSession: () => dispatch(removeSession()),
        deleteSession: sessionKey => dispatch(deleteSession(sessionKey)),
    };
}

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(LogoutPage);
