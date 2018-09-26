import React, { Component } from 'react';
import { getText as i18n } from '@ecster/ecster-i18n/lib/Translate';
import { Panel, LinkButton } from '@ecster/ecster-components';
import feedbackIcon from '../../common/images/icon-feedback.svg';

export default class FeedbackPanel extends Component {
    static propTypes = {};

    static SURVEY_URL = 'https://www.netigate.se/a/s.aspx?s=632612X139591763X13679';

    // to enhance readability in encoded string, replace some chars, then remove double --
    static READABLE_UA = encodeURIComponent(navigator.userAgent.replace(/[ /;,]/g, '-').replace(/--+/g, '-')); // eslint-disable-line no-undef

    render() {
        return (
            <Panel className="home-feedback-panel" sideBordersMobile>
                <img src={feedbackIcon} alt="" />
                <div className="info">
                    <h3 className="e-black">{i18n('home.feedback.header')}</h3>
                    <p>{i18n('home.feedback.info')}</p>
                </div>
                <LinkButton
                    iconRight="icon-external-link"
                    href={`${FeedbackPanel.SURVEY_URL}&userAgent=${FeedbackPanel.READABLE_UA}`}
                    target="_blank"
                    outline
                    purple
                    round
                >
                    {i18n('home.feedback.link')}
                </LinkButton>
            </Panel>
        );
    }
}
