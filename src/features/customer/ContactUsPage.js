/* eslint-disable react/no-danger, react/jsx-no-target-blank */
import React, { Component } from 'react';
import { Panel, FlexPanel, Link } from '@ecster/ecster-components';
import { getText as i18n } from '@ecster/ecster-i18n/lib/Translate';
import AuthenticatedPageTemplate from '../common/templates/AuthenticatedPageTemplate';
import balloonSvg from '../../common/images/SvgIconBalloon.svg';

export class ContactUsPage extends Component {
    render() {
        return (
            <AuthenticatedPageTemplate className="customer-contact-us-page" header={i18n('customer.contact-us.header')}>
                <Panel withMixedContent centeredContent className="mb-8x">
                    <div className="mixed-content">
                        <img src={balloonSvg} alt="" />
                        <h2>{i18n('customer.contact-us.question-panel-text1')}</h2>
                        {i18n('customer.contact-us.question-panel-text2')}
                        <p dangerouslySetInnerHTML={{ __html: i18n('customer.contact-us.question-panel-tel') }} />
                        {i18n('customer.contact-us.question-panel-opening-hours')}
                    </div>
                </Panel>
                <FlexPanel separator={false}>
                    <Panel withMixedContent className="sub-panel">
                        <div className="mixed-content">
                            <h2 className="centered-content">{i18n('customer.contact-us.block-card-text1')}</h2>
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
                        </div>
                    </Panel>
                    <Panel withMixedContent className="sub-panel">
                        <div className="mixed-content">
                            <h2 className="centered-content">{i18n('customer.contact-us.faq-text1')}</h2>
                            {i18n('customer.contact-us.faq-text2')}
                            <div className="pt-4x">
                                <Link
                                    href={i18n('customer.contact-us.faq-url')}
                                    iconRight="icon-external-link"
                                    target="_blank"
                                >
                                    {i18n('customer.contact-us.faq-link')}
                                </Link>
                            </div>
                        </div>
                    </Panel>
                </FlexPanel>
            </AuthenticatedPageTemplate>
        );
    }
}

export default ContactUsPage;
