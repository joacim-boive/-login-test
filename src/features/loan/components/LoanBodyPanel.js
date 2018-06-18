import React, { Component } from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import { getText as i18n } from '@ecster/ecster-i18n/lib/Translate';
import Panel from '@ecster/ecster-components/Panel/Panel';
import './LoanBodyPanel.scss';
import { SliderPanel } from './SliderPanel';
import { formatAmount } from './../../../common/util/format-amount';
import { LoanCost } from './LoanCost';

class LoanBodyPanel extends Component {
    state = {
        amount: 0,
        year: 0,
        displayedAmount: '',
        displayedYear: '',
    };

    componentWillReceiveProps(nextProps) {
        const { promissory } = nextProps;

        if (promissory.minCreditAmount && this.state.displayedAmount === '') {
            this.setState({
                amount: promissory.defaultCreditAmount,
                year: promissory.defaultPaymentPeriodYear,
                displayedAmount: formatAmount(promissory.defaultCreditAmount),
                displayedYear: i18n('loan.body.year', { year: promissory.defaultPaymentPeriodYear }),
            });
            this.props.getTerms(promissory.defaultCreditAmount, promissory.defaultPaymentPeriodYear);
        }
    }

    onChangeAmount = amount => {
        this.setState({ amount, displayedAmount: formatAmount(amount) });
    };

    onChangeYear = year => {
        this.setState({ year, displayedYear: i18n('loan.body.year', { year }) });
    };

    onChangeAfter = (val, name) => {
        this.setState({ [name]: val }, () => this.props.getTerms(this.state.amount, this.state.year));
    };

    render() {
        const { className, promissory, onSubmit, terms } = this.props;
        const classes = classNames({
            'loan-body-panel': true,
            [className]: className,
        });

        return (
            <div className={classes}>
                <Panel className="wrapper">
                    <h2>{i18n('loan.body.header')}</h2>
                    <div className="sliders">
                        <SliderPanel
                            name="amount"
                            header="loan.body.amount"
                            onChange={this.onChangeAmount}
                            onAfterChange={val => this.onChangeAfter(val, 'amount')}
                            min={promissory.minCreditAmount}
                            max={promissory.maxCreditAmount}
                            step={100000}
                            defaultValue={promissory.defaultCreditAmount}
                            value={this.state.amount}
                            displayedValue={this.state.displayedAmount}
                        />
                        <SliderPanel
                            name="year"
                            header="loan.body.payback"
                            onChange={this.onChangeYear}
                            onAfterChange={val => this.onChangeAfter(val, 'year')}
                            min={promissory.minPaymentPeriodYear}
                            max={promissory.maxPaymentPeriodYear}
                            defaultValue={promissory.defaultPaymentPeriodYear}
                            value={this.state.year}
                            displayedValue={this.state.displayedYear}
                        />
                    </div>
                    <LoanCost className="loan-cost-panel" terms={terms} />
                </Panel>
            </div>
        );
    }
}

LoanBodyPanel.propTypes = {
    className: PropTypes.string,
    promissory: PropTypes.shape(),
    terms: PropTypes.shape(),
    onSubmit: PropTypes.func.isRequired,
    getTerms: PropTypes.func.isRequired,
};

LoanBodyPanel.defaultProps = {
    className: '',
    promissory: {},
    terms: {},
};

export default LoanBodyPanel;
