import React from 'react';
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

const LoanPersonalInformationPanel = ({ className, person, media, contactInformation, onUpdateContactInfo }) => {
    const classes = classNames({
        'loan-personal-information-panel': true,
        [className]: className,
    });

    return (
        <div className={classes}>
            <ExpandablePanel
                className="expander"
                compact
                collapse={false}
                showMoreLabel={i18n('loan.personal.header')}
                showLessLabel={i18n('loan.personal.header')}
            >
                <h3>{i18n('loan.personal.panel.header')}</h3>
                <DataColumns className="body">
                    <DataColumn>
                        <DataRow>
                            <Data small>{i18n('loan.personal.name')}</Data>
                            <Data right strong>
                                {person.name}
                            </Data>
                        </DataRow>
                        <DataRow>
                            <Data small>{i18n('loan.personal.ssn')}</Data>
                            <Data right strong>
                                {person.ssn}
                            </Data>
                        </DataRow>
                        <DataRow>
                            <Data small>{i18n('loan.personal.address')}</Data>
                            <Data right strong>
                                {person.address}
                            </Data>
                        </DataRow>
                        <DataRow>
                            <Data small>{i18n('loan.personal.zip')}</Data>
                            <Data right strong>
                                {person.zip}
                            </Data>
                        </DataRow>
                        <DataRow>
                            <Data small>{i18n('loan.personal.city')}</Data>
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
                                className="edit-input"
                                label={i18n('loan.personal.mobile')}
                                value={contactInformation.phoneNumber}
                                onSave={() => console.log('Saving mobile')}
                            />
                        </DataRow>
                        <DataRow>
                            <EditableInput
                                className="edit-input"
                                label={i18n('loan.personal.email')}
                                value={contactInformation.email}
                                onSave={val => onUpdateContactInfo({ email: val })}
                            />
                        </DataRow>
                        <DataRow>{i18n('loan.personal.contact-text')}</DataRow>
                    </DataColumn>
                </DataColumns>
                <div className="next-button">
                    <Button onClick={() => {}} round>
                        {i18n('general.buttons.next')}
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
