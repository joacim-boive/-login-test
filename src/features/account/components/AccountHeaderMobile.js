import React from 'react';
import PropTypes from 'prop-types';
import './AccountHeaderMobile.scss';
import { getText as i18n } from '@ecster/ecster-i18n/lib/Translate';
import { EcsterCard } from '../../common/card/EcsterCard';
import { formatAmount } from '../../../common/util/format-amount';

export const AccountHeaderMobile = ({ account }) => {
    const accountNumber = account.accountNumber.replace(/\W/gi, '').replace(/(.{4})/g, '$1 ');
    const amountLeft = account.limit - account.used;

    return (
        <div className="account-header-mobile">
            <div className="account-header-mobile__panel">
                <div className="account-header-mobile__card-number">
                    <h3>{account.product.name}</h3>
                    <div>{accountNumber}</div>
                </div>
                <EcsterCard account={account} className="account-header-mobile__card-icon" />
            </div>
            <div className="account-header-mobile__amount">
                <div>{formatAmount(amountLeft, undefined, { roundDown: true })}</div>
                <p>{i18n('account.header.left-to-buy')}</p>
            </div>
        </div>
    );
};

AccountHeaderMobile.propTypes = {
    account: PropTypes.shape().isRequired,
};
