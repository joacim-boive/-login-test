import React from 'react';
import PropTypes from 'prop-types';
import './AccountHeader.scss';
import { EcsterCard } from '../../common/card/EcsterCard';
import { formatAmount } from '../../../common/util/format-amount';
import { formatAccount } from '../../../common/util/format-account';

export const AccountHeader = ({ account, amount, amountLabel, showCard }) => {
    const accountNumber = formatAccount(account.accountNumber);

    return (
        <div className="account-header">
            {showCard && <EcsterCard account={account} />}
            <div className="account-header__panel">
                <div className="account-header__card-number">
                    <h3>{account.product.name}</h3>
                    <div>{accountNumber}</div>
                </div>
                <div className="account-header__amount">
                    <div>{formatAmount(amount < 0 ? 0 : amount, undefined, { roundDown: true })}</div>
                    <p>{amountLabel}</p>
                </div>
            </div>
        </div>
    );
};

AccountHeader.propTypes = {
    account: PropTypes.shape().isRequired,
    amount: PropTypes.number.isRequired,
    amountLabel: PropTypes.string.isRequired,
    showCard: PropTypes.bool,
};

AccountHeader.defaultProps = {
    showCard: true,
};
