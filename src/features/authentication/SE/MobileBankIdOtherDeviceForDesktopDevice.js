import React from 'react';
import PropTypes from 'prop-types';

import { Button, Input } from '@ecster/ecster-components';
import { getText } from '@ecster/ecster-i18n/lib/Translate';

const i18n = keySuffix => getText(`home.login.SE.desktop.mbid-other-device.${keySuffix}`);

class MobileBankIdOtherDeviceForTouchDevices extends React.Component {
    render() {
        const { isVisible, ssn, startLogin, validateSsn, onSsnChange, onSsnValidation, toggleState } = this.props;

        return (
            isVisible && (
                <form>
                    <h1>{i18n('header')}</h1>
                    <Input
                        id="login-se-mbid-other-device-on-desktop-input"
                        name="ssn"
                        autoComplete="off"
                        label={i18n('ssn-label')}
                        placeholder={i18n('ssn-placeholder')}
                        value={ssn}
                        onChange={onSsnChange}
                        onValidation={onSsnValidation}
                        validator={validateSsn}
                        required
                        validationMessage={i18n('ssn-validation-message')}
                        type="tel"
                    />

                    <Button
                        id="login-se-mbid-other-device-on-desktop-button"
                        onClick={() => startLogin({ type: 'BANKID_MOBILE', isOnThisDevice: false })}
                        round
                        type="submit"
                    >
                        {i18n('login-button')}
                    </Button>

                    <Button
                        id="login-se-mbid-other-device-on-desktop-back-button"
                        onClick={() => toggleState('isOnThisDevice')}
                        link
                    >
                        {i18n(`to-bid-button`)}
                    </Button>
                </form>
            )
        );
    }
}

MobileBankIdOtherDeviceForTouchDevices.propTypes = {
    isVisible: PropTypes.bool.isRequired,
    ssn: PropTypes.string.isRequired,
    startLogin: PropTypes.func.isRequired,
    validateSsn: PropTypes.func.isRequired,
    onSsnChange: PropTypes.func.isRequired,
    onSsnValidation: PropTypes.func.isRequired,
    toggleState: PropTypes.func.isRequired,
};

export default MobileBankIdOtherDeviceForTouchDevices;
