import React, { Component } from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import { Input, Button } from '@ecster/ecster-components';
import { getText as i18n } from '@ecster/ecster-i18n/lib/Translate';
import './EditableInputPhone.scss';
import { CountryCodeSelect } from './CountryCodeSelect';

export class EditableInputPhone extends Component {
    state = {
        disabled: true,
        value: this.props.value,
    };

    onChange = e => {
        const { value } = e.target;
        this.setState({ value });
    };

    onChangeCountryCode = val => {
        const { value } = this.state;
        this.setState({ value: { ...value, countryCallingCode: val } });
    };

    onClick = () => {
        this.setState({ disabled: false });
    };

    onCancel = () => {
        this.setState({ disabled: true });
    };

    onSave = () => {
        this.props.onSave(this.state.value);
    };

    render() {
        const { className, label } = this.props;
        const { disabled, value } = this.state;

        const classes = classNames({
            'editable-input': true,
            [className]: className,
        });

        return (
            <div className={classes}>
                <CountryCodeSelect
                    label={label}
                    value={value.countryCallingCode}
                    disabled={disabled}
                    onChange={this.onChangeCountryCode}
                />
                <Input value={value.number} disabled={disabled} small onChange={() => {}} />
                {disabled ? (
                    <Button name="edit" onClick={this.onClick} small round outline>
                        {i18n('general.buttons.edit')}
                    </Button>
                ) : (
                    <div className="button-wrapper">
                        <Button name="cancel" onClick={this.onCancel} small round transparent>
                            {i18n('general.buttons.cancel')}
                        </Button>
                        <Button name="save" onClick={this.onSave} small round>
                            {i18n('general.buttons.save')}
                        </Button>
                    </div>
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
};

EditableInputPhone.defaultProps = {
    className: '',
    value: {},
    countryCode: '',
    label: '',
};
