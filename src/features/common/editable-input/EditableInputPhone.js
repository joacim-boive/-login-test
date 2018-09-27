import React, { Component } from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import { Form, Input, Button, ButtonGroup } from '@ecster/ecster-components';
import { getText as i18n } from '@ecster/ecster-i18n/lib/Translate';
import './EditableInputPhone.scss';
import CountrySelect from './CountryCodeSelect';

export class EditableInputPhone extends Component {
    state = {
        editMode: !this.props.value, // editMode if empty
        value: this.props.value,
        valueUnedited: this.props.value,
    };

    constructor(props) {
        super(props);
        this.countryRef = React.createRef();
        this.phoneRef = React.createRef();
        this.formRef = React.createRef();
    }

    componentWillReceiveProps(nextProps) {
        const nextValue = nextProps.value;
        const { value } = this.state;
        if (nextValue.number !== value.number) this.setState({ value: nextValue });
    }

    onChange = e => {
        const { value } = e.target;
        this.setState({ value: { ...this.state.value, number: value } });
    };

    onChangeCountryCode = val => {
        const { value } = this.state;
        this.setState({ value: { ...value, countryCallingCode: val } });
    };

    onEdit = () => {
        this.setState({ editMode: true }, () => {
            this.phoneRef.current.getInputEl().focus();
        });
    };

    onCancel = () => {
        this.setState({ editMode: false, value: this.state.valueUnedited });
    };

    onSave = () => {
        const { countryCallingCode, number } = this.state.value;
        if (this.formRef.current.validate()) {
            this.props.onSave({ countryCallingCode, number: number.startsWith('0') ? number.substr(1) : number });
            this.setState({ editMode: false });
        }
    };

    render() {
        const { className, label, validator, validationMessage, ...rest } = this.props;
        const { value, editMode } = this.state;

        const classes = classNames({
            'editable-input': true,
            'editable-input-phone': true,
            'edit-mode': editMode,
            [className]: className,
        });

        return editMode ? (
            <div className={classes}>
                <div className="input-wrapper">
                    <Form ref={this.formRef} validateRefs={[this.phoneRef, this.countryRef]} className="flex-row">
                        <CountrySelect
                            ref={this.countryRef}
                            label={i18n('general.address.country-code')}
                            value={value.countryCallingCode}
                            onChange={this.onChangeCountryCode}
                        />
                        <Input
                            {...rest}
                            value={value.number}
                            small
                            label={i18n('general.address.number')}
                            onChange={this.onChange}
                            ref={this.phoneRef}
                            validator={validator}
                            validationMessage={validationMessage}
                            required
                        />
                    </Form>
                </div>
                <ButtonGroup align="right">
                    <Button name="cancel" onClick={this.onCancel} xSmall round transparent>
                        {i18n('general.cancel')}
                    </Button>
                    <Button name="save" onClick={this.onSave} xSmall round>
                        {i18n('general.save')}
                    </Button>
                </ButtonGroup>
            </div>
        ) : (
            <div className={classes}>
                <label>{label}</label>
                <div className="flex-row">
                    <strong>
                        {value.countryCallingCode} (0) {value.number}
                    </strong>
                    <Button name="edit" onClick={this.onEdit} xSmall round outline>
                        {i18n('general.edit')}
                    </Button>
                </div>
            </div>
        );
    }
}

EditableInputPhone.propTypes = {
    onSave: PropTypes.func.isRequired,
    className: PropTypes.string,
    value: PropTypes.shape(),
    countryCode: PropTypes.string,
    label: PropTypes.string,
    validator: PropTypes.string.isRequired,
    validationMessage: PropTypes.string.isRequired,
};

EditableInputPhone.defaultProps = {
    className: '',
    value: {},
    countryCode: '',
    label: '',
};
