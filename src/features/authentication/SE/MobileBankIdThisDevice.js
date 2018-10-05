import React from 'react';
import PropTypes from 'prop-types';

import { Button, ButtonGroup } from '@ecster/ecster-components';
import { getText } from '@ecster/ecster-i18n/lib/Translate';

const i18n = keySuffix => getText(`home.login.SE.touch.mbid-this-device.${keySuffix}`);

class BankIdThisDevice extends React.Component {
    render() {
        const { isVisible, startLogin, toggleState } = this.props;

        return (
            isVisible && (
                <div className="login-se-touch-mbid-this-device">
                    <h1 className="e-green120">{i18n('header')}</h1>
                    <ButtonGroup align="center">
                        <Button
                            onClick={() => startLogin({ type: 'BANKID', isOnThisDevice: true })}
                            round
                            name="login-button"
                        >
                            {i18n('login-button')}
                        </Button>
                    </ButtonGroup>

                    <Button onClick={() => toggleState('isOnThisDevice')} link name="to-mbid-other-device-button">
                        {i18n('to-mbid-button')}
                    </Button>
                </div>
            )
        );
    }
}

BankIdThisDevice.propTypes = {
    isVisible: PropTypes.bool.isRequired,
    startLogin: PropTypes.func.isRequired,
    toggleState: PropTypes.func.isRequired,
};

export default BankIdThisDevice;
