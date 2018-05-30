import React from 'react';
import PropTypes from 'prop-types';

const Spinner = props => {
    const { id, isVisible, isCenter, isFillParentHeight, radius, strokeForegroundWidth, strokeBackgroundWidth } = props;

    let thisRadius = radius;

    if (strokeBackgroundWidth > 11) {
        /* The stroke won fit the box if bigger then 11 so we must reduce the radius with half the stroke width. */
        thisRadius = radius - strokeBackgroundWidth / 2;
    }

    return (
        <span
            id={`spinner__${id}`}
            className={`spinner
                ${isCenter ? 'spinner--center' : ''}
                ${isVisible ? 'spinner--visible' : 'spinner--hidden'}
                ${isFillParentHeight ? 'spinner--fill-parent-height' : ''}
            `}
        >
            <svg
                className="spinner__svg"
                viewBox="0 0 100 100"
                preserveAspectRatio="xMidYMid meet"
                width="100"
                height="100"
            >
                <title>Var vänlig vänta - nästa funktion laddas.</title>
                <defs>
                    {/* Cuts the gradient short, so we get a solid color at the start of the spinner. */}
                    <clipPath id={`spinner__${id}-clip-path`}>
                        <rect x="0" y="50" width="100" height="100" />
                    </clipPath>

                    {/* The gradient in the spinner */}
                    <linearGradient id={`spinner__${id}-gradient`}>
                        <stop offset="0" stopColor="#59b189" />
                        <stop offset="100%" stopColor="#59b189" stopOpacity="0" />
                    </linearGradient>
                </defs>
                {/* This is the solid background ring */}
                <circle
                    cx="50"
                    cy="50"
                    r={thisRadius}
                    stroke="#eff8f3"
                    strokeWidth={strokeBackgroundWidth}
                    fill="none"
                    opacity="1"
                />
                {/* This is the gradient part */}
                <circle
                    cx="50"
                    cy="50"
                    r={thisRadius}
                    stroke={`url(#spinner__${id}-gradient)`}
                    strokeWidth={strokeForegroundWidth}
                    fill="none"
                    clipPath={`url(#spinner__${id}-clip-path)`}
                />
            </svg>
        </span>
    );
};

Spinner.propTypes = {
    id: PropTypes.string.isRequired,
    radius: PropTypes.number,
    strokeForegroundWidth: PropTypes.number,
    strokeBackgroundWidth: PropTypes.number,
    isCenter: PropTypes.bool,
    isVisible: PropTypes.bool,
    isFillParentHeight: PropTypes.bool,
};

Spinner.defaultProps = {
    radius: 45,
    strokeForegroundWidth: 8,
    strokeBackgroundWidth: 8,
    isCenter: false,
    isVisible: false,
    isFillParentHeight: false,
};

export default Spinner;
