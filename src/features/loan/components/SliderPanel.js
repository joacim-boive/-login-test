import React from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import Slider from 'rc-slider/lib/Slider';
import 'rc-slider/assets/index.css';
import { getText as i18n } from '@ecster/ecster-i18n/lib/Translate';
import './SliderPanel.scss';

export const SliderPanel = ({ className, header }) => {
    const classes = classNames({
        'slider-panel': true,
        [className]: className,
    });

    return (
        <div className={classes}>
            <h4>{i18n(header)}</h4>
            <Slider />
        </div>
    );
};

SliderPanel.propTypes = {
    className: PropTypes.string,
    header: PropTypes.string.isRequired,
};

SliderPanel.defaultProps = {
    className: '',
};
