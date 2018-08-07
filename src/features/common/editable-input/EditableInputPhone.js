import React, { Component } from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import { Input, Button, ButtonGroup } from '@ecster/ecster-components';
import { getText as i18n } from '@ecster/ecster-i18n/lib/Translate';
import './EditableInputPhone.scss';
import CountrySelect from './CountryCodeSelect';

export class EditableInputPhone extends Component {
    state = {
        disabled: !this.props.editMode,
        value: this.props.value,
    };

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
        this.setState({ disabled: false });
    };

    onCancel = () => {
        this.setState({ disabled: true, value: this.props.value });
    };

    onSave = () => {
        this.props.onSave(this.state.value);
        this.setState({ disabled: true });
    };

    render() {
        const { className, label, ...rest } = this.props;
        const { disabled, value } = this.state;

        const classes = classNames({
            'editable-input': true,
            'editable-input-phone': true,
            'edit-mode': !disabled,
            [className]: className,
        });

        return (
            <div className={classes}>
                <div className="input-wrapper">
                    <CountrySelect
                        label={label}
                        value={value.countryCallingCode}
                        disabled={disabled}
                        onChange={this.onChangeCountryCode}
                    />
                    <Input {...rest} value={value.number} disabled={disabled} small onChange={this.onChange} />
                </div>
                {disabled ? (
                    <Button name="edit" onClick={this.onEdit} small round outline>
                        {i18n('general.edit')}
                    </Button>
                ) : (
                    <ButtonGroup align="right">
                        <Button name="cancel" onClick={this.onCancel} small round transparent>
                            {i18n('general.cancel')}
                        </Button>
                        <Button name="save" onClick={this.onSave} small round>
                            {i18n('general.save')}
                        </Button>
                    </ButtonGroup>
                )}
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
    editMode: PropTypes.bool,
};

EditableInputPhone.defaultProps = {
    className: '',
    value: {},
    countryCode: '',
    label: '',
    editMode: false,
};
