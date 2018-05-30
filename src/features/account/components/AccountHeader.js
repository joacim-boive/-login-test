import React from 'react';
import PropTypes from 'prop-types';
import { formatAmountCurrency } from '@ecster/ecster-util';
import './AccountHeader.scss';
import { EcsterCard } from './../../common/card/EcsterCard';

export const AccountHeader = ({ account }) => {
    const accountNumber = account.accountNumber.replace(/\W/gi, '').replace(/(.{4})/g, '$1 ');
    const amountLeft = account.limit - account.used;
    const noCard = account.numberOfCards === 0;

    return (
        <div className="account-header">
            {!noCard ? <EcsterCard className="account-header__card-icon" /> : null}
            <div className="account-header__panel">
                <div className="account-header__card-number">
                    <h3>{account.product.name}</h3>
                    <div>{accountNumber}</div>
                </div>
                <div className="account-header__amount">
                    <div>{formatAmountCurrency(amountLeft, 'sv-SE', 'SEK', true)}</div>
                    <p>kvar att handla för</p>
                </div>
            </div>
        </div>
    );
};

AccountHeader.propTypes = {
    account: PropTypes.shape().isRequired,
};
