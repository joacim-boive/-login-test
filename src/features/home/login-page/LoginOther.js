import React from 'react';
import PropTypes from 'prop-types';

import { getText as i18n } from '@ecster/ecster-i18n/lib/Translate';

import { Button, Input } from '@ecster/ecster-components';
import Spinner from '../../common/Spinner';

const LoginOther = props => {
    const { toggleState, ssn, isDesktop, header, startLogin, onSsnChange, isLoggingIn } = props;

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
                        type="tel"
                        inputmode="numeric"
                    />
                )}
                <Button
                    id="bankIdOtherUnit"
                    className="home-login-page__button"
                    onClick={() =>
                        startLogin(
                            isDesktop
                                ? { type: 'BANKID', isOnThisDevice: true }
                                : { type: 'BANKID_MOBILE', isOnThisDevice: false }
                        )
                    }
                    round
                >
                    {!isLoggingIn ? (
                        i18n('home.login.otherDevice.buttons.login') + ':4'
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
                    {i18n('home.login.otherDevice.links.back') + ':7'}
                </Button>
            </article>
        </React.Fragment>
    );
};

LoginOther.propTypes = {
    startLogin: PropTypes.func.isRequired,
    onSsnChange: PropTypes.func.isRequired,
    toggleState: PropTypes.func.isRequired,
    header: PropTypes.string.isRequired,
    isLoggingIn: PropTypes.string.isRequired,
    isDesktop: PropTypes.bool.isRequired,
    ssn: PropTypes.string.isRequired,
};

export default LoginOther;
