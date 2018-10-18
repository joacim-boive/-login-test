import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { removeSession as clearSessionStorage } from '../../common/asyncAjax';
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
        const { authentication, removeSession } = this.props;
        if (authentication.deleteSessionPending && nextProps.authentication.deleteSessionPending === false) {
            clearSessionStorage();
            removeSession(); // remove login state
        }
    }

    render() {
        return <div className="authentication-logout-page" />;
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
