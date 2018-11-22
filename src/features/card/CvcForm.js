import React from 'react';
import PropTypes from 'prop-types';
import { getText as i18n } from '@ecster/ecster-i18n/lib/Translate';
import { Input, Button, Form } from '@ecster/ecster-components';

export default class CvcForm extends React.Component {
    static propTypes = {
        onSubmitForm: PropTypes.func.isRequired,
    };

    formRef = React.createRef();

    cvcRef = React.createRef();

    state = {
        cvc: '',
    };

    onChange = ({ target }) => {
        this.setState({ cvc: target.value });
    };

    onClick = () => {
        const { onSubmitForm } = this.props;
        const { cvc } = this.state;

        if (this.formRef.current.validate()) {
            onSubmitForm(cvc);
        }
    };

    onKeyUp = e => {
        if (e.keyCode === 13) {
            this.onClick();
        }
    };

    render() {
        const { cvc } = this.state;

        return (
            <Form className="flex-row activate-form" ref={this.formRef} validateRefs={[this.cvcRef]}>
                <Input
                    type="number"
                    label={i18n('card.activate-card.input-label')}
                    value={cvc}
                    onChange={this.onChange}
                    validator={value => value.length === 3}
                    validationMessage={i18n('card.activate-card.validation-message')}
                    ref={this.cvcRef}
                    onKeyUp={this.onKeyUp}
                />
                <Button round onClick={this.onClick}>
                    {i18n('card.activate-card.button')}
                </Button>
            </Form>
        );
    }
}
