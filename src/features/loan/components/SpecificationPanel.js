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
                        <h4>{i18n('loan.spec.summary')}</h4>
                    </DataRow>
                    <DataRow>
                        <Data>{i18n('loan.spec.count')}</Data>
                        <Data right strong>
                            {terms.noOfPayments}
                        </Data>
                    </DataRow>
                    <DataRow>
                        <Data>{i18n('loan.spec.credit-amount')}</Data>
                        <Data right strong>
                            {formatAmount(loanAmount, undefined, { roundDown: true })}
                        </Data>
                    </DataRow>
                    <DataRow>
                        <Data>{i18n('loan.spec.credit-cost')}</Data>
                        <Data right strong>
                            {formatAmount(terms.creditCost, undefined, { roundDown: true })}
                        </Data>
                    </DataRow>
                    <DataRow>
                        <Data>{i18n('loan.spec.amount')}</Data>
                        <Data right strong>
                            {formatAmount(terms.totalDebt, undefined, { roundDown: true })}
                        </Data>
                    </DataRow>
                </DataColumn>
                <DataColumn>
                    <DataRow>
                        <h4>{i18n('loan.spec.credit-summary')}</h4>
                    </DataRow>
                    <DataRow>
                        <Data>{i18n('loan.spec.rate-cost')}</Data>
                        <Data right strong>
                            {formatAmount(terms.totalInterest, undefined, { roundDown: true })}
                        </Data>
                    </DataRow>
                    <DataRow>
                        <Data>{i18n('loan.spec.start-fee')}</Data>
                        <Data right strong>
                            {formatAmount(promissory.startFee, undefined, { roundDown: true })}
                        </Data>
                    </DataRow>
                    <DataRow>
                        <Data>{i18n('loan.spec.admin-fee')}</Data>
                        <Data right strong>
                            {i18n('loan.spec.per-month', {value: formatAmount(promissory.adminFee, undefined, { roundDown: true })})}
                        </Data>
                    </DataRow>
                    <DataRow>
                        <Data>{i18n('loan.spec.sum-admin-fee')}</Data>
                        <Data right strong>
                            {formatAmount(terms.totalAdmFee, undefined, { roundDown: true })}
                        </Data>
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
