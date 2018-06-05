import React from 'react';
import PropTypes from 'prop-types';
import { getText as i18n } from '@ecster/ecster-i18n/lib/Translate';
import { formatAmountCurrency } from '@ecster/ecster-util';
import './AccountSummary.scss';
import ResponsivePanel from './../../common/responsive-panel/ResponsivePanel';

export const AccountSummary = ({ account }) => {
    const spendableMoney = account.limit - account.used;

    return (
        <div className="account-summary">
            <ResponsivePanel desktop={3} tablet={3} mobile={1} className="wrapper">
                <article>
                    <div>{i18n('account.summary.left')}</div>
                    <div>{formatAmountCurrency(spendableMoney, 'sv-SE', 'SEK')}</div>
                </article>
                <article className="border-left">
                    <div>{i18n('account.summary.used')}</div>
                    <div>{formatAmountCurrency(account.used, 'sv-SE', 'SEK')}</div>
                </article>
                <article className="border-left">
                    <div>{i18n('account.summary.total')}</div>
                    <div>{formatAmountCurrency(account.limit, 'sv-SE', 'SEK')}</div>
                </article>
            </ResponsivePanel>
        </div>
    );
};

AccountSummary.propTypes = {
    account: PropTypes.shape().isRequired,
};
