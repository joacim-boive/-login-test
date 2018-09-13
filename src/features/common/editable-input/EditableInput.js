import React, { Component } from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import { Input, Button, ButtonGroup } from '@ecster/ecster-components';
import { getText as i18n } from '@ecster/ecster-i18n/lib/Translate';
import './EditableInput.scss';

export class EditableInput extends Component {
    state = {
        editMode: false,
        value: this.props.value || '',
        valueUnedited: this.props.value || '',
    };

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
        this.setState({ editMode: true }, () => {
            this.inputRef.getInputEl().focus();
        });
    };

    onCancel = () => {
        this.setState({ editMode: false, value: this.state.valueUnedited });
    };

    onSave = () => {
        this.props.onSave(this.state.value);
        this.setState({ editMode: false });
    };

    render() {
        const { className, label, ...rest } = this.props;
        const { value, editMode } = this.state;

        const classes = classNames({
            'editable-input': true,
            'edit-mode': editMode,
            [className]: className,
        });

        return editMode ? (
            <div className={classes}>
                <Input
                    {...rest}
                    label={label}
                    value={value}
                    small
                    onChange={this.onChange}
                    ref={input => (this.inputRef = input)}
                />
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
                    <strong>{value}</strong>
                    <Button name="edit" onClick={this.onEdit} xSmall round outline>
                        {i18n('general.edit')}
                    </Button>
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
};

EditableInput.defaultProps = {
    className: '',
    value: '',
    label: '',
};
