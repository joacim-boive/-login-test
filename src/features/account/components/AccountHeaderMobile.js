import React from 'react';
import PropTypes from 'prop-types';
import { formatAmountCurrency } from '@ecster/ecster-util';
import './AccountHeaderMobile.scss';
import { EcsterCard } from './../../common/card/EcsterCard';

export const AccountHeaderMobile = ({ account }) => {
    const accountNumber = account.accountNumber.replace(/\W/gi, '').replace(/(.{4})/g, '$1 ');
    const amountLeft = account.limit - account.used;
    const noCard = account.numberOfCards === 0;

    return (
        <div className="account-header-mobile">
            <div className="account-header-mobile__panel">
                <div className="account-header-mobile__card-number">
                    <h3>{account.product.name}</h3>
                    <div>{accountNumber}</div>
                </div>
                {!noCard ? <EcsterCard className="account-header-mobile__card-icon" /> : null}
            </div>
            <div className="account-header-mobile__amount">
                <div>{formatAmountCurrency(amountLeft, 'sv-SE', 'SEK', true)}</div>
                <p>Kvar att handla för</p>
            </div>
        </div>
    );
};

AccountHeaderMobile.propTypes = {
    account: PropTypes.shape().isRequired,
};