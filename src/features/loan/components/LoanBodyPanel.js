import React, { Component } from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import { getText as i18n } from '@ecster/ecster-i18n/lib/Translate';
import Panel from '@ecster/ecster-components/Panel/Panel';
import './LoanBodyPanel.scss';
import { SliderPanel } from './SliderPanel';
import { formatAmount } from './../../../common/util/format-amount';

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
                displayedAmount: formatAmount(promissory.defaultCreditAmount),
                displayedYear: i18n('loan.body.year', { year: promissory.defaultPaymentPeriodYear }),
            });
        }
    }

    onChangeAmount = amount => {
        this.setState({ amount, displayedAmount: formatAmount(amount) });
    };

    onChangeYear = year => {
        this.setState({ year, displayedYear: i18n('loan.body.year', { year }) });
    };

    render() {
        const { className, promissory, onSubmit } = this.props;
        const classes = classNames({
            'loan-body-panel': true,
            [className]: className,
        });
        console.log(promissory);
        return (
            <div className={classes}>
                <Panel className="wrapper">
                    <h2>{i18n('loan.body.header')}</h2>
                    <div className="sliders">
                        <SliderPanel
                            name="amount"
                            header="loan.body.amount"
                            onChange={this.onChangeAmount}
                            min={promissory.minCreditAmount}
                            max={promissory.maxCreditAmount}
                            step={100000}
                            defaultValue={promissory.defaultCreditAmount}
                            value={this.state.amount}
                            displayedValue={this.state.displayedAmount}
                        />
                        <SliderPanel
                            name="years"
                            header="loan.body.payback"
                            onChange={this.onChangeYear}
                            min={promissory.minPaymentPeriodYear}
                            max={promissory.maxPaymentPeriodYear}
                            defaultValue={promissory.defaultPaymentPeriodYear}
                            value={this.state.year}
                            displayedValue={this.state.displayedYear}
                        />
                    </div>
                </Panel>
            </div>
        );
    }
}

LoanBodyPanel.propTypes = {
    className: PropTypes.string,
    promissory: PropTypes.shape(),
    onSubmit: PropTypes.func.isRequired,
};

LoanBodyPanel.defaultProps = {
    className: '',
    promissory: {},
};

export default LoanBodyPanel;
