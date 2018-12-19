import React from 'react';
import PropTypes from 'prop-types';

import { Button, ButtonGroup, Input } from '@ecster/ecster-components';
import { getText } from '@ecster/ecster-i18n/lib/Translate';
import { GA_METHOD_MBID } from './constants';

const i18n = keySuffix => getText(`home.login.SE.touch.mbid-other-device.${keySuffix}`);

class MobileBankIdOtherDeviceForTouchDevice extends React.Component {
    componentDidMount() {
        if (this.inputRef) this.inputRef.getInputEl().focus();
    }

    onKeyUp = ({ which }) => {
        if (which === 13) {
            this.inputRef.getInputEl().blur(); // force field validation
            this.startLogin();
        }
    };

    startLogin = () => {
        const { ssn, startLogin } = this.props;

        if (ssn) {
            startLogin({ type: 'BANKID_MOBILE', isOnThisDevice: false, gaLoginMethod: GA_METHOD_MBID });
        } else {
            this.inputRef.getInputEl().focus();
        }
    };

    render() {
        const { isVisible, ssn, validateSsn, onSsnChange, onSsnValidation, toggleState } = this.props;

        return (
            isVisible && (
                <div className="login-se-touch-mbid-other-device flex-column flex-column-centered">
                    <h1 className="e-green120">{i18n('header')}</h1>
                    <h4 className="e-green120 h5">{i18n('sub-header')}</h4>
                    <Input
                        ref={input => {
                            this.inputRef = input;
                        }}
                        name="ssn"
                        className="ssn-input"
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

                    <ButtonGroup alignCenter>
                        <Button
                            onClick={this.startLogin}
                            round
                            name="login-button"
                            gaLabel="login-mobile-bankid-other-device"
                        >
                            {i18n('login-button')}
                        </Button>
                    </ButtonGroup>

                    <ButtonGroup alignCenter space={false}>
                        <Button
                            onClick={() => toggleState('isOnThisDevice')}
                            transparent
                            name="to-mbid-this-device-button"
                            gaLabel="to-mobile-bankid-this-device"
                        >
                            {i18n(`to-mbid-this-device-button`)}
                        </Button>
                    </ButtonGroup>
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
