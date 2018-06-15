import React from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import { getText as i18n } from '@ecster/ecster-i18n/lib/Translate';
import { withMediaQueries } from '@ecster/ecster-components';
import Panel from '@ecster/ecster-components/Panel/Panel';
import ResponsivePanel from '../../common/responsive-panel/ResponsivePanel';
import './LoanHeaderPanel.scss';
import { SvgIconLoanHeader } from './../../../common/images/SvgIconLoanHeader';
import { SliderPanel } from './SliderPanel';

const LoanHeaderPanel = ({ className, media }) => {
    const classes = classNames({
        'loan-header-panel': true,
        [className]: className,
    });

    return (
        <div className={classes}>
            <Panel className="header">
                <ResponsivePanel
                    desktop={2}
                    tablet={2}
                    mobile={1}
                    reverseStack={media.onMobile}
                    horizontalGutter
                    noBorder
                >
                    <section>
                        <h2>{i18n('loan.header.header')}</h2>
                        <p>{i18n('loan.header.body')}</p>
                    </section>
                    <section className="image">{SvgIconLoanHeader()}</section>
                </ResponsivePanel>
            </Panel>
        </div>
    );
};

LoanHeaderPanel.propTypes = {
    className: PropTypes.string,
    media: PropTypes.shape().isRequired,
};

LoanHeaderPanel.defaultProps = {
    className: '',
};

export default withMediaQueries(LoanHeaderPanel);
