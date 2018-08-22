/* eslint-disable react/no-danger */
import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { Panel } from '@ecster/ecster-components';
import ResponsivePanel from '../../features/common/responsive-panel/ResponsivePanel';
import AuthenticatedPageTemplate from '../common/templates/AuthenticatedPageTemplate';
import balloonSvg from '../../common/images/SvgIconBalloon.svg';
import * as actions from './redux/actions';
import {getText as i18n} from "@ecster/ecster-i18n/lib/Translate";

export class ContactUsPage extends Component {
    static propTypes = {
        customer: PropTypes.object.isRequired,
        actions: PropTypes.object.isRequired,
    };

    render() {
        return (
            <AuthenticatedPageTemplate className="customer-contact-us-page" header={i18n('customer.contact-us.header')}>
                <Panel textAlignCenter padding="50px" className="mb-8x" sideBordersMobile>
                    <img src={balloonSvg} alt="balloon icon" />
                    <h2>{i18n('customer.contact-us.question-panel-text1')}</h2>
                    {i18n('customer.contact-us.question-panel-text2')}
                    <p>
                        <strong dangerouslySetInnerHTML={{ __html: i18n('customer.contact-us.question-panel-tel') }} />
                    </p>
                    {i18n('customer.contact-us.question-panel-opening-hours')}
                </Panel>
                <ResponsivePanel mobile={1} tablet={2} desktop={2}>
                    <Panel padding="40px" className="responsive-panel-left" sideBordersMobile>
                        <h2 className="text-align-center">{i18n('customer.contact-us.block-card-text1')}</h2>
                        {i18n('customer.contact-us.block-card-text2')}
                        <p className="flex-row pt-4x">
                            {i18n('customer.contact-us.block-card-abroad-text')}
                            <strong dangerouslySetInnerHTML={{ __html: i18n('customer.contact-us.block-card-phone-abroad') }} />
                        </p>
                        <p className="flex-row">
                            {i18n('customer.contact-us.block-card-domestic-text')}
                            <strong dangerouslySetInnerHTML={{ __html: i18n('customer.contact-us.block-card-phone-domestic') }}/>
                        </p>
                    </Panel>
                    <Panel padding="40px" className="responsive-panel-right" sideBordersMobile>
                        <h2 className="text-align-center">{i18n('customer.contact-us.faq-text1')}</h2>
                        {i18n('customer.contact-us.faq-text2')}
                        <div className="pt-4x">
                            <a href={i18n('customer.contact-us.faq-url')}>{i18n('customer.contact-us.faq-link')} <i className="icon-external-link" /></a>
                        </div>
                    </Panel>
                </ResponsivePanel>
            </AuthenticatedPageTemplate>
        );
    }
}

/* istanbul ignore next */
function mapStateToProps(state) {
    return {
        customer: state.customer,
    };
}

/* istanbul ignore next */
function mapDispatchToProps(dispatch) {
    return {
        actions: bindActionCreators({ ...actions }, dispatch),
    };
}

export default connect(mapStateToProps, mapDispatchToProps)(ContactUsPage);
