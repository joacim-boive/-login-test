import React from 'react';
import PropTypes from 'prop-types';

import { getText as i18n } from '@ecster/ecster-i18n/lib/Translate';
import { Panel } from '@ecster/ecster-components';
import AlertPanel from '../../common/AlertPanel';
import cardIcon from '../../common/images/icon-card.svg';
import './ApplyForCardPendingPanel.scss';

export default class PendingCardsInfoPanel extends React.Component {
    static propTypes = {
        noOfPendingCards: PropTypes.number.isRequired,
    };

    static defaultProps = {};

    render() {
        const { noOfPendingCards } = this.props;

        return (
            <AlertPanel
                icon={cardIcon}
                header={i18n('card.apply-for-card.pending.header', { count: noOfPendingCards })}
                body={i18n('card.apply-for-card.pending.info', { count: noOfPendingCards })}
            />
        );
    }
}
