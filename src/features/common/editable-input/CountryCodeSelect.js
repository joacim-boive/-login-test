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
        const { className, value, label, selectRef, id } = this.props;

        if (!this.countryCodes) return null;

        const classes = classNames({
            'country-code-select': true,
            [className]: className,
        });

        const classesSelect = classNames({
            'select-country': true,
        });

        return (
            <div className={classes}>
                <Select
                    id={id}
                    ref={selectRef}
                    className={classesSelect}
                    label={label}
                    value={value}
                    required
                    validationMessage={i18n('general.validation.country-code')}
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
    id: PropTypes.string,
    className: PropTypes.string,
    selectRef: PropTypes.shape().isRequired,
    value: PropTypes.string,
    label: PropTypes.string,
    language: PropTypes.string.isRequired,
    onChange: PropTypes.func.isRequired,
};

CountryCodeSelect.defaultProps = {
    className: '',
    value: '',
    label: '',
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
