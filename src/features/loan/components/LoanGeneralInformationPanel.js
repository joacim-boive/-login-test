import React from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import { getText as i18n } from '@ecster/ecster-i18n/lib/Translate';
import { Button } from '@ecster/ecster-components';
import './LoanGeneralInformationPanel.scss';
import ExpandablePanel from '../../common/expandable-panel/ExpandablePanel';
import ResponsivePanel from '../../common/responsive-panel/ResponsivePanel';

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
                showMoreLabel={i18n('loan.general.header')}
                showLessLabel={i18n('loan.general.header')}
            >
                <ResponsivePanel desktop={2} tablet={2} mobile={1}>
                    <section key="1">
                        <h4>{i18n('loan.general.about')}</h4>
                    </section>
                    <section key="2">
                        <h4>{i18n('loan.general.withdrawal')}</h4>
                    </section>
                </ResponsivePanel>

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

export default LoanGeneralInformationPanel;
