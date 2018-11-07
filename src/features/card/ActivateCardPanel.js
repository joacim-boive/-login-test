import React from 'react';
import PropTypes from 'prop-types';

import { getText as i18n } from '@ecster/ecster-i18n/lib/Translate';
import { Panel } from '@ecster/ecster-components';
import CvcForm from './CvcForm';
import cardIcon from '../../common/images/icon-activate-card.svg';

export default class ActivateCardPanel extends React.Component {
    static propTypes = {
        account: PropTypes.shape().isRequired,
        updateAccountCard: PropTypes.func.isRequired,
    };

    static defaultProps = {};

    onSubmitForm = cvc => {
        const { updateAccountCard } = this.props;
        updateAccountCard(cvc);
    };

    render() {
        return (
            <Panel withMixedContent className="card-activate-card-panel">
                <div className="mixed-content centered-content">
                    <img src={cardIcon} alt="card icon" />
                    <h1 className="h2">{i18n('card.activate-card.header')}</h1>
                    <p>{i18n('card.activate-card.info')}</p>
                    <CvcForm onSubmitForm={this.onSubmitForm} />
                </div>
            </Panel>
        );
    }
}
