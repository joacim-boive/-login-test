import React from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import { getText as i18n } from '@ecster/ecster-i18n/lib/Translate';
import { DataColumns, DataColumn, DataRow, Data } from '@ecster/ecster-components/DataColumns';
import './LoanPersonalInformationPanel.scss';
import ExpandablePanel from '../../common/expandable-panel/ExpandablePanel';

const LoanPersonalInformationPanel = ({ className }) => {
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
                <DataColumns>
                    <DataColumn>
                        <DataRow>
                            <Data weak>{i18n('loan.personal.name')}</Data>
                            <Data right strong>
                                {123}
                            </Data>
                        </DataRow>
                        <DataRow>
                            <Data weak>{i18n('loan.personal.pn')}</Data>
                            <Data right strong>
                                {123}
                            </Data>
                        </DataRow>
                        <DataRow>
                            <Data weak>{i18n('loan.personal.adress')}</Data>
                            <Data right strong>
                                {123}
                            </Data>
                        </DataRow>
                        <DataRow>
                            <Data weak>{i18n('loan.personal.zip')}</Data>
                            <Data right strong>
                                {123}
                            </Data>
                        </DataRow>
                        <DataRow>
                            <Data weak>{i18n('loan.personal.city')}</Data>
                            <Data right strong>
                                {123}
                            </Data>
                        </DataRow>
                        <DataRow>
                            <Data className="text" right>{i18n('loan.personal.info')}</Data>
                        </DataRow>
                    </DataColumn>
                    <DataColumn>
                        <DataRow>
                            <Data>{i18n('loan.summary.panel.rate')}</Data>
                            <Data right strong>
                                {123}
                            </Data>
                        </DataRow>
                    </DataColumn>
                </DataColumns>
            </ExpandablePanel>
        </div>
    );
};

LoanPersonalInformationPanel.propTypes = {
    className: PropTypes.string,
};

LoanPersonalInformationPanel.defaultProps = {
    className: '',
};

export default LoanPersonalInformationPanel;
