import React, { Component } from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import { Button, Spinner, LinkButton } from '@ecster/ecster-components';
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
        }
        if (['EXPIRED_TRANSACTION', 'START_FAILED'].includes(nextProps.loginStatus)) {
            this.setState({ showButton: false, showSpinner: false });
        }
    }

    onCancel = () => {
        this.setState({ showButton: false });
        this.props.cancelLogin();
    };

    render() {
        const { isVisible, isDesktop, isOnThisDevice, startURL, loginStatus } = this.props;
        const { showButton, showSpinner } = this.state;

        const buttonClasses = classNames({
            'start-manually': true,
            hidden: !isOnThisDevice || !showButton,
        });

        const whichDevice = isOnThisDevice ? 'this-device' : 'other-device';
        const deviceType = isDesktop ? 'desktop' : 'touch';

        const headerI18nKey = `home.login.SE.in-progress.${deviceType}.${whichDevice}.header`;

        let bodyI18nKey = `home.login.SE.in-progress.${deviceType}.${whichDevice}.body`;

        if (loginStatus === 'USER_SIGN') {
            bodyI18nKey = `home.login.SE.in-progress.${deviceType}.${whichDevice}.body-user-sign`;
        }
        if (loginStatus === 'EXPIRED_TRANSACTION') {
            bodyI18nKey = `home.login.SE.in-progress.${deviceType}.${whichDevice}.body-expired-transaction`;
        }
        if (loginStatus === 'START_FAILED') {
            bodyI18nKey = `home.login.SE.in-progress.${deviceType}.${whichDevice}.body-start-failed`;
        }

        const i18nBody = i18n(bodyI18nKey, { returnObjects: true });
        // TODO: use i18n('...', {returnObjects: true}}? /joli44 2018-08
        const thisBody = Array.isArray(i18nBody) ? i18nBody.map(row => <p key={row}>{row}</p>) : <p>{i18nBody}</p>;

        return (
            isVisible && (
                <div className="authentication-login-in-progress">
                    <h1>{i18n(headerI18nKey)}</h1>
                    {thisBody}
                    <Spinner id="login-se-login-in-progress-spinner" isVisible={showSpinner} isCenterX />
                    <p>{loginStatus}</p>
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
