/* eslint-disable react/no-danger */
import React, { Component } from 'react';
import { Panel } from '@ecster/ecster-components';
import { getText as i18n } from '@ecster/ecster-i18n/lib/Translate';
import ResponsivePanel from '../common/responsive-panel/ResponsivePanel';
import AuthenticatedPageTemplate from '../common/templates/AuthenticatedPageTemplate';
import balloonSvg from '../../common/images/SvgIconBalloon.svg';

export class ContactUsPage extends Component {
    render() {
        return (
            <AuthenticatedPageTemplate className="customer-contact-us-page" header={i18n('customer.contact-us.header')}>
                <Panel textAlignCenter padding="50px" className="mb-8x" sideBordersMobile>
                    <img src={balloonSvg} alt="" />
                    <h2>{i18n('customer.contact-us.question-panel-text1')}</h2>
                    {i18n('customer.contact-us.question-panel-text2')}
                    <p dangerouslySetInnerHTML={{ __html: i18n('customer.contact-us.question-panel-tel') }} />
                    {i18n('customer.contact-us.question-panel-opening-hours')}
                </Panel>
                <ResponsivePanel mobile={1} tablet={2} desktop={2}>
                    <Panel padding="40px" className="responsive-panel-left" sideBordersMobile>
                        <h2 className="text-align-center">{i18n('customer.contact-us.block-card-text1')}</h2>
                        {i18n('customer.contact-us.block-card-text2')}
                        <p className="flex-row pt-4x">
                            {i18n('customer.contact-us.block-card-abroad-text')}
                            <span
                                dangerouslySetInnerHTML={{
                                    __html: i18n('customer.contact-us.block-card-phone-abroad'),
                                }}
                            />
                        </p>
                        <p className="flex-row">
                            {i18n('customer.contact-us.block-card-domestic-text')}
                            <span
                                dangerouslySetInnerHTML={{
                                    __html: i18n('customer.contact-us.block-card-phone-domestic'),
                                }}
                            />
                        </p>
                    </Panel>
                    <Panel padding="40px" className="responsive-panel-right" sideBordersMobile>
                        <h2 className="text-align-center">{i18n('customer.contact-us.faq-text1')}</h2>
                        {i18n('customer.contact-us.faq-text2')}
                        <div className="pt-4x">
                            <a href={i18n('customer.contact-us.faq-url')}>
                                {i18n('customer.contact-us.faq-link')} <i className="icon-external-link" />
                            </a>
                        </div>
                    </Panel>
                </ResponsivePanel>
            </AuthenticatedPageTemplate>
        );
    }
}

export default ContactUsPage;
