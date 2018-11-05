import React from 'react';
import PropTypes from 'prop-types';

import { getText as i18n } from '@ecster/ecster-i18n/lib/Translate';
import { ButtonGroup, Button } from '@ecster/ecster-components';
import CvcForm from './CvcForm';
import { Value } from './Value';

export default class ShowExtraCardSubpanel extends React.Component {
    static propTypes = {
        account: PropTypes.shape().isRequired,
        active: PropTypes.bool.isRequired,
    };

    static defaultProps = {};

    onChange = ({ target }) => {
        this.setState({ cvc: target.value });
    };

    onSubmitForm = cvc => {
        console.log('activate card... not yet implemented: cvc = ', cvc);
    };

    render() {
        const { active } = this.props;

        return (
            <div className="card-show-extra-card-subpanel">
                <p>
                    <strong>Karl-Peter Ûxne</strong>
                </p>
                <Value label={i18n('card.general.card-number')} value="**** **** **** 1234" strong={false} />
                <Value label={i18n('card.general.valid-to')} value="2018-11" strong={false} />
                <Value label={i18n('general.address.mobile')} value="0703 123 456" strong={false} />
                {active ? (
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
