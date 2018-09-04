import React, { Component } from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import { Button, Spinner, LinkButton } from '@ecster/ecster-components';
import { getText as i18n } from '@ecster/ecster-i18n/lib/Translate';
// import Overlay from '../../common/Overlay';

export default class LoginInProgress extends Component {
    state = {
        showButton: false,
    };

    componentWillReceiveProps(nextProps) {
        if (nextProps.isVisible && !this.state.showButton) {
            setTimeout(() => {
                this.setState({ showButton: true });
            }, 4000);
        }
    }

    onCancel = () => {
        this.setState({ showButton: false });
        this.props.cancelLogin();
    };

    render() {
        const { isVisible, isDesktop, isOnThisDevice, startURL } = this.props;
        const { showButton } = this.state;

        const buttonClasses = classNames({
            'start-manually': true,
            hidden: !isOnThisDevice || !showButton,
        });

        const whichDevice = isOnThisDevice ? 'this-device' : 'other-device';
        const deviceType = isDesktop ? 'desktop' : 'touch';

        const headerI18nKey = `home.login.SE.in-progress.${deviceType}.${whichDevice}.header`;

        const bodyI18nKey = `home.login.SE.in-progress.${deviceType}.${whichDevice}.body`;

        const i18nBody = i18n(bodyI18nKey, { returnObjects: true });
        // TODO: use i18n('...', {returnObjects: true}}? /joli44 2018-08
        const thisBody = Array.isArray(i18nBody) ? i18nBody.map(row => <p key={row}>{row}</p>) : <p>{i18nBody}</p>;

        return (
            isVisible && (
                <div className="authentication-login-in-progress">
                    <h1>{i18n(headerI18nKey)}</h1>
                    {thisBody}
                    <Spinner id="login-se-login-in-progress-spinner" isVisible isCenterX />

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
};

LoginInProgress.defaultProps = {
    startURL: undefined,
};
