import React from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import { getText as i18n } from '@ecster/ecster-i18n/lib/Translate';
import './LoanCost.scss';
import { formatAmount } from './../../../common/util/format-amount';

export const LoanCost = ({ className, terms, interestRate }) => {
    const classes = classNames({
        'loan-cost': true,
        [className]: className,
    });

    if (!terms.averageMonthlyCost) return null;

    return (
        <div className={classes}>
            <h4>{i18n('loan.cost.header')}</h4>
            <div className="row">
                <h5>{formatAmount(terms.averageMonthlyCost)}</h5>
                <div>
                    <div>{i18n('loan.cost.rate', { rate: interestRate })}</div>
                    <div>{i18n('loan.cost.effective-rate', { rate: terms.effectiveRate })}</div>
                </div>
            </div>
        </div>
    );
};

LoanCost.propTypes = {
    className: PropTypes.string,
    terms: PropTypes.shape(),
    interestRate: PropTypes.number,
};

LoanCost.defaultProps = {
    className: '',
    terms: {},
    interestRate: 0,
};
