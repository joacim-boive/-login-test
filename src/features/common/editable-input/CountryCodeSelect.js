import React, { Component } from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import { Select, Option } from '@ecster/ecster-components';
import { getText as i18n } from '@ecster/ecster-i18n/lib/Translate';
import './CountryCodeSelect.scss';

export class CountryCodeSelect extends Component {
    onChange = e => {
        const { value } = e.target;
        console.log('onChange Select', value);
        this.props.onChange(value);
    };

    render() {
        const { className, value, label, disabled } = this.props;

        const classes = classNames({
            'country-code-select': true,
            [className]: className,
        });

        const classesSelect = classNames({
            select: true,
            disabled,
        });

        return (
            <div className={classes}>
                <Select
                    disabled={disabled}
                    className={classesSelect}
                    label={label}
                    value={value}
                    onChange={this.onChange}
                    small
                >
                    <Option label="+46" value="+46" />
                </Select>
            </div>
        );
    }
}

CountryCodeSelect.propTypes = {
    className: PropTypes.string,
    value: PropTypes.string,
    label: PropTypes.string,
    disabled: PropTypes.bool,
    onChange: PropTypes.func.isRequired,
};

CountryCodeSelect.defaultProps = {
    className: '',
    value: '',
    label: '',
    disabled: true,
};
