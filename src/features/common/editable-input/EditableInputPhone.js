import React, { Component } from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import { Form, Input, Button, ButtonGroup } from '@ecster/ecster-components';
import IconButton from '@ecster/ecster-components/Clickable/IconButton';
import { getText as i18n } from '@ecster/ecster-i18n/lib/Translate';
import './EditableInputPhone.scss';
import CountrySelect from './CountryCodeSelect';
import { formatMobileNumber } from '../../../common/util/format-mobile-number';

export class EditableInputPhone extends Component {
    state = {
        value: this.props.value,
        valueUnedited: this.props.value,
    };

    constructor(props) {
        super(props);
        this.countryRef = React.createRef();
        this.phoneRef = React.createRef();
        this.formRef = React.createRef();
    }

    componentDidMount() {
        const { value } = this.state;
        this.setState({ editMode: !value || !value.countryCallingCode || !value.number });
    }

    componentWillReceiveProps(nextProps) {
        const nextValue = nextProps.value;
        const { value } = this.state;

        if (nextValue && nextValue.number !== value.number) {
            this.setState({ value: nextValue });
        }
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
        this.setState({ editMode: true, valueUnedited: this.state.value }, () => {
            console.log('onEdit: unedited after  : ', this.state.valueUnedited);
            this.phoneRef.current.getInputEl().focus();
        });
    };

    onCancel = () => {
        console.log('onCancel: unedited value: ', this.state.valueUnedited);
        this.setState({ editMode: false, value: this.state.valueUnedited });
    };

    onSave = () => {
        const { countryCallingCode, number } = this.state.value;
        console.log('EditableInputPhone: typeof number / value ', typeof number, number);
        if (this.formRef.current.validate()) {
            this.props.onSave({ countryCallingCode, number });
            this.setState({ editMode: false, valueUnedited: this.state.value });
        }
    };

    handleExternalValidate = () => {
        if (this.formRef && this.formRef.current) {
            return this.formRef.current.validate();
        }
        return true;
    };

    render() {
        const { className, label, validator, validationMessage, strong, ...rest } = this.props;
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
                    <Button
                        gaLabel="editable-phone-cancel"
                        name="cancel"
                        onClick={this.onCancel}
                        xSmall
                        round
                        transparent
                    >
                        {i18n('general.cancel')}
                    </Button>
                    <Button gaLabel="editable-phone-save" name="save" onClick={this.onSave} xSmall round>
                        {i18n('general.save')}
                    </Button>
                </ButtonGroup>
            </div>
        ) : (
            <div className={classes}>
                <div className="flex-row">
                    <label>{label}</label>
                    <div>
                        <span className={strong ? 'strong' : ''}>
                            {value.countryCallingCode} (0) {formatMobileNumber(value.number)}
                        </span>
                        <IconButton
                            gaLabel="editable-phone-edit"
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

EditableInputPhone.propTypes = {
    onSave: PropTypes.func.isRequired,
    className: PropTypes.string,
    value: PropTypes.shape(),
    countryCode: PropTypes.string,
    label: PropTypes.string,
    validator: PropTypes.string.isRequired,
    validationMessage: PropTypes.string.isRequired,
    strong: PropTypes.bool,
};

EditableInputPhone.defaultProps = {
    className: '',
    value: {},
    countryCode: '',
    label: '',
    strong: true,
};
