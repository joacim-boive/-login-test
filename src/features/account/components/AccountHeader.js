import React from 'react';
import PropTypes from 'prop-types';
import { Translate } from '@ecster/ecster-i18n/';
import './AccountHeader.scss';
import { EcsterCard } from './../../common/card/EcsterCard';
import { formatAmount } from '../../../common/util/format-amount';

const i18n = Translate.getText;

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
                    <div>{formatAmount(amountLeft)}</div>
                    <p>{i18n('account.header.left-to-buy')}</p>
                </div>
            </div>
        </div>
    );
};

AccountHeader.propTypes = {
    account: PropTypes.shape().isRequired,
};
