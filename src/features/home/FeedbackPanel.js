import React, { Component } from 'react';
import { getText as i18n } from '@ecster/ecster-i18n/lib/Translate';
import { Panel, LinkButton } from '@ecster/ecster-components';
import feedbackIcon from '../../common/images/icon-feedback.svg';
import { SURVEY_URL } from '../../common/surveyUrl';

export default class FeedbackPanel extends Component {
    static propTypes = {};

    render() {
        return (
            <Panel className="home-feedback-panel" withNoPadding>
                <img src={feedbackIcon} aria-hidden="true" alt="" />
                <div className="info">
                    <h3 className="e-black">{i18n('home.feedback.header')}</h3>
                    <p>{i18n('home.feedback.info')}</p>
                </div>
                <LinkButton
                    iconRight="icon-external-link"
                    href={SURVEY_URL}
                    target="_blank"
                    outline
                    purple
                    round
                    id="start-feedback"
                >
                    {i18n('home.feedback.link')}
                </LinkButton>
            </Panel>
        );
    }
}
