import React from 'react';
import PropTypes from 'prop-types';
import { getText as i18n } from '@ecster/ecster-i18n/lib/Translate';
import { Input, Button, Form } from '@ecster/ecster-components';

export default class CvcForm extends React.Component {
    static propTypes = {
        onSubmitForm: PropTypes.func.isRequired,
        idPrefix: PropTypes.string,
    };

    static defaultProps = {
        idPrefix: 'activate-card',
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
        e.stopPropagation();
        if (e.keyCode === 13) {
            this.onClick();
        }
    };

    render() {
        const { cvc } = this.state;
        const { idPrefix } = this.props;

        return (
            // eslint-disable-next-line no-script-url
            <Form className="activate-form" ref={this.formRef} validateRefs={[this.cvcRef]} action="javascript:void(0)">
                <Input
                    type="number"
                    label={i18n('card.activate-card.input-label')}
                    value={cvc}
                    onChange={this.onChange}
                    validator={value => value.length === 3}
                    validationMessage={i18n('card.activate-card.validation-message')}
                    ref={this.cvcRef}
                    onKeyUp={this.onKeyUp}
                    id={`${idPrefix}-input`}
                />
                <Button round onClick={this.onClick} id={`${idPrefix}-button`}>
                    {i18n('card.activate-card.button')}
                </Button>
            </Form>
        );
    }
}
