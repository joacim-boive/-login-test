import React from 'react';
import PropTypes from 'prop-types';

import { Button } from '@ecster/ecster-components';
import { getText } from '@ecster/ecster-i18n/lib/Translate';

const i18n = keySuffix => getText(`home.login.SE.desktop.bid-this-device.${keySuffix}`);

class BankIdThisDevice extends React.Component {
    render() {
        const { isVisible, startLogin, toggleState } = this.props;

        return (
            isVisible && (
                <React.Fragment>
                    <h2>{i18n('header')}</h2>
                    <Button
                        id="login-se-bid-this-device-button"
                        onClick={() => startLogin({ type: 'BANKID', isOnThisDevice: true })}
                        round
                    >
                        {i18n('login-button')}
                    </Button>

                    <Button
                        id="login-se-bid-this-device-back-button"
                        onClick={() => toggleState('isOnThisDevice')}
                        link
                        iconLeft="icon-chevron-left"
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
