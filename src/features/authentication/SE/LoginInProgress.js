import React, { Component } from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import {Button, Spinner, LinkButton, Panel} from '@ecster/ecster-components';
import { getText as i18n } from '@ecster/ecster-i18n/lib/Translate';
// import Overlay from '../../common/Overlay';

export default class LoginInProgress extends Component {
    state = {
        showButton: false,
        showSpinner: true,
    };

    componentWillReceiveProps(nextProps) {
        if (nextProps.isVisible && !this.state.showButton) {
            setTimeout(() => {
                this.setState({ showButton: true });
            }, 5000);
        }

        if (nextProps.loginStatus === 'USER_SIGN') {
            this.setState({ showButton: false });
        } else if (['COMPLETE', 'EXPIRED_TRANSACTION', 'CERTIFICATE_ERROR', 'USER_CANCEL', 'CANCELLED', 'START_FAILED', 'TECHNICAL_ERROR'].includes(nextProps.loginStatus)) {
            this.setState({ showButton: false, showSpinner: false });
        } else {
            // Other statuses 'STARTED', 'OUTSTANDING_TRANSACTION', 'NO_CLIENT'
            this.setState({ showSpinner: true });
        }
    }

    onCancel = () => {
        this.setState({ showButton: false });
        this.props.cancelLogin();
    };

    render() {
        const { isVisible, isDesktop, isOnThisDevice, startURL, loginStatus, getSessionError, createSessionError } = this.props;
        const { showButton, showSpinner } = this.state;

        const buttonClasses = classNames({
            'start-manually': true,
            hidden: !isOnThisDevice || !showButton,
        });

        const whichDevice = isOnThisDevice ? 'this-device' : 'other-device';
        const deviceType = isDesktop ? 'desktop' : 'touch';

        const headerI18nKey = `home.login.SE.in-progress.${deviceType}.${whichDevice}.header`;

        let bodyI18nKey = `home.login.SE.in-progress.${deviceType}.${whichDevice}.body`;

        console.log('LoginProgress Poll status', loginStatus);

        //Texts below are from the bankid-relying-party-guidelines-v3.1.pdf
        if (loginStatus === 'USER_SIGN') {
            bodyI18nKey = `home.login.SE.in-progress.${deviceType}.${whichDevice}.body-user-sign`;
        }
        if (loginStatus === 'EXPIRED_TRANSACTION') {
            bodyI18nKey = `home.login.SE.in-progress.${deviceType}.${whichDevice}.body-expired-transaction`;
        }
        if (loginStatus === 'CERTIFICATE_ERROR') {
            bodyI18nKey = `home.login.SE.in-progress.${deviceType}.${whichDevice}.body-certificate-error`;
        }
        if (loginStatus === 'USER_CANCEL') {
            bodyI18nKey = `home.login.SE.in-progress.${deviceType}.${whichDevice}.body-user-cancel`;
        }
        if (loginStatus === 'CANCELLED') {
            bodyI18nKey = `home.login.SE.in-progress.${deviceType}.${whichDevice}.body-cancelled`;
        }
        if (loginStatus === 'STARTED') {
            bodyI18nKey = `home.login.SE.in-progress.${deviceType}.${whichDevice}.body-started`;
        }
        if (loginStatus === 'START_FAILED') {
            bodyI18nKey = `home.login.SE.in-progress.${deviceType}.${whichDevice}.body-start-failed`;
        }
        if (loginStatus === 'TECHNICAL_ERROR') {
            bodyI18nKey = `home.login.SE.in-progress.${deviceType}.${whichDevice}.body-internal-error`;
        }
        const i18nBody = i18n(bodyI18nKey, {
            returnObjects: true,
            wrapper: { tag: 'p', dangerouslySetInnerHTML: true },
        });

        return (
            isVisible && (
                <div className="authentication-login-in-progress">
                    <h1>{i18n(headerI18nKey)}</h1>
                    {i18nBody}
                    <Spinner id="login-se-login-in-progress-spinner" isVisible={showSpinner} isCenterX />
                    <p>{loginStatus}</p>
                    <p>{getSessionError}</p>
                    <p>{createSessionError}</p>
                    <Button link onClick={this.onCancel} name="cancel-login-button">
                        {i18n('general.cancel')}
                    </Button>

                    <div className={buttonClasses}>
                        <p className="mt-8x mb-4x">{i18n('home.login.SE.in-progress.manual.info')}</p>
                        <LinkButton href={startURL} outline round>
                            {i18n('home.login.SE.in-progress.manual.button')}
                        </LinkButton>
                    </div>
                </div>
            )
        );
    }
}

LoginInProgress.propTypes = {
    isVisible: PropTypes.bool.isRequired,
    isDesktop: PropTypes.bool.isRequired,
    isOnThisDevice: PropTypes.bool.isRequired,
    // toggleState: PropTypes.func.isRequired,
    cancelLogin: PropTypes.func.isRequired,
    startURL: PropTypes.string,
    loginStatus: PropTypes.string.isRequired,
};

LoginInProgress.defaultProps = {
    startURL: undefined,
};
