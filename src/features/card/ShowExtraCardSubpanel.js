import React from 'react';
import PropTypes from 'prop-types';

import { getText as i18n } from '@ecster/ecster-i18n/lib/Translate';
// import { ButtonGroup, Button } from '@ecster/ecster-components';
import phoneValidator from '@ecster/ecster-components/Input/validators/mobilePhoneNumberSE';
import CvcForm from './CvcForm';
import { Value } from './Value';
import { formatAccount } from '../../common/util/format-account';
import { EditableInputPhone } from '../common/editable-input/EditableInputPhone';

export default class ShowExtraCardSubpanel extends React.Component {
    static propTypes = {
        card: PropTypes.shape().isRequired,
        updateAccountCard: PropTypes.func.isRequired,
        updateCustomerExtraCardHolderContactInfo: PropTypes.func.isRequired,
    };

    static defaultProps = {};

    onSubmitForm = cvc => {
        const { updateAccountCard, card } = this.props;
        updateAccountCard(card, cvc);
    };

    render() {
        const { card, updateCustomerExtraCardHolderContactInfo } = this.props;

        const tmpBlock = card.status === 'TEMPORARILY_BLOCKED';

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
                {!tmpBlock && (
                    <Value
                        label={i18n('card.general.valid-to')}
                        value={`${card.expires.year} / ${card.expires.month}`}
                        strong={false}
                    />
                )}
                <Value
                    label={i18n('card.general.status')}
                    value={i18n(`card.show-card.${card.status}`)}
                    strong={false}
                />
                {card.extraCardInfo && (
                    <EditableInputPhone
                        type="tel"
                        value={card.extraCardInfo.phoneNumber}
                        label={i18n('general.address.mobile')}
                        onSave={value =>
                            updateCustomerExtraCardHolderContactInfo({
                                name: card.holder,
                                ssn: card.extraCardInfo.ssn,
                                phoneNumber: value,
                            })
                        }
                        validationMessage={i18n('general.validation.phone')}
                        validator={phoneValidator}
                        strong={false}
                    />
                )}
                {card.status === 'INACTIVE' && <CvcForm onSubmitForm={this.onSubmitForm} />}
            </div>
        );
    }
}
