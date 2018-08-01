import React from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import { getText as i18n } from '@ecster/ecster-i18n/lib/Translate';
import { DataColumns, DataColumn, DataRow, Data } from '@ecster/ecster-components/DataColumns';
import withMediaQueries from '@ecster/ecster-components/MediaQuery/withMediaQueries';
import { Button } from '@ecster/ecster-components';
import './LoanPersonalInformationPanel.scss';
import ExpandablePanel from '../../common/expandable-panel/ExpandablePanel';

const LoanGeneralInformationPanel = ({ className }) => {
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
                showMoreLabel={i18n('loan.personal.header')}
                showLessLabel={i18n('loan.personal.header')}
            >
                <h3>{i18n('loan.personal.panel.header')}</h3>
                <DataColumns className="body">
                    <DataColumn>
                        <DataRow>
                            <Data small>{i18n('loan.personal.name')}</Data>
                            <Data right strong>
                                {'foo bar'}
                            </Data>
                        </DataRow>
                    </DataColumn>
                </DataColumns>
                <div className="next-button">
                    <Button onClick={() => console.log('Pressy pressy')} round>
                        {i18n('general.buttons.next')}
                    </Button>
                </div>
            </ExpandablePanel>
        </div>
    );
};

LoanGeneralInformationPanel.propTypes = {
    className: PropTypes.string,
};

LoanGeneralInformationPanel.defaultProps = {
    className: '',
};

export default withMediaQueries(LoanGeneralInformationPanel);
