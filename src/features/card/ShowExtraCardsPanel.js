import React from 'react';
import PropTypes from 'prop-types';

import { getText as i18n } from '@ecster/ecster-i18n/lib/Translate';
import { Panel } from '@ecster/ecster-components';

import ShowExtraCardSubpanel from './ShowExtraCardSubpanel';

export default class ShowExtraCardsPanel extends React.Component {
    static propTypes = {
        cards: PropTypes.shape().isRequired,
        updateAccountCard: PropTypes.func.isRequired,
        updateCustomerExtraCardHolderContactInfo: PropTypes.func.isRequired,
    };

    static defaultProps = {};

    render() {
        const { cards, updateAccountCard, updateCustomerExtraCardHolderContactInfo } = this.props;

        return (
            <Panel withMixedContent className="card-show-extra-cards-panel">
                <div className="narrow-content">
                    <h1 className="h2">{i18n('card.show-extra-card.header')}</h1>
                    <div className="extra-cards">
                        {cards &&
                            cards.map(card => (
                                <ShowExtraCardSubpanel
                                    card={card}
                                    updateAccountCard={updateAccountCard}
                                    updateCustomerExtraCardHolderContactInfo={updateCustomerExtraCardHolderContactInfo}
                                />
                            ))}
                    </div>
                </div>
            </Panel>
        );
    }
}
