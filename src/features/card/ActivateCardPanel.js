import React from 'react';
import PropTypes from 'prop-types';

import { getText as i18n } from '@ecster/ecster-i18n/lib/Translate';
import { Panel, Form, Input, Button } from '@ecster/ecster-components';
import cardIcon from '../../common/images/icon-activate-card.svg';

export default class ActivateCardPanel extends React.Component {
    static propTypes = {
        account: PropTypes.shape().isRequired,
    };

    static defaultProps = {};

    formRef = React.createRef();

    cvcRef = React.createRef();

    state = {
        cvc: '',
    };

    onChange = ({ target }) => {
        this.setState({ cvc: target.value });
    };

    render() {
        return (
            <Panel withMixedContent className="card-activate-card-panel">
                <div className="mixed-content centered-content">
                    <img src={cardIcon} alt="card icon" />
                    <h1 className="h2">{i18n('card.activate-card.header')}</h1>
                    <p>{i18n('card.activate-card.info')}</p>
                    <Form className="flex-row activate-form">
                        <Input
                            label={i18n('card.activate-card.input-label')}
                            value={this.state.cvc}
                            onChange={this.onChange}
                        />
                        <Button round>{i18n('card.activate-card.button')}</Button>
                    </Form>
                </div>
            </Panel>
        );
    }
}
