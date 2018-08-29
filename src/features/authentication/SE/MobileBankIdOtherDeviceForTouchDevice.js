import React from 'react';
import PropTypes from 'prop-types';

import { Button, Input } from '@ecster/ecster-components';
import { getText } from '@ecster/ecster-i18n/lib/Translate';

const i18n = keySuffix => getText(`home.login.SE.touch.mbid-other-device.${keySuffix}`);

class MobileBankIdOtherDeviceForTouchDevice extends React.Component {
    componentDidMount() {
        this.inputRef && this.inputRef.getInputEl().focus();
    }

    onKeyUp = ({ which }) => {
        if (which === 13) {
            this.startLogin();
            this.inputRef.getInputEl().blur(); // force field validation
        }
    };

    startLogin = () => {
        const { ssn, startLogin } = this.props;

        if (ssn) {
            startLogin({ type: 'BANKID_MOBILE', isOnThisDevice: false });
        } else {
            const input = this.inputRef.getInputEl();
            input.focus();
            input.blur(); // force field validation
            input.focus(); // then focus field again to help user save a click
        }
    };

    render() {
        const { isVisible, ssn, validateSsn, onSsnChange, onSsnValidation, toggleState } = this.props;

        return (
            isVisible && (
                <div className="login-se-touch-mbid-other-device">
                    <h2>{i18n('header')}</h2>
                    <Input
                        ref={input => {
                            this.inputRef = input;
                        }}
                        name="ssn"
                        autoComplete="off"
                        label={i18n('ssn-label')}
                        placeholder={i18n('ssn-placeholder')}
                        value={ssn}
                        onChange={onSsnChange}
                        onKeyUp={this.onKeyUp}
                        onValidation={onSsnValidation}
                        validator={validateSsn}
                        validationMessage={getText('general.validation.ssn')}
                        type="tel"
                    />

                    <Button onClick={this.startLogin} round name="login-button">
                        {i18n('login-button')}
                    </Button>

                    <Button
                        onClick={() => toggleState('isOnThisDevice')}
                        link
                        iconLeft="icon-chevron-left"
                        name="to-mbid-this-device-button"
                    >
                        {i18n(`to-mbid-this-device-button`)}
                    </Button>
                </div>
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
