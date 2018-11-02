import React from 'react';
import PropTypes from 'prop-types';

import { getText as i18n } from '@ecster/ecster-i18n/lib/Translate';
import { Panel } from '@ecster/ecster-components';

import ShowExtraCardSubpanel from './ShowExtraCardSubpanel';

export default class ShowExtraCardsPanel extends React.Component {
    static propTypes = {
        account: PropTypes.shape().isRequired,
    };

    static defaultProps = {};

    render() {
        const { account } = this.props;

        return (
            <Panel withMixedContent className="card-show-extra-cards-panel">
                <div className="narrow-content">
                    <h1 className="h2">{i18n('card.show-extra-card.header')}</h1>
                    <ShowExtraCardSubpanel account={account} active />
                    <ShowExtraCardSubpanel account={account} active={false} />
                </div>
            </Panel>
        );
    }
}
