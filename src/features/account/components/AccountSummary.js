import React from 'react';
import PropTypes from 'prop-types';
import { getText as i18n } from '@ecster/ecster-i18n/lib/Translate';
import { ResponsivePanel } from '@ecster/ecster-components';
import { formatAmount } from '../../../common/util/format-amount';

import './AccountSummary.scss';

export const AccountSummary = ({ account }) => {
    const amountLeft = account.limit - account.used;

    return (
        <div className="account-summary">
            <ResponsivePanel desktop={3} tablet={3} mobile={1} horisontalGutter className="wrapper">
                <article key={1} className="first">
                    <div>{i18n('account.summary.left')}</div>
                    <div>{formatAmount(amountLeft < 0 ? 0 : amountLeft, undefined, { roundDown: true })}</div>
                </article>
                <article key={2} className="border-left">
                    <div>{i18n('account.summary.used')}</div>
                    <div>{formatAmount(account.used, undefined, { roundUp: true })}</div>
                </article>
                <article key={3} className="border-left last">
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
