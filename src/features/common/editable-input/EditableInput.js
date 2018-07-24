import React, { Component } from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import { Input, Button } from '@ecster/ecster-components';
import { getText as i18n } from '@ecster/ecster-i18n/lib/Translate';
import './EditableInput.scss';

export class EditableInput extends Component {
    state = {
        disabled: !this.props.editMode,
        value: this.props.value || '',
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
        this.setState({ disabled: true });
    };

    onSave = () => {
        this.props.onSave(this.state.value);
        this.setState({ disabled: true });
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
                <Input label={label} value={value} disabled={disabled} small onChange={this.onChange} />
                {disabled ? (
                    <Button name="edit" onClick={this.onEdit} small round outline>
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
