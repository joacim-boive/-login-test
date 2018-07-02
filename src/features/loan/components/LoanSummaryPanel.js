import React from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import { getText as i18n } from '@ecster/ecster-i18n/lib/Translate';
import Panel from '@ecster/ecster-components/Panel/Panel';
import { DataColumns, DataColumn, DataRow, Data } from '@ecster/ecster-components/DataColumns';
import './LoanSummaryPanel.scss';
import { formatAmount } from './../../../common/util/format-amount';
import ExpandablePanel from './../../common/expandable-panel/ExpandablePanel';
import SpecificationPanel from './SpecificationPanel';

const LoanSummaryPanel = ({ className, terms, searchTerms, promissory }) => {
    const classes = classNames({
        'loan-summary-panel': true,
        [className]: className,
    });

    return (
        <div className={classes}>
            <Panel className="panel">
                <h2>{i18n('loan.summary.panel.header')}</h2>
                <DataColumns className="loan-data-columns">
                    <DataColumn>
                        <DataRow>
                            <Data>{i18n('loan.summary.panel.amount')}</Data>
                            <Data right strong>
                                {formatAmount(searchTerms.amount)}
                            </Data>
                        </DataRow>
                        <DataRow>
                            <Data>{i18n('loan.summary.panel.payback-time')}</Data>
                            <Data right strong>
                                {i18n('loan.summary.panel.years', { year: searchTerms.paymentPeriodYear })}
                            </Data>
                        </DataRow>
                        <DataRow>
                            <Data>{i18n('loan.summary.panel.cost-per-month')}</Data>
                            <Data right strong>
                                {formatAmount(terms.averageMonthlyCost)}
                            </Data>
                        </DataRow>
                    </DataColumn>
                    <DataColumn>
                        <DataRow>
                            <Data>{i18n('loan.summary.panel.rate')}</Data>
                            <Data right strong>
                                {i18n('loan.summary.panel.rate-value', { rate: promissory.interestRate })}
                            </Data>
                        </DataRow>
                        <DataRow>
                            <Data>{i18n('loan.summary.panel.effective-rate')}</Data>
                            <Data right strong>
                                {i18n('loan.summary.panel.rate-value', { rate: terms.effectiveRate })}
                            </Data>
                        </DataRow>
                    </DataColumn>
                </DataColumns>
                <ExpandablePanel
                    className="expander"
                    noPadding
                    noBorder
                    collapse
                    showMoreLabel={i18n('loan.body.show-more')}
                    showLessLabel={i18n('loan.body.show-more')}
                >
                    <SpecificationPanel
                        className="specs"
                        terms={terms}
                        promissory={promissory}
                        loanAmount={searchTerms.amount}
                    />
                </ExpandablePanel>
            </Panel>
        </div>
    );
};

LoanSummaryPanel.propTypes = {
    className: PropTypes.string,
    terms: PropTypes.object.isRequired,
    searchTerms: PropTypes.object.isRequired,
    promissory: PropTypes.object.isRequired,
};

LoanSummaryPanel.defaultProps = {
    className: '',
};

export default LoanSummaryPanel;
