import React from 'react';
import PropTypes from 'prop-types';

import { Button } from '@ecster/ecster-components';
import { getText as i18n } from '@ecster/ecster-i18n/lib/Translate';

class BankIdThisDevice extends React.Component {
    render() {
        const { isVisible, startLogin, toggleState } = this.props;

        return (
            isVisible && (
                <React.Fragment>
                    <h1>{i18n('home.login.header')}</h1>
                    <Button
                        id="bankIdOtherUnit"
                        onClick={() => startLogin({ type: 'BANKID', isOnThisDevice: true })}
                        round
                    >
                        {i18n('home.login.other-device.buttons.login')}
                    </Button>

                    <Button id="back" onClick={() => toggleState('isOnThisDevice')} link iconLeft="icon-chevron-left">
                        {i18n('home.login.other-device.links.back')}
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
