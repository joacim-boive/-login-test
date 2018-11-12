import React from 'react';
import PropTypes from 'prop-types';

import { getText as i18n } from '@ecster/ecster-i18n/lib/Translate';
import { Panel } from '@ecster/ecster-components';

import ShowExtraCardSubpanel from './ShowExtraCardSubpanel';

export default class ShowExtraCardsPanel extends React.Component {
    static propTypes = {
        cards: PropTypes.shape().isRequired,
        updateAccountCard: PropTypes.func.isRequired,
    };

    static defaultProps = {};

    render() {
        const { cards, updateAccountCard } = this.props;

        console.log('extra cards panel: cards = ', cards);
        return (
            <Panel withMixedContent className="card-show-extra-cards-panel">
                <div className="narrow-content">
                    <h1 className="h2">{i18n('card.show-extra-card.header')}</h1>
                    <div className="extra-cards">
                        {cards &&
                            cards.map(card => (
                                <ShowExtraCardSubpanel card={card} updateAccountCard={updateAccountCard} />
                            ))}
                    </div>
                </div>
            </Panel>
        );
    }
}
