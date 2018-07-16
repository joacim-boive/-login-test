import React, { Component } from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import { getText as i18n } from '@ecster/ecster-i18n/lib/Translate';
import { Select, Option, Checkbox, Button } from '@ecster/ecster-components';
import './LoanEconomyPanel.scss';
import ResponsivePanel from './../../common/responsive-panel/ResponsivePanel';
import ExpandablePanel from '../../common/expandable-panel/ExpandablePanel';

class LoanEconomyPanel extends Component {
    state = {
        occupation: '',
        income: 0,
        hasLoan: false,
        others: 0,
        living: 0,
        adults: 0,
        children: 0,
        hasOtherLoan: false,
        otherLoanCost: 0,
    };

    onChange = (name, e) => {
        const { target } = e;
        const value = target.type === 'checkbox' ? target.checked : target.value;
        this.setState({ [name]: value });
    };

    validForm = () => {
        return false;
    };

    render() {
        const { className } = this.props;
        const classes = classNames({
            'loan-economy-panel': true,
            [className]: className,
        });

        return (
            <div className={classes}>
                <ExpandablePanel
                    className="expander"
                    compact
                    collapse={false}
                    showMoreLabel={i18n('loan.economy.header')}
                    showLessLabel={i18n('loan.economy.header')}
                >
                    <ResponsivePanel desktop={2} tablet={2} mobile={1}>
                        <div className="economy-column">
                            <section>
                                <h4>{i18n('loan.economy.occupation')}</h4>
                                <Select
                                    label={i18n('loan.economy.occupation-label')}
                                    value={this.state.occupation}
                                    onChange={e => this.onChange('occupation', e)}
                                >
                                    <Option label={i18n('loan.economy.default-label')} value="123" />
                                </Select>
                                <Select
                                    label={i18n('loan.economy.income-label')}
                                    value={this.state.income}
                                    onChange={e => this.onChange('income', e)}
                                >
                                    <Option label={i18n('loan.economy.default-label')} value="" />
                                </Select>
                            </section>
                            <section className="economy-bottom">
                                <h4 className="economy-loan-header">{i18n('loan.economy.others')}</h4>
                                <div className="economy-row">
                                    <Checkbox
                                        checked={this.state.hasLoan}
                                        onChange={e => this.onChange('hasLoan', e)}
                                    />
                                    <div>{i18n('loan.economy.others-checkbox')}</div>
                                </div>
                                <Select
                                    label={i18n('loan.economy.others-label')}
                                    value={this.state.others}
                                    onChange={e => this.onChange('others', e)}
                                >
                                    <Option label={i18n('loan.economy.default-label')} value="" />
                                </Select>
                            </section>
                        </div>
                        <div className="economy-column">
                            <section>
                                <h4>{i18n('loan.economy.household')}</h4>
                                <Select
                                    label={i18n('loan.economy.living-label')}
                                    value={this.state.living}
                                    onChange={e => this.onChange('living', e)}
                                >
                                    <Option label={i18n('loan.economy.default-label')} value="" />
                                </Select>
                                <Select
                                    label={i18n('loan.economy.adults-label')}
                                    value={this.state.adults}
                                    onChange={e => this.onChange('adults', e)}
                                >
                                    <Option label={i18n('loan.economy.default-label')} value="" />
                                </Select>
                                <Select
                                    label={i18n('loan.economy.children-label')}
                                    value={this.state.children}
                                    onChange={e => this.onChange('children', e)}
                                >
                                    <Option label={i18n('loan.economy.default-label')} value="" />
                                </Select>
                            </section>
                            <section>
                                <div className="economy-row">
                                    <Checkbox
                                        checked={this.state.hasOtherLoan}
                                        onChange={e => this.onChange('hasOtherLoan', e)}
                                    />
                                    <div>{i18n('loan.economy.other-loan-checkbox')}</div>
                                </div>
                                <Select
                                    label={i18n('loan.economy.other-loan-cost-label')}
                                    value={this.state.otherLoanCost}
                                    onChange={e => this.onChange('otherLoanCost', e)}
                                >
                                    <Option label={i18n('loan.economy.default-label')} value="" />
                                </Select>
                            </section>
                        </div>
                    </ResponsivePanel>
                    <div className="next-button">
                        <Button onClick={() => console.log('Pressy pressy')} round disabled={!this.validForm()}>
                            {i18n('general.buttons.next')}
                        </Button>
                    </div>
                </ExpandablePanel>
            </div>
        );
    }
}

LoanEconomyPanel.propTypes = {
    className: PropTypes.string,
};

LoanEconomyPanel.defaultProps = {
    className: '',
};

export default LoanEconomyPanel;
