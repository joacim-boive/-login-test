import React from 'react';
import PropTypes from 'prop-types';

import { Button, Input } from '@ecster/ecster-components';
import { getText as i18n } from '@ecster/ecster-i18n/lib/Translate';

class MobileBankidOtherUnit extends React.Component {
    render() {
        const { ssn, ssnIsValid, startLogin, validateSsn, onSsnChange, onSsnValidation } = this.props;

        return (
            <React.Fragment>
                <Input
                    id="ssn"
                    name="ssn"
                    label={`${i18n('home.login.labels.ssn')} (mbid o.u.)`}
                    placeholder={i18n('home.login.placeholders.ssn')}
                    value={ssn}
                    onChange={onSsnChange}
                    onValidation={onSsnValidation}
                    validator={validateSsn}
                    validationMessage={i18n('home.login.otherDevice.ssn-validation')}
                    type="tel"
                />

                <Button
                    id="button-bankid-this-unit"
                    onClick={() => startLogin({ type: 'BANKID_MOBILE', isOnThisDevice: false })}
                    round
                    disabled={!ssnIsValid}
                >
                    {`${i18n('home.login.buttons.mobileBankId')} (mbid o.u.)`}
                </Button>
            </React.Fragment>
        );
    }
}

MobileBankidOtherUnit.propTypes = {
    ssn: PropTypes.string.isRequired,
    ssnIsValid: PropTypes.bool.isRequired,
    startLogin: PropTypes.func.isRequired,
    validateSsn: PropTypes.func.isRequired,
    onSsnChange: PropTypes.func.isRequired,
    onSsnValidation: PropTypes.func.isRequired,
};

export default MobileBankidOtherUnit;
