import React, { Component } from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import { Input, Button } from '@ecster/ecster-components';
import { getText as i18n } from '@ecster/ecster-i18n/lib/Translate';
import './EditableInput.scss';

export class EditableInput extends Component {
    state = {
        disabled: true,
        value: this.props.value || 'foobar@ultima.com',
    };

    onChange = e => {
        const { value } = e.target;
        this.setState({ value });
    };

    onClick = () => {
        this.setState({ disabled: false });
    };

    onCancel = () => {
        this.setState({ disabled: true });
    };

    onSave = () => {
        this.props.onSave(this.state.value);
    }

    render() {
        const { className, label } = this.props;
        const { disabled, value } = this.state;

        const classes = classNames({
            'editable-input': true,
            [className]: className,
        });

        return (
            <div className={classes}>
                <Input label={label} value={value} disabled={disabled} small onChange={() => {}} />
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
