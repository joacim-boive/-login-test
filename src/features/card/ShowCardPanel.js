import React from 'react';
import PropTypes from 'prop-types';

import { getText as i18n } from '@ecster/ecster-i18n/lib/Translate';
import { Panel, FlexPanel } from '@ecster/ecster-components';
import { EcsterCard } from '../common/card/EcsterCard';
import { Value } from './Value';
import { formatAccount } from '../../common/util/format-account';

export default class ShowCardPanel extends React.Component {
    static propTypes = {
        account: PropTypes.shape().isRequired,
        accountCard: PropTypes.shape().isRequired,
    };

    static defaultProps = {};

    render() {
        const { account, accountCard: card } = this.props;

        const cardName = (
            (account.product && account.product.name) ||
            i18n('card.show-card.default-card-name')
        ).toLocaleLowerCase(); // will be css cap'ed

        const tmpBlock = card.status === 'TEMPORARILY_BLOCKED';

        return (
            <Panel withMixedContent greenBG className="card-show-card-panel">
                <div className="wide-content">
                    <FlexPanel>
                        {/* account.brickId is deleted on unmount of ManageCardPage to not show the card that is
                        currently stored in Redux - we always need a fresh one otherwise lazyloading wont work */}
                        <div>{account.brickId && <EcsterCard account={account} />}</div>
                        <div>
                            <h2 className="e-green120 card-name">{cardName}</h2>
                            <Value
                                label={i18n('card.general.card-number')}
                                value={formatAccount(card.cardNumber).replace(/X/g, '*')}
                            />
                            <Value label={i18n('card.general.card-holder')} value={card.holder} />
                            {!tmpBlock && (
                                <Value
                                    label={i18n('card.general.valid-to')}
                                    value={`${card.expires.year} / ${card.expires.month}`}
                                />
                            )}
                            <Value label={i18n('card.general.status')} value={i18n(`card.show-card.${card.status}`)} />
                        </div>
                    </FlexPanel>
                </div>
            </Panel>
        );
    }
}
