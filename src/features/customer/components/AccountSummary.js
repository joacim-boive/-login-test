import React from 'react';
import PropTypes from 'prop-types';
import { formatAmountCurrency } from '@ecster/ecster-util';
import './AccountSummary.scss';
import ResponsivePanel from './../../common/responsive-panel/ResponsivePanel';

export const AccountSummary = ({ account }) => {
    const spendableMoney = account.limit - account.used;

    return (
        <div className="account-summary">
            <ResponsivePanel desktop={3} tablet={3} mobile={1} className="wrapper">
                <div className="row">
                    <div>Kvar att handla för:</div>
                    <div>{formatAmountCurrency(spendableMoney, 'sv-SE', 'SEK')}</div>
                </div>
                <div className="row">
                    <div>Använd kredit:</div>
                    <div>{formatAmountCurrency(account.used, 'sv-SE', 'SEK')}</div>
                </div>
                <div className="row">
                    <div>Total kredit:</div>
                    <div>{formatAmountCurrency(account.limit, 'sv-SE', 'SEK')}</div>
                </div>
            </ResponsivePanel>
        </div>
    );
};

AccountSummary.propTypes = {
    account: PropTypes.shape().isRequired,
};
