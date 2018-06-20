import React from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import { DataColumns, DataColumn, DataRow, Data } from '@ecster/ecster-components/DataColumns';
import { getText as i18n } from '@ecster/ecster-i18n/lib/Translate';
import './SpecificationPanel.scss';
import { formatAmount } from './../../../common/util/format-amount';

const SpecificationPanel = ({ className, terms, promissory, loanAmount }) => {
    const classes = classNames({
        'specification-panel': true,
        [className]: className,
    });
    return (
        <div className={classes}>
            <DataColumns>
                <DataColumn>
                    <DataRow>
                        <Data weak>{i18n('loan.spec.count')}</Data>
                        <Data right>{terms.noOfPayments}</Data>
                    </DataRow>
                    <DataRow>
                        <Data weak>{i18n('loan.spec.credit-amount')}</Data>
                        <Data right>{formatAmount(loanAmount)}</Data>
                    </DataRow>
                    <DataRow>
                        <Data weak>{i18n('loan.spec.credit-cost')}</Data>
                        <Data right>{formatAmount(terms.creditCost)}</Data>
                    </DataRow>
                </DataColumn>
                <DataColumn>
                    <DataRow>
                        <Data weak>{i18n('loan.spec.rate-cost')}</Data>
                        <Data right>{formatAmount(terms.totalInterest)}</Data>
                    </DataRow>
                    <DataRow>
                        <Data weak>{i18n('loan.spec.start-fee')}</Data>
                        <Data right>{formatAmount(promissory.startFee)}</Data>
                    </DataRow>
                    <DataRow>
                        <Data weak>{i18n('loan.spec.admin-fee')}</Data>
                        <Data right>{formatAmount(promissory.adminFee)}</Data>
                    </DataRow>
                </DataColumn>
                <DataColumn>
                    <DataRow>
                        <Data weak>{i18n('loan.spec.sum-admin-fee')}</Data>
                        <Data right>{formatAmount(terms.totalAdmFee)}</Data>
                    </DataRow>
                    <DataRow>
                        <Data weak>{i18n('loan.spec.amount')}</Data>
                        <Data right>{formatAmount(terms.totalDebt)}</Data>
                    </DataRow>
                </DataColumn>
            </DataColumns>
        </div>
    );
};

SpecificationPanel.propTypes = {
    className: PropTypes.string,
    terms: PropTypes.shape(),
    promissory: PropTypes.shape(),
    loanAmount: PropTypes.number,
};

SpecificationPanel.defaultProps = {
    className: '',
    terms: {},
    promissory: {},
    loanAmount: 0,
};

export default SpecificationPanel;
