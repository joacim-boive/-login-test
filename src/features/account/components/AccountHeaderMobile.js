import React from 'react';
import PropTypes from 'prop-types';
import './AccountHeaderMobile.scss';
import { EcsterCard } from './../../common/card/EcsterCard';

export const AccountHeaderMobile = ({ noCard }) => (
    <div className="account-header-mobile">
        <div className="account-header-mobile__panel">
            <div className="account-header-mobile__card-number">
                <h3>Ecster</h3>
                <div>1234 1234 1234 1234</div>
            </div>
            {!noCard ? <EcsterCard className="account-header-mobile__card-icon" /> : null}
        </div>
        <div className="account-header-mobile__amount">
            <div>5 188 kr</div>
            <p>Kvar att handla för</p>
        </div>
    </div>
);

AccountHeaderMobile.propTypes = {
    noCard: PropTypes.bool,
};

AccountHeaderMobile.defaultProps = {
    noCard: false,
};
