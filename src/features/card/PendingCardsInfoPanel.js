import React from 'react';
import PropTypes from 'prop-types';

import { getText as i18n } from '@ecster/ecster-i18n/lib/Translate';
import { Panel } from '@ecster/ecster-components';
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
            <Panel withFullWidthContent className="card-apply-for-card-pending-panel">
                <div className="full-width-content">
                    <img src={cardIcon} aria-hidden="true" alt="almost happy face icon" />
                    <div>
                        <h1 className="h3">
                            {i18n('card.apply-for-card.pending.header', { count: noOfPendingCards })}
                        </h1>
                        <p>{i18n('card.apply-for-card.pending.info', { count: noOfPendingCards })}</p>
                    </div>
                </div>
            </Panel>
        );
    }
}
