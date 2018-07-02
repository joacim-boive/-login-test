import React from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import { getText as i18n } from '@ecster/ecster-i18n/lib/Translate';
import './SETerms.scss';
import { formatAmount } from './../../../common/util/format-amount';

const Li = ({ children }) => (
    <li>
        <i className="icon-check" />
        {children}
    </li>
);

Li.propTypes = {
    children: PropTypes.node.isRequired,
};

export const SETermsWorks = ({ className, promissory }) => {
    const classes = classNames({
        'se-terms': true,
        [className]: className,
    });

    return (
        <div className={classes}>
            <h4>Så här fungerar lånet</h4>
            <ul>
                <Li>{i18n('loan.terms.loan', { amount: formatAmount(promissory.maxCreditAmount) })}</Li>
                <Li>
                    {i18n('loan.terms.payback', {
                        min: promissory.minPaymentPeriodYear,
                        max: promissory.maxPaymentPeriodYear,
                    })}
                </Li>
                <Li>{i18n('loan.terms.rate', { rate: promissory.interestRate })}</Li>
                <Li>{i18n('loan.terms.fee', { amount: formatAmount(promissory.startFee) })}</Li>
                <Li>{i18n('loan.terms.admin-fee', { amount: formatAmount(promissory.adminFee) })}</Li>
                <Li>{i18n('loan.terms.finish')}</Li>
            </ul>
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
