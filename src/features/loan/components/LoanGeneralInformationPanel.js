import React, { Component } from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import { getText as i18n } from '@ecster/ecster-i18n/lib/Translate';
import { Button, Select, Option, Input } from '@ecster/ecster-components';
import './LoanGeneralInformationPanel.scss';
import ExpandablePanel from '../../common/expandable-panel/ExpandablePanel';
import ResponsivePanel from '../../common/responsive-panel/ResponsivePanel';

class LoanGeneralInformationPanel extends Component {
    state = {
        loanUsage: '',
        loanUsageDescription: '',
        loanDescription: '',
        loanAmountToResolve: '',
        bank: '',
        clearingNumber: '',
        accountNumber: '',
    };

    onChange = (name, e) => {
        const { target } = e;
        const value = target.type === 'checkbox' ? target.checked : target.value;
        this.setState({ [name]: value });
    };

    render() {
        const { className } = this.props;
        const classes = classNames({
            'loan-general-information-panel': true,
            [className]: className,
        });

        return (
            <div className={classes}>
                <ExpandablePanel
                    className="expander"
                    compact
                    collapse={false}
                    showMoreLabel={i18n('loan.general.header')}
                    showLessLabel={i18n('loan.general.header')}
                >
                    <ResponsivePanel desktop={2} tablet={2} mobile={1} className="body">
                        <section key="1">
                            <h4>{i18n('loan.general.about')}</h4>
                            <Select
                                label={i18n('loan.general.purpose')}
                                value={this.state.loanUsage}
                                onChange={e => this.onChange('loanUsage', e)}
                                name="loanUsage"
                                required
                                className="input-field"
                            >
                                <Option label={i18n('loan.general.resolve')} value="RESOLVE_OTHER_LOAN" />
                                <Option label={i18n('loan.general.residence')} value="NEW_RESIDENCE" />
                                <Option label={i18n('loan.general.residence-other')} value="RESIDENCE_OTHER" />
                                <Option label={i18n('loan.general.vehicle')} value="VEHICLE" />
                                <Option label={i18n('loan.general.consumer-goods')} value="TRAVELS_CONSUMER_GOODS" />
                                <Option label={i18n('loan.general.other')} value="OTHER" />
                            </Select>
                            {['RESOLVE_OTHER_LOAN'].includes(this.state.loanUsage) && (
                                <Input
                                    label={i18n('loan.general.resolve-other')}
                                    value={this.state.loanAmountToResolve}
                                    onChange={e => this.onChange('loanAmountToResolve', e)}
                                    placeholder={i18n('general.currency.se')}
                                    name="loanAmountToResolve"
                                    required
                                    minLength={1}
                                    maxLength={7}
                                    className="input-field"
                                />
                            )}
                            {['OTHER'].includes(this.state.loanUsage) && (
                                <Input
                                    label={i18n('loan.general.other-usage')}
                                    value={this.state.loanUsageDescription}
                                    onChange={e => this.onChange('loanUsageDescription', e)}
                                    name="loanUsageDescription"
                                    required
                                    minLength={1}
                                    maxLength={7}
                                    className="input-field"
                                />
                            )}
                        </section>
                        <section key="2">
                            <h4>{i18n('loan.general.withdrawal')}</h4>
                        </section>
                    </ResponsivePanel>

                    <div className="apply-button">
                        <Button onClick={() => console.log('Pressy pressy')} round>
                            {i18n('loan.general.apply')}
                        </Button>
                    </div>
                </ExpandablePanel>
            </div>
        );
    }
}

LoanGeneralInformationPanel.propTypes = {
    className: PropTypes.string,
};

LoanGeneralInformationPanel.defaultProps = {
    className: '',
};

export default LoanGeneralInformationPanel;
