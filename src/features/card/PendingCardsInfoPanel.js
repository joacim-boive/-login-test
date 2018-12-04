import React from 'react';
import PropTypes from 'prop-types';

import { getText as i18n } from '@ecster/ecster-i18n/lib/Translate';
import AlertPanel from '../../common/AlertPanel';
import cardIcon from '../../common/images/icon-card.svg';
import cardsIcon from '../../common/images/icon-cards.svg';
import './PendingCardsInfoPanel.scss';

export default class PendingCardsInfoPanel extends React.Component {
    static propTypes = {
        noOfPendingCards: PropTypes.number.isRequired,
    };

    static defaultProps = {};

    render() {
        const { noOfPendingCards } = this.props;
        const icon = noOfPendingCards > 1 ? cardsIcon : cardIcon;

        return (
            <AlertPanel
                icon={icon}
                header={i18n('card.apply-for-card.pending.header', { count: noOfPendingCards })}
                body={i18n('card.apply-for-card.pending.info', { count: noOfPendingCards })}
                large
            />
        );
    }
}
