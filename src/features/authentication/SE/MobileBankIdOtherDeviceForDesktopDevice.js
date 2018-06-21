import React from 'react';
import PropTypes from 'prop-types';

import { Button, Input } from '@ecster/ecster-components';
import { getText } from '@ecster/ecster-i18n/lib/Translate';

const i18n = keySuffix => getText(`home.login.SE.desktop.mbid-other-device.${keySuffix}`);

class MobileBankIdOtherDeviceForDesktopDevice extends React.Component {
    componentDidMount() {
        this.inputRef.getInputEl().focus();
    }

    onKeyUp = ({ which }) => {
        if (which === 13) {
            this.startLogin();
            this.inputRef.getInputEl().blur(); // force field validation
        }
    };

    startLogin = () => {
        if (!this.props.ssn) {
            this.inputRef.getInputEl().focus();
            this.inputRef.getInputEl().blur(); // force field validation
        }
        this.props.startLogin({ type: 'BANKID_MOBILE', isOnThisDevice: false });
    };

    render() {
        const { isVisible, ssn, validateSsn, onSsnChange, onSsnValidation, toggleState } = this.props;

        return (
            isVisible && (
                <div className="login-se-dekstop-mbid-other-device">
                    <h1>{i18n('header')}</h1>
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
                        required
                        validationMessage={i18n('ssn-validation-message')}
                        type="tel"
                    />

                    <Button onClick={this.startLogin} round name="login-button">
                        {i18n('login-button')}
                    </Button>

                    <Button onClick={() => toggleState('isOnThisDevice')} link name="to-bid-button">
                        {i18n(`to-bid-button`)}
                    </Button>
                </div>
            )
        );
    }
}

MobileBankIdOtherDeviceForDesktopDevice.propTypes = {
    isVisible: PropTypes.bool.isRequired,
    ssn: PropTypes.string.isRequired,
    startLogin: PropTypes.func.isRequired,
    validateSsn: PropTypes.func.isRequired,
    onSsnChange: PropTypes.func.isRequired,
    onSsnValidation: PropTypes.func.isRequired,
    toggleState: PropTypes.func.isRequired,
};

export default MobileBankIdOtherDeviceForDesktopDevice;
