import React, { Component } from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import { getText as i18n } from '@ecster/ecster-i18n/lib/Translate';
import { DataColumns, DataColumn, DataRow, Data } from '@ecster/ecster-components/DataColumns';
import withMediaQueries from '@ecster/ecster-components/MediaQuery/withMediaQueries';
import { Button } from '@ecster/ecster-components';
import './LoanPersonalInformationPanel.scss';
import ExpandablePanel from '../../common/expandable-panel/ExpandablePanel';
import { EditableInput } from '../../common/editable-input/EditableInput';
import { EditableInputPhone } from '../../common/editable-input/EditableInputPhone';

class LoanPersonalInformationPanel extends Component {
    static propTypes = {
        media: PropTypes.shape().isRequired,
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

    handleNextStep = () => {
        const { onNextStep, step, id } = this.props;

        onNextStep(step, id);
    };

    render() {
        const {
            className,
            person,
            media,
            contactInformation,
            onUpdateContactInfo,
            collapse,
            handleCollapse,
            id,
        } = this.props;
        const classes = classNames({
            'loan-personal-information-panel': true,
            [className]: className,
        });

        if (Object.keys(contactInformation).length === 0) return null;

        const isValid = () =>
            !!contactInformation.phoneNumber &&
            !!contactInformation.phoneNumber.countryCallingCode &&
            !!contactInformation.phoneNumber.number &&
            !!contactInformation.email;

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
                    <form>
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
                                {!media.onMobile && (
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
                                        className="edit-input"
                                        label={i18n('general.address.mobile')}
                                        value={contactInformation.phoneNumber}
                                        editMode={!contactInformation.phoneNumber}
                                        onSave={val => onUpdateContactInfo({ phoneNumber: val })}
                                    />
                                </DataRow>
                                <DataRow>
                                    <EditableInput
                                        className="editable-input"
                                        label={i18n('general.address.email')}
                                        value={contactInformation.email}
                                        editMode={!contactInformation.email}
                                        onSave={val => onUpdateContactInfo({ email: val })}
                                    />
                                </DataRow>
                                <DataRow>{i18n('loan.personal.contact-text')}</DataRow>
                            </DataColumn>
                        </DataColumns>
                        <div className="next-button">
                            <Button onClick={this.handleNextStep} round disabled={!isValid()}>
                                {i18n('general.next')}
                            </Button>
                        </div>
                    </form>
                </ExpandablePanel>
            </div>
        );
    }
}

export default withMediaQueries(LoanPersonalInformationPanel);
