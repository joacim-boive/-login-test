import React from 'react';
import PropTypes from 'prop-types';
import './AccountHeaderMobile.scss';
import { getText as i18n } from '@ecster/ecster-i18n/lib/Translate';
import { EcsterCard } from '../../common/card/EcsterCard';
import { formatAmount } from '../../../common/util/format-amount';
import { formatAccount } from '../../../common/util/format-account';

export const AccountHeaderMobile = ({ account }) => {
    const accountNumber = formatAccount(account.accountNumber);
    const amountLeft = account.limit - account.used;

    return (
        <div className="account-header-mobile">
            <div className="account-header-mobile__panel">
                <div className="account-header-mobile__card-number">
                    <h3>{account.product.name}</h3>
                    <div>{accountNumber}</div>
                </div>
                <EcsterCard account={account} />
            </div>
            <div className="account-header-mobile__amount">
                <div>{formatAmount(amountLeft < 0 ? 0 : amountLeft, undefined, { roundDown: true })}</div>
                <p>{i18n('account.header.left-to-buy')}</p>
            </div>
        </div>
    );
};

AccountHeaderMobile.propTypes = {
    account: PropTypes.shape().isRequired,
};
