import React from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import { getText as i18n } from '@ecster/ecster-i18n/lib/Translate';
import { UnorderedList } from '@ecster/ecster-components';
import './SETerms.scss';
import { formatAmount } from './../../../common/util/format-amount';

export const SETermsWorks = ({ className, promissory }) => {
    const classes = classNames({
        'se-terms': true,
        [className]: className,
    });

    return (
        <div className={classes}>
            <h4>Så här fungerar lånet</h4>
            <UnorderedList icon="icon-check" className="mt-2x">
                <span>{i18n('loan.terms.loan', { amount: formatAmount(promissory.maxCreditAmount) })}</span>
                <span>
                    {i18n('loan.terms.payback', {
                        min: promissory.minPaymentPeriodYear,
                        max: promissory.maxPaymentPeriodYear,
                    })}
                </span>
                <span>{i18n('loan.terms.rate', { rate: promissory.interestRate })}</span>
                <span>{i18n('loan.terms.fee', { amount: formatAmount(promissory.startFee) })}</span>
                <span>{i18n('loan.terms.admin-fee', { amount: formatAmount(promissory.adminFee) })}</span>
                <span>{i18n('loan.terms.finish')}</span>
            </UnorderedList>
        </div>
    );
};

SETermsWorks.propTypes = {
    className: PropTypes.string,
    promissory: PropTypes.shape(),
};

SETermsWorks.defaultProps = {
    className: '',
    promissory: {},
};
