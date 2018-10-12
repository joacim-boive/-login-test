import React from 'react';
import PropTypes from 'prop-types';
import './AccountHeaderMobile.scss';
import { EcsterCard } from '../../common/card/EcsterCard';
import { formatAmount } from '../../../common/util/format-amount';
import { formatAccount } from '../../../common/util/format-account';

export const AccountHeaderMobile = ({ account, amount, amountLabel, showCard }) => {
    const accountNumber = formatAccount(account.accountNumber);

    return (
        <div className="account-header-mobile">
            <div className="account-header-mobile__panel">
                <div className="account-header-mobile__card-number">
                    <h3>{account.product.name}</h3>
                    <div>{accountNumber}</div>
                </div>
                {showCard && <EcsterCard account={account} />}
            </div>
            <div className="account-header-mobile__amount">
                <div>{formatAmount(amount < 0 ? 0 : amount, undefined, { roundDown: true })}</div>
                <p>{amountLabel}</p>
            </div>
        </div>
    );
};

AccountHeaderMobile.propTypes = {
    account: PropTypes.shape().isRequired,
    amount: PropTypes.number.isRequired,
    amountLabel: PropTypes.string.isRequired,
    showCard: PropTypes.bool,
};

AccountHeaderMobile.defaultProps = {
    showCard: true,
};
