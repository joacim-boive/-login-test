import React, { Component } from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import { getText as i18n } from '@ecster/ecster-i18n/lib/Translate';
import { DataColumns, DataColumn, DataRow, Data } from '@ecster/ecster-components/DataColumns';
import phoneValidator from '@ecster/ecster-components/Input/validators/mobilePhoneNumberSE';
import { Button } from '@ecster/ecster-components';
import './LoanPersonalInformationPanel.scss';
import ExpandablePanel from '../../common/expandable-panel/ExpandablePanel';
import { EditableInput } from '../../common/editable-input/EditableInput';
import { EditableInputPhone } from '../../common/editable-input/EditableInputPhone';

import detectDevice from '../../../common/util/detect-device';

class LoanPersonalInformationPanel extends Component {
    static propTypes = {
        person: PropTypes.object.isRequired,
        contactInformation: PropTypes.object,
        onUpdateContactInfo: PropTypes.func.isRequired,
        onNextStep: PropTypes.func.isRequired,
        handleCollapse: PropTypes.func.isRequired,
        step: PropTypes.number.isRequired,
        id: PropTypes.string.isRequired,
        collapse: PropTypes.bool,
        className: PropTypes.string,
    };

    static defaultProps = {
        collapse: false,
        contactInformation: {},
        className: '',
    };

    phoneNumber = React.createRef();

    email = React.createRef();

    handleNextStep = () => {
        const { onNextStep, step, id } = this.props;

        if (this.isFormValid()) {
            onNextStep(step, id);
        }
    };

    isFormValid = () => {
        const isValidPhoneNumber = this.phoneNumber.current.handleExternalValidate();
        const isValidEmail = this.email.current.handleExternalValidate();

        return isValidPhoneNumber && isValidEmail;
    };

    render() {
        const { className, person, contactInformation, onUpdateContactInfo, collapse, handleCollapse, id } = this.props;

        const classes = classNames({
            'loan-personal-information-panel': true,
            [className]: className,
        });

        if (Object.keys(contactInformation).length === 0) return null;

        return (
            <div className={classes}>
                <ExpandablePanel
                    className="expander"
                    compact
                    collapse={collapse}
                    handleNextStep={this.handleNextStep}
                    handleCollapse={() => handleCollapse(id)}
                    showMoreLabel={i18n('loan.personal.header')}
                    showLessLabel={i18n('loan.personal.header')}
                >
                    <h3>{i18n('loan.personal.panel.header')}</h3>
                    <DataColumns className="body">
                        <DataColumn>
                            <DataRow>
                                <Data small>{i18n('general.address.name')}</Data>
                                <Data right strong>
                                    {person.name}
                                </Data>
                            </DataRow>
                            <DataRow>
                                <Data small>{i18n('general.ssn')}</Data>
                                <Data right strong>
                                    {person.ssn}
                                </Data>
                            </DataRow>
                            <DataRow>
                                <Data small>{i18n('general.address.address')}</Data>
                                <Data right strong>
                                    {person.address}
                                </Data>
                            </DataRow>
                            <DataRow>
                                <Data small>{i18n('general.address.zip')}</Data>
                                <Data right strong>
                                    {person.zip}
                                </Data>
                            </DataRow>
                            <DataRow>
                                <Data small>{i18n('general.address.city')}</Data>
                                <Data right strong>
                                    {person.city}
                                </Data>
                            </DataRow>
                            {!detectDevice.isMobile && (
                                <DataRow>
                                    <Data className="text" right>
                                        {i18n('loan.personal.info')}
                                    </Data>
                                </DataRow>
                            )}
                        </DataColumn>
                        <DataColumn>
                            <DataRow className="column-first">
                                <EditableInputPhone
                                    name="phoneNumber"
                                    type="tel"
                                    value={contactInformation.phoneNumber}
                                    label={i18n('general.address.mobile')}
                                    onSave={val => onUpdateContactInfo({ phoneNumber: val })}
                                    validationMessage={i18n('general.validation.phone')}
                                    validator={phoneValidator}
                                    ref={this.phoneNumber}
                                />
                            </DataRow>
                            <DataRow>
                                <EditableInput
                                    name="email"
                                    type="email"
                                    value={contactInformation.email}
                                    label={i18n('general.address.email')}
                                    onSave={val => onUpdateContactInfo({ email: val })}
                                    validationMessage={i18n('general.validation.email')}
                                    required
                                    ref={this.email}
                                />
                            </DataRow>
                            <DataRow>{i18n('loan.personal.contact-text')}</DataRow>
                        </DataColumn>
                    </DataColumns>
                    <div className="next-button">
                        <Button onClick={this.handleNextStep} round name="loan-personal-info-next">
                            {i18n('general.next')}
                        </Button>
                    </div>
                </ExpandablePanel>
            </div>
        );
    }
}

export default LoanPersonalInformationPanel;
