import React from 'react';

import { getText as i18n } from '@ecster/ecster-i18n/lib/Translate';
import { Panel, ButtonGroup, LinkButton } from '@ecster/ecster-components';
import extraCardIcon from '../../common/images/icon-extra-card.svg';

export default class ApplyForExtraCardPanel extends React.Component {
    render() {
        return (
            <Panel withMixedContent centeredContent sideMarginsInMobile className="card-apply-for-extra-card-panel">
                <div className="mixed-content centered-content">
                    <img src={extraCardIcon} aria-hidden="true" alt="extra card icon" />
                    <h1 className="h2">{i18n('card.apply-for-extra-card.header')}</h1>
                    <p>{i18n('card.apply-for-extra-card.info')}</p>
                    <ButtonGroup alignCenter spaceBelow={false}>
                        <LinkButton
                            href="files/Ecster-ansok-om-extrakort.pdf"
                            target="_blank"
                            round
                            green
                            iconRight="icon-download"
                        >
                            {i18n('card.apply-for-extra-card.button')}
                        </LinkButton>
                    </ButtonGroup>
                </div>
            </Panel>
        );
    }
}
