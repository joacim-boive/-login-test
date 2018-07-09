import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import { Select, Option } from '@ecster/ecster-components';
import { getText as i18n } from '@ecster/ecster-i18n/lib/Translate';
import './CountryCodeSelect.scss';

export class CountryCodeSelect extends Component {
    componentWillMount() {
        this.countryCodes = require(`./countrycodes-${this.props.language}`); // eslint-disable-line
    }

    onChange = e => {
        const { value } = e.target;
        this.props.onChange(value);
    };

    render() {
        const { className, value, label, disabled } = this.props;

        if (!this.countryCodes) return null;

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
                    {this.countryCodes.map(obj => (
                        <Option
                            key={`${obj.countryName} (${obj.phoneCode})`}
                            label={`${obj.countryName} (${obj.phoneCode})`}
                            value={obj.phoneCode}
                        />
                    ))}
                </Select>
            </div>
        );
    }
}

CountryCodeSelect.propTypes = {
    className: PropTypes.string,
    value: PropTypes.string,
    label: PropTypes.string,
    language: PropTypes.string.isRequired,
    disabled: PropTypes.bool,
    onChange: PropTypes.func.isRequired,
};

CountryCodeSelect.defaultProps = {
    className: '',
    value: '',
    label: '',
    disabled: true,
};

/* istanbul ignore next */
function mapStateToProps(state) {
    return {
        language: state.home.language,
    };
}

export default connect(
    mapStateToProps,
    undefined
)(CountryCodeSelect);
