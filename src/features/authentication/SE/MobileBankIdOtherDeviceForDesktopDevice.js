import React from 'react';
import PropTypes from 'prop-types';

import { Button, ButtonGroup, Input } from '@ecster/ecster-components';
import { getText } from '@ecster/ecster-i18n/lib/Translate';

import { GA_METHOD_BID, GA_METHOD_MBID } from './constants';

const i18n = keySuffix => getText(`home.login.SE.desktop.${keySuffix}`);

class MobileBankIdOtherDeviceForDesktopDevice extends React.Component {
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

    startBidLogin = () => {
        this.props.startLogin({ type: 'BANKID', isOnThisDevice: true, gaLoginMethod: GA_METHOD_BID });
    };

    render() {
        const { isVisible, ssn, validateSsn, onSsnChange, onSsnValidation } = this.props;

        return (
            isVisible && (
                <div className="login-se-dekstop-mobile-bankid-other-device">
                    <h1 className="e-green120">{i18n('header')}</h1>
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
                        <Button onClick={this.startBidLogin} transparent name="login-bankid">
                            {i18n('login-button-bid')}
                        </Button>
                    </ButtonGroup>
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
};

export default MobileBankIdOtherDeviceForDesktopDevice;
