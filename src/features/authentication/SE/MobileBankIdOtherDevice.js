import React from 'react';
import PropTypes from 'prop-types';

import { Button, Input, Spinner } from '@ecster/ecster-components';
import { getText as i18n } from '@ecster/ecster-i18n/lib/Translate';

class MobileBankIdOtherDevice extends React.Component {
    render() {
        const {
            isVisible,
            ssn,
            ssnIsValid,
            startLogin,
            validateSsn,
            onSsnChange,
            onSsnValidation,
            toggleState,
        } = this.props;

        return (
            isVisible && (
                <React.Fragment>
                    <span className="debug">MBID Other Device</span>
                    <Input
                        id="ssn"
                        name="ssn"
                        label={i18n('home.login.labels.ssn')}
                        placeholder={i18n('home.login.placeholders.ssn')}
                        value={ssn}
                        onChange={onSsnChange}
                        onValidation={onSsnValidation}
                        validator={validateSsn}
                        validationMessage={i18n('home.login.otherDevice.ssn-validation')}
                        type="tel"
                    />

                    <Spinner id="spinner-waiting-for-bankid" isVisible isCenterX />

                    <Button
                        id="button-bankid-this-unit"
                        onClick={() => startLogin({ type: 'BANKID_MOBILE', isOnThisDevice: false })}
                        round
                        disabled={!ssnIsValid && !!ssn}
                    >
                        {i18n('home.login.buttons.mobileBankId')}
                    </Button>

                    <Button id="button-switch-to-bank-id-other" onClick={() => toggleState('isOnThisDevice')} link>
                        {i18n(`home.login.links.desktop.mobileBankId`)}
                    </Button>
                </React.Fragment>
            )
        );
    }
}

MobileBankIdOtherDevice.propTypes = {
    isVisible: PropTypes.bool.isRequired,
    ssn: PropTypes.string.isRequired,
    ssnIsValid: PropTypes.bool.isRequired,
    startLogin: PropTypes.func.isRequired,
    validateSsn: PropTypes.func.isRequired,
    onSsnChange: PropTypes.func.isRequired,
    onSsnValidation: PropTypes.func.isRequired,
    toggleState: PropTypes.func.isRequired,
};

export default MobileBankIdOtherDevice;
