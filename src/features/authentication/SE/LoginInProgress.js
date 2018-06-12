import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Button, Spinner } from '@ecster/ecster-components';
import { getText as i18n } from '@ecster/ecster-i18n/lib/Translate';
// import Overlay from '../../common/Overlay';

export default class LoginInProgress extends Component {
    render() {
        const { isVisible, isDesktop, isOnThisDevice, cancelLogin } = this.props;

        const headerI18nKey = `home.login${isOnThisDevice ? '' : '.otherDevice'}.in-progress.${
            isDesktop ? 'desktop' : 'mobile'
        }.header`;

        const bodyI18nKey = `home.login${isOnThisDevice ? '' : '.otherDevice'}.in-progress.${
            isDesktop ? 'desktop' : 'mobile'
        }.body`;

        const i18nBody = i18n(bodyI18nKey, { returnObjects: true });
        const thisBody = Array.isArray(i18nBody) ? i18nBody.map(row => <p key={row}>{row}</p>) : <p>{i18nBody}</p>;

        return (
            isVisible && (
                <React.Fragment>
                    <h1>{i18n(headerI18nKey)}</h1>
                    {thisBody}
                    <Spinner id="spinner-waiting-for-bankid" isVisible isCenterX />

                    <Button flat round green block outline className="home-login-page__button" onClick={cancelLogin}>
                        {i18n('home.login.otherDevice.buttons.abort')}
                    </Button>
                </React.Fragment>
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
};