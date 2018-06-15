import React from 'react';
import PropTypes from 'prop-types';

import { Button, Input, DesktopDevice, TouchDevice } from '@ecster/ecster-components';
import { getText as i18n } from '@ecster/ecster-i18n/lib/Translate';

class MobileBankIdOtherDeviceForTouchDevice extends React.Component {
    render() {
        const { isVisible, ssn, startLogin, validateSsn, onSsnChange, onSsnValidation, toggleState } = this.props;

        return (
            isVisible && (
                <form>
                    <h2>{i18n('home.login.other-device.header.mobile')}</h2>
                    <Input
                        id="ssn"
                        name="ssn"
                        autoComplete="off"
                        label={i18n('home.login.labels.ssn')}
                        placeholder={i18n('home.login.placeholders.ssn')}
                        value={ssn}
                        onChange={onSsnChange}
                        onValidation={onSsnValidation}
                        validator={validateSsn}
                        required
                        validationMessage={i18n('home.login.other-device.ssn-validation')}
                        type="tel"
                    />

                    <Button
                        id="button-bankid-this-unit"
                        onClick={() => startLogin({ type: 'BANKID_MOBILE', isOnThisDevice: false })}
                        round
                        type="submit"
                    >
                        {i18n('home.login.buttons.mobileBankId')}
                    </Button>

                    <Button id="button-switch-to-bank-id-other" onClick={() => toggleState('isOnThisDevice')} link>
                        {i18n(`home.login.links.desktop.mobileBankId`)}
                    </Button>
                </form>
            )
        );
    }
}

MobileBankIdOtherDeviceForTouchDevice.propTypes = {
    isVisible: PropTypes.bool.isRequired,
    ssn: PropTypes.string.isRequired,
    startLogin: PropTypes.func.isRequired,
    validateSsn: PropTypes.func.isRequired,
    onSsnChange: PropTypes.func.isRequired,
    onSsnValidation: PropTypes.func.isRequired,
    toggleState: PropTypes.func.isRequired,
};

export default MobileBankIdOtherDeviceForTouchDevice;
