import React, { Component } from 'react';
import { Panel, ButtonGroup, LinkButton } from '@ecster/ecster-components';
import { getText as i18n } from '@ecster/ecster-i18n/lib/Translate';

export default class NoAccountsPanel extends Component {
    static propTypes = {};

    render() {
        return (
            <Panel centeredContent withMixedContent>
                <div className="mixed-content">
                    <h2>{i18n('account.no-account.header')}</h2>
                    {i18n('account.no-account.info', {
                        returnObjects: true,
                        wrapper: { tag: 'p', dangerouslySetInnerHTML: true },
                    })}
                    <ButtonGroup align="center">
                        <LinkButton href="https://www.ecster.se/ecster-kortet" target="_blank" round outline>
                            {i18n('account.no-account.button-text')}
                        </LinkButton>
                    </ButtonGroup>
                    <p>{i18n('account.no-account.additional-info')}</p>
                    {i18n('account.no-account.contact-info', {
                        returnObjects: true,
                        wrapper: { tag: 'p', dangerouslySetInnerHTML: true },
                    })}
                </div>
            </Panel>
        );
    }
}
