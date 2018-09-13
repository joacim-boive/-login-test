import React from 'react';
import PropTypes from 'prop-types';
import { getText as i18n } from '@ecster/ecster-i18n/lib/Translate';
import './AccountHeader.scss';
import { EcsterCard } from '../../common/card/EcsterCard';
import { formatAmount } from '../../../common/util/format-amount';
import { formatAccount } from '../../../common/util/format-account';

export const AccountHeader = ({ account }) => {
    const accountNumber = formatAccount(account.accountNumber);
    const amountLeft = account.limit - account.used;

    return (
        <div className="account-header">
            <EcsterCard account={account} />
            <div className="account-header__panel">
                <div className="account-header__card-number">
                    <h3>{account.product.name}</h3>
                    <div>{accountNumber}</div>
                </div>
                <div className="account-header__amount">
                    <div>{formatAmount(amountLeft < 0 ? 0 : amountLeft, undefined, { roundDown: true })}</div>
                    <p>{i18n('account.header.left-to-buy')}</p>
                </div>
            </div>
        </div>
    );
};

AccountHeader.propTypes = {
    account: PropTypes.shape().isRequired,
};
