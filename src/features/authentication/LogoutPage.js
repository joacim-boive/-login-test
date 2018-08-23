import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import * as actions from './redux/actions';
import { removeSession as removeStorageSession } from '../../common/asyncAjax';
import { removeSession } from './redux/removeSession';

export class LogoutPage extends Component {
    static propTypes = {
        authentication: PropTypes.object.isRequired,
        actions: PropTypes.object.isRequired,
        removeSession: PropTypes.func.isRequired,
    };

    constructor(props) {
        super(props);
        removeStorageSession();
        this.props.removeSession();
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
        actions: bindActionCreators({ ...actions }, dispatch),
        removeSession: () => dispatch(removeSession()),
    };
}

export default connect(mapStateToProps, mapDispatchToProps)(LogoutPage);
