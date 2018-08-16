import React from 'react';
import PropTypes from 'prop-types';
import { getText as i18n } from '@ecster/ecster-i18n/lib/Translate';
import './AccountSummary.scss';
import ResponsivePanel from './../../common/responsive-panel/ResponsivePanel';
import { formatAmount } from './../../../common/util/format-amount';

export const AccountSummary = ({ account }) => {
    const spendableMoney = account.limit - account.used;

    return (<div className="account-summary">
            <ResponsivePanel desktop={3} tablet={3} mobile={1} className="wrapper">
                <article>
                    <div>{i18n('account.summary.left')}</div>
                    <div>{formatAmount(spendableMoney, undefined, { roundDown: true })}</div>
                </article>
                <article className="border-left">
                    <div>{i18n('account.summary.used')}</div>
                    <div>{formatAmount(account.used, undefined, { roundUp: true })}</div>
                </article>
                <article className="border-left">
                    <div>{i18n('account.summary.total')}</div>
                    <div>{formatAmount(account.limit)}</div>
                </article>
            </ResponsivePanel>
        </div>
    );
};

AccountSummary.propTypes = {
    account: PropTypes.shape().isRequired,
};
