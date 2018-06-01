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
                    <span className="debug">BID This Device</span>
                    <Button
                        id="bankIdOtherUnit"
                        onClick={() => startLogin({ type: 'BANKID', isOnThisDevice: true })}
                        round
                    >
                        `${i18n('home.login.otherDevice.buttons.login')} (bid this)`
                    </Button>

                    <Button id="back" onClick={() => toggleState('isOnThisDevice')} link iconLeft="icon-chevron-left">
                        {`${i18n('home.login.otherDevice.links.back')} (bid this)`}
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
