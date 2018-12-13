import React, { Component } from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import { Form, Input, Button, ButtonGroup } from '@ecster/ecster-components';
import IconButton from '@ecster/ecster-components/Clickable/IconButton';
import { getText as i18n } from '@ecster/ecster-i18n/lib/Translate';
import './EditableInput.scss';

export class EditableInput extends Component {
    state = {
        editMode: !this.props.value, // editMode if empty
        value: this.props.value || '',
        valueUnedited: this.props.value || '',
    };

    constructor(props) {
        super(props);
        this.inputRef = React.createRef();
        this.formRef = React.createRef();
    }

    componentWillReceiveProps(nextProps) {
        const nextValue = nextProps.value;
        const { value } = this.state;
        if (nextValue !== value) this.setState({ value: nextValue });
    }

    onChange = e => {
        const { value } = e.target;
        this.setState({ value });
    };

    onEdit = () => {
        this.setState({ editMode: true, valueUnedited: this.props.value }, () => {
            this.inputRef.current.getInputEl().focus();
        });
    };

    onCancel = () => {
        this.setState({ editMode: false, value: this.state.valueUnedited });
    };

    onSave = () => {
        if (this.formRef.current.validate()) {
            this.props.onSave(this.state.value);
            this.setState({ editMode: false });
        }
    };

    handleExternalValidate = () => {
        if (this.formRef && this.formRef.current) {
            return this.formRef.current.validate();
        }
        return true;
    };

    render() {
        const { className, label, validationMessage, strong, gaPrefix, ...rest } = this.props;
        const { value, editMode } = this.state;

        const classes = classNames({
            'editable-input': true,
            'edit-mode': editMode,
            [className]: className,
        });

        const gaLabelPrefix = gaPrefix ? `${gaPrefix}-` : '';

        return editMode ? (
            <div className={classes}>
                <Form ref={this.formRef} validateRefs={[this.inputRef]}>
                    <Input
                        {...rest}
                        className="editable-input__input"
                        label={label}
                        value={value}
                        small
                        onChange={this.onChange}
                        ref={this.inputRef}
                        validationMessage={validationMessage}
                        required
                    />
                </Form>
                <ButtonGroup align="right">
                    <Button
                        gaLabel={`${gaLabelPrefix}editable-input-cancel`}
                        name="cancel"
                        onClick={this.onCancel}
                        xSmall
                        round
                        transparent
                    >
                        {i18n('general.cancel')}
                    </Button>
                    <Button
                        gaLabel={`${gaLabelPrefix}editable-input-save`}
                        name="editable-input-save"
                        onClick={this.onSave}
                        xSmall
                        round
                    >
                        {i18n('general.save')}
                    </Button>
                </ButtonGroup>
            </div>
        ) : (
            <div className={classes}>
                <div className="flex-row">
                    <label>{label}</label>
                    <div>
                        <span className={strong ? 'strong' : ''}>{value}</span>
                        <IconButton
                            gaLabel={`${gaLabelPrefix}editable-input-edit`}
                            name="edit"
                            onClick={this.onEdit}
                            icon="icon-edit"
                            className="ml-3x e-green120"
                        />
                    </div>
                </div>
            </div>
        );
    }
}

EditableInput.propTypes = {
    onSave: PropTypes.func.isRequired,
    className: PropTypes.string,
    value: PropTypes.string,
    label: PropTypes.string,
    validationMessage: PropTypes.string.isRequired,
    required: PropTypes.bool,
    strong: PropTypes.bool,
    gaPrefix: PropTypes.string,
};

EditableInput.defaultProps = {
    className: '',
    value: '',
    label: '',
    required: false,
    strong: true,
    gaPrefix: undefined,
};
