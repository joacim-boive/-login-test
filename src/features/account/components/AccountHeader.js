import React from 'react';
import PropTypes from 'prop-types';
import './AccountHeader.scss';
import { EcsterCard } from './../../common/card/EcsterCard';

export const AccountHeader = ({ noCard }) => (
    <div className="account-header">
        {!noCard ? <EcsterCard className="account-header__card-icon" /> : null}
        <div className="account-header__panel">
            <div className="account-header__card-number">
                <h3>Ecster</h3>
                <div>1234 1234 1234 1234</div>
            </div>
            <div className="account-header__amount">
                <div>5 188 kr</div>
                <p>kvar att handla för</p>
            </div>
        </div>
    </div>
);

AccountHeader.propTypes = {
    noCard: PropTypes.bool,
};

AccountHeader.defaultProps = {
    noCard: false,
};
