import React from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import Slider from 'rc-slider/lib/Slider';
import 'rc-slider/assets/index.css';
import { getText as i18n } from '@ecster/ecster-i18n/lib/Translate';
import './SliderPanel.scss';
import { InteractiveElement } from './../../common/interactive-element/InteractiveElement';

export const SliderPanel = ({
    className,
    header,
    onChange,
    onAfterChange,
    min,
    max,
    defaultValue,
    value,
    displayedValue,
    step,
}) => {
    const classes = classNames({
        'slider-panel': true,
        [className]: className,
    });

    return (
        <div className={classes}>
            <h4>{i18n(header)}</h4>
            <h5>{displayedValue}</h5>
            <div className="wrapper">
                <InteractiveElement>-</InteractiveElement>
                <Slider
                    min={min}
                    max={max}
                    step={step}
                    defaultValue={defaultValue}
                    value={value || defaultValue}
                    onChange={onChange}
                    onAfterChange={onAfterChange}
                />
                <InteractiveElement>+</InteractiveElement>
            </div>
        </div>
    );
};

SliderPanel.propTypes = {
    className: PropTypes.string,
    header: PropTypes.string.isRequired,
    onChange: PropTypes.func,
    onAfterChange: PropTypes.func,
    min: PropTypes.number,
    max: PropTypes.number,
    defaultValue: PropTypes.number,
    value: PropTypes.number,
    step: PropTypes.number,
    displayedValue: PropTypes.string,
};

SliderPanel.defaultProps = {
    className: '',
    onChange: () => {},
    onAfterChange: () => {},
    min: 0,
    max: 100000,
    defaultValue: 0,
    value: 0,
    step: 1,
    displayedValue: '',
};
