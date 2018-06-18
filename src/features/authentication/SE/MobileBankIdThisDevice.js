import React from 'react';
import PropTypes from 'prop-types';

import { Button } from '@ecster/ecster-components';
import { getText } from '@ecster/ecster-i18n/lib/Translate';

const i18n = keySuffix => getText(`home.login.SE.touch.mbid-this-device.${keySuffix}`);

class BankIdThisDevice extends React.Component {
    render() {
        const { isVisible, startLogin, toggleState } = this.props;

        return (isVisible && (
                <React.Fragment>
                    <h1>{i18n('header')}</h1>
                    <Button
                        id="login-se-mbid-this-device-on-touch-button"
                        onClick={() => startLogin({ type: 'BANKID', isOnThisDevice: true })}
                        round
                    >
                        {i18n('login-button')}
                    </Button>

                    <Button
                        id="login-se-mbid-this-device-on-touch-to-other-device-button"
                        onClick={() => toggleState('isOnThisDevice')}
                        link
                    >
                        {i18n('to-mbid-button')}
                    </Button>
                </React.Fragment>
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
