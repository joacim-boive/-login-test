import React, { Component } from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import { getText as i18n } from '@ecster/ecster-i18n/lib/Translate';
import { Select, Option, Checkbox, Button, Input } from '@ecster/ecster-components';
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
        employer: '',
        '12month': '',
        '12month-company': '',
        'company-name': '',
        rent: 0,
        'owned-rent': 0,
        'house-rent': 0,
        'living-other': '',
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
                                    <Option label={i18n('loan.economy.options.occupation.fulltime')} value="123" />
                                    <Option label={i18n('loan.economy.options.occupation.solo')} value="234" />
                                    <Option label={i18n('loan.economy.options.occupation.parttime')} value="345" />
                                    <Option label={i18n('loan.economy.options.occupation.tryout')} value="456" />
                                    <Option label={i18n('loan.economy.options.occupation.pension')} value="567" />
                                    <Option label={i18n('loan.economy.options.occupation.student')} value="678" />
                                    <Option label={i18n('loan.economy.options.occupation.searching')} value="789" />
                                </Select>
                                <Input
                                    label={i18n('loan.economy.income-label')}
                                    value={this.state.income}
                                    onChange={e => this.onChange('income', e)}
                                    required
                                    minLength={1}
                                    maxLength={7}
                                />
                                <Input
                                    label={i18n('loan.economy.employer')}
                                    value={this.state.employer}
                                    onChange={e => this.onChange('employer', e)}
                                    required
                                    minLength={1}
                                    maxLength={40}
                                />
                                <Select
                                    label={i18n('loan.economy.12month')}
                                    value={this.state['12month']}
                                    onChange={e => this.onChange('12month', e)}
                                    required
                                >
                                    <Option label={i18n('general.answer.yes')} value="yes" />
                                    <Option label={i18n('general.answer.no')} value="no" />
                                </Select>
                                <Input
                                    label={i18n('loan.economy.company-name')}
                                    value={this.state['company-name']}
                                    onChange={e => this.onChange('company-name', e)}
                                    required
                                    minLength={1}
                                    maxLength={40}
                                />
                                <Select
                                    label={i18n('loan.economy.12month-company')}
                                    value={this.state['12month-company']}
                                    onChange={e => this.onChange('12month-company', e)}
                                    required
                                >
                                    <Option label={i18n('general.answer.yes')} value="yes" />
                                    <Option label={i18n('general.answer.no')} value="no" />
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
                                    <Option label={i18n('loan.economy.options.living.rental')} value="rental" />
                                    <Option label={i18n('loan.economy.options.living.owned')} value="owned" />
                                    <Option label={i18n('loan.economy.options.living.house')} value="house" />
                                    <Option label={i18n('loan.economy.options.living.other')} value="other" />
                                </Select>
                                <Select
                                    label={i18n('loan.economy.rent-label')}
                                    value={this.state.rent}
                                    onChange={e => this.onChange('rent', e)}
                                >
                                    <Option label={i18n('loan.economy.options.rent.span1')} value="1" />
                                    <Option label={i18n('loan.economy.options.rent.span2')} value="2" />
                                    <Option label={i18n('loan.economy.options.rent.span3')} value="3" />
                                    <Option label={i18n('loan.economy.options.rent.span4')} value="4" />
                                </Select>
                                <Select
                                    label={i18n('loan.economy.owned-label')}
                                    value={this.state['owned-rent']}
                                    onChange={e => this.onChange('owned-rent', e)}
                                >
                                    <Option label={i18n('loan.economy.options.rent.span1')} value="1" />
                                    <Option label={i18n('loan.economy.options.rent.span2')} value="2" />
                                    <Option label={i18n('loan.economy.options.rent.span3')} value="3" />
                                    <Option label={i18n('loan.economy.options.rent.span4')} value="4" />
                                </Select>
                                <Select
                                    label={i18n('loan.economy.house-label')}
                                    value={this.state['house-rent']}
                                    onChange={e => this.onChange('house-rent', e)}
                                >
                                    <Option label={i18n('loan.economy.options.rent.span1')} value="1" />
                                    <Option label={i18n('loan.economy.options.rent.span2')} value="2" />
                                    <Option label={i18n('loan.economy.options.rent.span3')} value="3" />
                                    <Option label={i18n('loan.economy.options.rent.span4')} value="4" />
                                </Select>
                                <Input
                                    label={i18n('loan.economy.living-other-label')}
                                    value={this.state['living-other']}
                                    onChange={e => this.onChange('living-other', e)}
                                    required
                                    minLength={1}
                                    maxLength={40}
                                />
                                <Select
                                    label={i18n('loan.economy.adults-label')}
                                    value={this.state.adults}
                                    onChange={e => this.onChange('adults', e)}
                                    required
                                >
                                    <Option label="1" value="1" />
                                    <Option label="2" value="2" />
                                </Select>
                                <Select
                                    label={i18n('loan.economy.children-label')}
                                    value={this.state.children}
                                    onChange={e => this.onChange('children', e)}
                                >
                                    <Option label="0" value="0" />
                                    <Option label="1" value="1" />
                                    <Option label="2" value="2" />
                                    <Option label="3" value="3" />
                                    <Option label="4" value="4" />
                                    <Option label="5" value="5" />
                                    <Option label="6" value="6" />
                                    <Option label="7" value="7" />
                                    <Option label="8" value="8" />
                                    <Option label="9" value="9" />
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
