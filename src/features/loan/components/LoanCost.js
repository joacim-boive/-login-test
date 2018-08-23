import React from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import { getText as i18n } from '@ecster/ecster-i18n/lib/Translate';
import './LoanCost.scss';
import { formatAmount } from '../../../common/util/format-amount';
import ResponsivePanel from '../../common/responsive-panel/ResponsivePanel';

export const LoanCost = ({ className, terms, interestRate }) => {
    const classes = classNames({
        'loan-cost': true,
        [className]: className,
    });

    if (!terms.averageMonthlyCost) return null;

    return (
        <div className={classes}>
            <h4>{i18n('loan.cost.header')}</h4>
            <div>
                <ResponsivePanel desktop={2} tablet={2} mobile={1}>
                    <h5>{formatAmount(terms.averageMonthlyCost)}</h5>
                    <div className="column">
                        <span>{i18n('loan.cost.rate', { rate: interestRate })}</span>
                        <span>{i18n('loan.cost.effective-rate', { rate: terms.effectiveRate })}</span>
                    </div>
                </ResponsivePanel>
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
