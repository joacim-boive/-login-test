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
                    <span className="debug">MBID This Device</span>
                    <Button
                        id="mobileBankidThisUnit"
                        onClick={() => startLogin({ type: 'BANKID', isOnThisDevice: true })}
                        round
                    >
                        {i18n('home.login.buttons.mobileBankId')}
                    </Button>

                    <Button id="button-switch-to-bank-id-other" onClick={() => toggleState('isOnThisDevice')} link>
                        {`${i18n(`home.login.links.mobile.mobileBankId`)}:2`}
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
