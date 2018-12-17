import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { Panel } from '@ecster/ecster-components';
import { setPageView } from '@ecster/ecster-analytics/v2';
import LoginPageTemplate from '../common/templates/LoginPageTemplate';
import LoginForm from '../authentication/LoginForm';
import AfterLogoutPanel from './AfterLogoutPanel';

import { clearJustLoggedOut } from '../authentication/redux/actions';

class LoginPage extends Component {
    static propTypes = {
        loginStatus: PropTypes.shape().isRequired,
        clearJustLoggedOut: PropTypes.func.isRequired,
    };

    componentDidMount() {
        const { loginStatus } = this.props;
        if (!loginStatus.justLoggedOut) {
            this.gaPageView(); // auto page view for '#/' is disabled
        }
    }

    componentWillUnmount() {
        const { clearJustLoggedOut } = this.props;
        clearJustLoggedOut();
    }

    loginAgain = () => {
        const { clearJustLoggedOut } = this.props;
        this.gaPageView();
        clearJustLoggedOut();
    };

    gaPageView = () => {
        setPageView('/login', 'Login page');
    };

    render() {
        const { loginStatus } = this.props;
        return (
            <LoginPageTemplate>
                {loginStatus.justLoggedOut ? (
                    <AfterLogoutPanel loginAgain={this.loginAgain} />
                ) : (
                    <Panel id="home-login-page" withMixedContent maxWidth="50rem" className="login-page-panel">
                        <LoginForm />
                    </Panel>
                )}
            </LoginPageTemplate>
        );
    }
}

/* istanbul ignore next */
function mapStateToProps({ authentication }) {
    return {
        loginStatus: authentication.loginStatus,
    };
}

/* istanbul ignore next */
function mapDispatchToProps(dispatch) {
    return {
        clearJustLoggedOut: () => dispatch(clearJustLoggedOut()),
    };
}

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(LoginPage);
