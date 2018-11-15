import React, { Component } from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';

import './Radio.scss';

class Radio extends Component {}

class RadioGroup extends Component {
    static propTypes = {
        onChange: PropTypes.func,
        label: PropTypes.string,
        className: PropTypes.string,
        required: PropTypes.bool,
        validationMessage: PropTypes.string,
    };

    static defaultProps = {
        className: '',
        label: '',
        required: false,
        validationMessage: 'Du måste välja en',
        onChange: () => {},
    };

    state = {
        hasErrors: false,
    };

    render() {
        const { label, children, validationMessage, className, style, ...rest } = this.props;

        const classes = classNames({
            'ec-radio': true,
            'has-error': this.state.hasErrors,
            [className]: className,
        });

        return <RadioGroup>{children}</RadioGroup>;
    }
}

export default Radio;
