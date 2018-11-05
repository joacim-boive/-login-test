import React from 'react';
import PropTypes from 'prop-types';

import { getText as i18n } from '@ecster/ecster-i18n/lib/Translate';
import { Panel, FlexPanel } from '@ecster/ecster-components';
import { EcsterCard } from '../common/card/EcsterCard';
import { Value } from './Value';

export default class ShowCardPanel extends React.Component {
    static propTypes = {
        account: PropTypes.shape().isRequired,
        accountCards: PropTypes.shape().isRequired,
    };

    static defaultProps = {};

    render() {
        const { account } = this.props;

        const cardName = (
            (account.product && account.product.name) ||
            i18n('card.show-card.default-card-name')
        ).toLocaleLowerCase(); // will be css cap'ed

        return (
            <Panel withMixedContent greenBG className="card-show-card-panel">
                <div className="wide-content">
                    <FlexPanel>
                        <div>
                            <EcsterCard account={account} />
                        </div>
                        <div>
                            <h2 className="e-green120 card-name">{cardName}</h2>
                            <Value label={i18n('card.general.card-number')} value="sadad" />
                            <Value label={i18n('card.general.card-holder')} value="dasasd" />
                            <Value label={i18n('card.general.valid-to')} value="dasd" />
                            <Value label={i18n('card.general.status')} value="asddd" />
                        </div>
                    </FlexPanel>
                </div>
            </Panel>
        );
    }
}
