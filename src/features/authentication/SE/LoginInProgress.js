import React, { Component } from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import { Button, ButtonGroup, Spinner, LinkButton } from '@ecster/ecster-components';
import { getText as i18n } from '@ecster/ecster-i18n/lib/Translate';

export default class LoginInProgress extends Component {
    state = {
        showButton: false,
        showSpinner: true,
    };

    componentWillReceiveProps(nextProps) {
        if (nextProps.isVisible && !this.state.showButton) {
            // start a timer unless already started
            this.showButtonTimer =
                this.showButtonTimer ||
                setTimeout(() => {
                    this.setState({ showButton: true });
                }, 5000);
        }

        if (!nextProps.isVisible) {
            this.setState({ showButton: false });
            if (this.showButtonTimer) {
                clearTimeout(this.showButtonTimer);
            }
        }

        if (nextProps.loginStatus === 'USER_SIGN') {
            this.setState({ showButton: false });
        } else if (
            [
                'COMPLETE',
                'EXPIRED_TRANSACTION',
                'CERTIFICATE_ERROR',
                'USER_CANCEL',
                'CANCELLED',
                'START_FAILED',
                'TECHNICAL_ERROR',
            ].includes(nextProps.loginStatus)
        ) {
            this.setState({ showButton: false, showSpinner: false });
        } else {
            // Other statuses 'STARTED', 'OUTSTANDING_TRANSACTION', 'NO_CLIENT'
            this.setState({ showSpinner: true });
        }

        // If error when creating a new session or polling a session then hide the spinner
        if (nextProps.createSessionError || nextProps.getSessionError) {
            this.setState({ showSpinner: false });
        }
    }

    onCancel = () => {
        if (this.showButtonTimer) {
            clearTimeout(this.showButtonTimer);
        }
        this.setState({ showButton: false });
        this.props.cancelLogin();
    };

    render() {
        const {
            isVisible,
            isDesktop,
            isOnThisDevice,
            startURL,
            loginStatus,
            getSessionError,
            createSessionError,
        } = this.props;
        const { showButton, showSpinner } = this.state;

        const buttonClasses = classNames({
            'start-manually': true,
            hidden: !isOnThisDevice || !showButton,
        });

        const whichDevice = isOnThisDevice ? 'this-device' : 'other-device';
        const deviceType = isDesktop ? 'desktop' : 'touch';

        const headerI18nKey = `home.login.SE.in-progress.${deviceType}.${whichDevice}.header`;

        let bodyI18nKey;
        // Texts below are from the bankid-relying-party-guidelines-v3.1.pdf
        switch (loginStatus) {
            case 'USER_SIGN':
                bodyI18nKey = `home.login.SE.in-progress.${deviceType}.${whichDevice}.body-user-sign`;
                break;
            case 'EXPIRED_TRANSACTION':
                bodyI18nKey = `home.login.SE.in-progress.${deviceType}.${whichDevice}.body-expired-transaction`;
                break;
            case 'CERTIFICATE_ERROR':
                bodyI18nKey = `home.login.SE.in-progress.${deviceType}.${whichDevice}.body-certificate-error`;
                break;
            case 'USER_CANCEL':
                bodyI18nKey = `home.login.SE.in-progress.${deviceType}.${whichDevice}.body-user-cancel`;
                break;
            case 'CANCELLED':
                bodyI18nKey = `home.login.SE.in-progress.${deviceType}.${whichDevice}.body-cancelled`;
                break;
            case 'STARTED':
                bodyI18nKey = `home.login.SE.in-progress.${deviceType}.${whichDevice}.body-started`;
                break;
            case 'START_FAILED':
                bodyI18nKey = `home.login.SE.in-progress.${deviceType}.${whichDevice}.body-start-failed`;
                break;
            case 'TECHNICAL_ERROR':
                bodyI18nKey = `home.login.SE.in-progress.${deviceType}.${whichDevice}.body-internal-error`;
                break;
            default:
                bodyI18nKey = `home.login.SE.in-progress.${deviceType}.${whichDevice}.body`;
        }

        // Handle already in progress when starting a login
        const error =
            (createSessionError && createSessionError.response) || (getSessionError && getSessionError.response);

        if (error) {
            const err = JSON.parse(error);
            if (err.detail && err.detail.indexOf('ALREADY_IN_PROGRESS') !== 0) {
                bodyI18nKey = `home.login.SE.in-progress.${deviceType}.${whichDevice}.body-already-in-progress`;
            } else {
                // Not sure what is wrong, but something went wrong so show the internal error text
                bodyI18nKey = `home.login.SE.in-progress.${deviceType}.${whichDevice}.body-internal-error`;
            }
        }

        const i18nBody = i18n(bodyI18nKey, {
            returnObjects: true,
            wrapper: { tag: 'p', dangerouslySetInnerHTML: true },
        });

        return (
            isVisible && (
                <div className="authentication-login-in-progress">
                    <h1 className="e-green120">{i18n(headerI18nKey)}</h1>
                    {i18nBody}
                    <Spinner id="login-se-login-in-progress-spinner" isVisible={showSpinner} isCenterX />
                    <ButtonGroup alignCenter space={false}>
                        <Button link onClick={this.onCancel} space={false} name="cancel-login-button">
                            {i18n('general.cancel')}
                        </Button>
                    </ButtonGroup>
                    <div className={buttonClasses}>
                        <p className="mt-8x mb-4x">{i18n('home.login.SE.in-progress.manual.info')}</p>
                        <LinkButton href={startURL} outline round gaLabel="start-bid-manually">
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
