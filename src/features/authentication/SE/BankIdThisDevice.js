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
                <div className="login-se-desktop-bid-this-device">
                    <h2>{i18n('header')}</h2>
                    <Button
                        onClick={() => startLogin({ type: 'BANKID', isOnThisDevice: true })}
                        round
                        name="login-button"
                    >
                        {i18n('login-button')}
                    </Button>

                    <Button
                        onClick={() => toggleState('isOnThisDevice')}
                        link
                        iconLeft="icon-chevron-left"
                        name="to-mbid-other-device-button"
                    >
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
