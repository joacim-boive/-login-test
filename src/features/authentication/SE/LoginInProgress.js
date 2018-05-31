import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Button, Spinner } from '@ecster/ecster-components';
import { getText as i18n } from '@ecster/ecster-i18n/lib/Translate';
import Overlay from '../../common/Overlay';

export default class LoginInProgress extends Component {
    render() {
        const { isDesktop, isOnThisDevice, toggleState, cancelLogin } = this.props;

        return (
            <Overlay
                header={`home.login${!isOnThisDevice ? '.otherDevice' : ''}.inProgress.${
                    isDesktop ? 'desktop' : 'mobile'
                }.header`}
                body={`home.login${!isOnThisDevice ? '.otherDevice' : ''}.inProgress.${
                    isDesktop ? 'desktop' : 'mobile'
                }.body`}
                isCompact
                isNoClose
                toggleOverlay={() => toggleState('isOverlayVisible')}
            >
                <Spinner id="spinner-waiting-for-bankid" isVisible />

                <Button flat round green block outline className="home-login-page__button" onClick={cancelLogin}>
                    {i18n('home.login.otherDevice.buttons.abort')}
                </Button>
            </Overlay>
        );
    }
}

LoginInProgress.propTypes = {
    isDesktop: PropTypes.bool.isRequired,
    isOnThisDevice: PropTypes.bool.isRequired,
    toggleState: PropTypes.func.isRequired,
    cancelLogin: PropTypes.func.isRequired,
};
