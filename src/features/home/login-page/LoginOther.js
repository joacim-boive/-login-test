import React from 'react';
import PropTypes from 'prop-types';

import { getText as i18n } from '@ecster/ecster-i18n/lib/Translate';

import { Button, Input } from '@ecster/ecster-components';
import Overlay from '../../common/Overlay';
import Spinner from '../../common/Spinner';

const LoginOther = props => {
    const { toggleState, ssn, isDesktop, header, startLogin, onSsnChange, isLoggingIn, cancelLogin } = props;

    return (
        <React.Fragment>
            <article className="home-login-page__form other-device">
                <h1 className="home-login-page__header e-green120">{header}</h1>
                {!isDesktop && (
                    <Input

                        id="ssn"
                        name="ssn"
                        label={i18n('home.login.otherDevice.labels.ssn')}
                        placeholder={i18n('home.login.otherDevice.placeholders.ssn')}
                        value={ssn}
                        onChange={onSsnChange}
                        pattern="[0-9]*"
                        type="number"
                        inputmode="numeric"
                    />
                )}
                <Button
                    id="bankIdOtherUnit"
                    className="home-login-page__button"
                    onClick={() => startLogin('BANKID_MOBILE', { isLoggingIn: 'BANKID_MOBILE' }, ssn)}
                    round
                >
                    {!isLoggingIn ? (
                        i18n('home.login.otherDevice.buttons.login')
                    ) : (
                        <Spinner
                            id="waiting-for-bankid-mobile"
                            isCenter={false}
                            isVisible
                            isFillParentHeight
                            strokeBackgroundWidth={14}
                            strokeForegroundWidth={14}
                        />
                    )}
                </Button>
                <Button
                    id="back"
                    className="home-login-page__link home-login-page__link--back"
                    onClick={() => toggleState('isBankIdOtherDeviceVisible')}
                    link
                >
                    {i18n('home.login.otherDevice.links.back')}
                </Button>
            </article>
            {isLoggingIn === 'BANKID_MOBILE' && (
                <Overlay
                    header="home.login.otherDevice.help.header"
                    body="home.login.otherDevice.help.body"
                    isCompact
                    isNoClose
                    toggleOverlay={() => toggleState('isHelpVisible')}
                >
                    <Button
                        id="buttonWaitingForOtherDeviceLogin"
                        onClick={() => {
                        }}
                        className="home-login-page__button"
                        round
                        block
                    >
                        <Spinner
                            id="waiting-for-bankid"
                            isCenter={false}
                            isVisible
                            isFillParentHeight
                            strokeBackgroundWidth={14}
                            strokeForegroundWidth={14}
                        />
                    </Button>
                    <Button flat round green block outline className="home-login-page__button" onClick={cancelLogin}>
                        {i18n('home.login.otherDevice.buttons.abort')}
                    </Button>
                </Overlay>
            )}
        </React.Fragment>
    );
};

LoginOther.propTypes = {
    startLogin: PropTypes.func.isRequired,
    onSsnChange: PropTypes.func.isRequired,
    toggleState: PropTypes.func.isRequired,
    cancelLogin: PropTypes.func.isRequired,
    header: PropTypes.string.isRequired,
    isLoggingIn: PropTypes.string.isRequired,
    isDesktop: PropTypes.bool.isRequired,
    ssn: PropTypes.string.isRequired,
};

export default LoginOther;
