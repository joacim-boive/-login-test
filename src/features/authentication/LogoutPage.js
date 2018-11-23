import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { removeSession as removeAjaxSession } from '../../common/asyncAjax';
import { resetLoginState, deleteSession } from './redux/actions';

export class LogoutPage extends Component {
    static propTypes = {
        authentication: PropTypes.object.isRequired,
        resetLoginState: PropTypes.func.isRequired,
        deleteSession: PropTypes.func.isRequired,
        clearState: PropTypes.func.isRequired,
    };

    constructor(props) {
        super(props);
        props.deleteSession(props.authentication.loginStatus.sessionKey);
    }

    componentWillReceiveProps(nextProps) {
        const { authentication, resetLoginState, clearState } = this.props;
        if (authentication.deleteSessionPending && nextProps.authentication.deleteSessionPending === false) {
            removeAjaxSession();
            resetLoginState();
            clearState();
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
        resetLoginState: () => dispatch(resetLoginState()),
        deleteSession: sessionKey => dispatch(deleteSession(sessionKey)),
        clearState: () => dispatch({ type: 'CLEAR_STATE' }),
    };
}

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(LogoutPage);
