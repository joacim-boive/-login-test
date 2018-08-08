import React, { Component } from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import { Input, Button, ButtonGroup } from '@ecster/ecster-components';
import { getText as i18n } from '@ecster/ecster-i18n/lib/Translate';
import './EditableInput.scss';

export class EditableInput extends Component {
    state = {
        disabled: !this.props.editMode,
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
        this.setState({ disabled: false });
    };

    onCancel = () => {
        this.setState({ disabled: true, value: this.state.valueUnedited });
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
            'edit-mode': !disabled,
            [className]: className,
        });

        return (
            <div className={classes}>
                <Input {...rest} label={label} value={value} disabled={disabled} small onChange={this.onChange} />
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

EditableInput.propTypes = {
    onSave: PropTypes.func.isRequired,
    className: PropTypes.string,
    value: PropTypes.string,
    label: PropTypes.string,
    editMode: PropTypes.bool,
};

EditableInput.defaultProps = {
    className: '',
    value: '',
    label: '',
    editMode: false,
};
