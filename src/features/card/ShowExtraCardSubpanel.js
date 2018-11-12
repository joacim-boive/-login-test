import React from 'react';
import PropTypes from 'prop-types';

import { getText as i18n } from '@ecster/ecster-i18n/lib/Translate';
import { ButtonGroup, Button } from '@ecster/ecster-components';
import CvcForm from './CvcForm';
import { Value } from './Value';
import { formatAccount } from '../../common/util/format-account';

export default class ShowExtraCardSubpanel extends React.Component {
    static propTypes = {
        card: PropTypes.shape().isRequired,
        updateAccountCard: PropTypes.func.isRequired,
    };

    static defaultProps = {};

    onSubmitForm = cvc => {
        const { updateAccountCard, card } = this.props;
        updateAccountCard(card, cvc);
    };

    render() {
        const { card } = this.props;

        return (
            <div className="card-show-extra-card-subpanel">
                <p>
                    <strong>{card.holder}</strong>
                </p>
                <Value
                    label={i18n('card.general.card-number')}
                    value={formatAccount(card.cardNumber).replace(/X/g, '*')}
                    strong={false}
                />
                <Value
                    label={i18n('card.general.valid-to')}
                    value={`${card.expires.year} / ${card.expires.month}`}
                    strong={false}
                />
                <Value
                    label={i18n('card.general.status')}
                    value={i18n(`card.show-card.${card.status}`)}
                    strong={false}
                />
                {card.status === 'ACTIVE' ? (
                    <ButtonGroup alignCenter>
                        <Button round outline>
                            {i18n('card.show-extra-card.change-button')}
                        </Button>
                    </ButtonGroup>
                ) : (
                    <CvcForm onSubmitForm={this.onSubmitForm} />
                )}
            </div>
        );
    }
}
