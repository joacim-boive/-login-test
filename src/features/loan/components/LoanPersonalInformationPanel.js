import React from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import { getText as i18n } from '@ecster/ecster-i18n/lib/Translate';
import { DataColumns, DataColumn, DataRow, Data } from '@ecster/ecster-components/DataColumns';
import phoneValidator from '@ecster/ecster-components/Input/validators/mobilePhoneNumberSE';
import withMediaQueries from '@ecster/ecster-components/MediaQuery/withMediaQueries';
import { Button } from '@ecster/ecster-components';
import './LoanPersonalInformationPanel.scss';
import ExpandablePanel from '../../common/expandable-panel/ExpandablePanel';
import { EditableInput } from '../../common/editable-input/EditableInput';
import { EditableInputPhone } from '../../common/editable-input/EditableInputPhone';

const LoanPersonalInformationPanel = ({ className, person, media, contactInformation, onUpdateContactInfo }) => {
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
                collapse
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
                        {!media.onMobile ? (
                            <DataRow>
                                <Data className="text" right>
                                    {i18n('loan.personal.info')}
                                </Data>
                            </DataRow>
                        ) : null}
                    </DataColumn>
                    <DataColumn>
                        <DataRow className="column-first">
                            <EditableInputPhone
                                type="tel"
                                value={contactInformation.phoneNumber}
                                label={i18n('general.address.mobile')}
                                onSave={val => onUpdateContactInfo({ phoneNumber: val })}
                                validationMessage={i18n('general.validation.phone')}
                                validator={phoneValidator}
                            />
                        </DataRow>
                        <DataRow>
                            <EditableInput
                                type="email"
                                value={contactInformation.email}
                                label={i18n('general.address.email')}
                                onSave={val => onUpdateContactInfo({ email: val })}
                                validationMessage={i18n('general.validation.email')}
                                required
                            />
                        </DataRow>
                        <DataRow>{i18n('loan.personal.contact-text')}</DataRow>
                    </DataColumn>
                </DataColumns>
                <div className="next-button">
                    <Button onClick={() => console.log('Pressy pressy')} round disabled={!isValid()}>
                        {i18n('general.next')}
                    </Button>
                </div>
            </ExpandablePanel>
        </div>
    );
};

LoanPersonalInformationPanel.propTypes = {
    media: PropTypes.shape().isRequired,
    person: PropTypes.object.isRequired,
    contactInformation: PropTypes.object,
    onUpdateContactInfo: PropTypes.func.isRequired,
    className: PropTypes.string,
};

LoanPersonalInformationPanel.defaultProps = {
    contactInformation: {},
    className: '',
};

export default withMediaQueries(LoanPersonalInformationPanel);
