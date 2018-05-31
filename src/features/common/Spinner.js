// /* eslint-disable react/self-closing-comp */
// import React from 'react';
// import './Spinner.css';
//
// export default function Spinner() {
//     return (
//         <span className="spinner">
//             <div className="spinner__ctr" >
//                 <div/>
//             </div>
//         </span>
//     );
// }
import React from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';

import { lighten } from '@ecster/ecster-util/lib/rgb-tools';

const Spinner = props => {
    const { id, isVisible, isCenter, isCenterX, isFillParentHeight, radius, strokeWidth, bgColor } = props;

    const baseColor = bgColor ? '#fff' : '#59b189';
    const strokeColor = bgColor ? lighten(bgColor, 0.15) : '#eff8f3';

    // adjust actual radius so everything fits in the viewBox
    const thisRadius = strokeWidth > 11 ? radius - strokeWidth / 2 : radius;
    const containerStyle = isFillParentHeight ? {} : { width: `${radius * 2}px`, height: `${radius * 2}px` };

    return (
        isVisible && (
            <span
                id={`spinner__${id}`}
                className={classNames({
                    spinner: true,
                    'spinner--center': isCenter,
                    'spinner--center-x': isCenterX,
                    'spinner--fill-parent-height': isFillParentHeight,
                })}
                style={containerStyle}
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
                            <stop offset="0" stopColor={baseColor} />
                            <stop offset="100%" stopColor={baseColor} stopOpacity="0" />
                        </linearGradient>
                    </defs>
                    {/* This is the solid background ring */}
                    <circle
                        cx="50"
                        cy="50"
                        r={thisRadius}
                        stroke={strokeColor}
                        strokeWidth={strokeWidth}
                        fill="none"
                        opacity="1"
                    />
                    {/* This is the gradient part */}
                    <circle
                        cx="50"
                        cy="50"
                        r={thisRadius}
                        stroke={`url(#spinner__${id}-gradient)`}
                        strokeWidth={strokeWidth}
                        fill="none"
                        clipPath={`url(#spinner__${id}-clip-path)`}
                    />
                </svg>
            </span>
        )
    );
};

Spinner.propTypes = {
    id: PropTypes.string.isRequired,
    radius: PropTypes.number,
    strokeWidth: PropTypes.number,
    isCenter: PropTypes.bool,
    isCenterX: PropTypes.bool,
    isVisible: PropTypes.bool,
    isFillParentHeight: PropTypes.bool,
    bgColor: PropTypes.string,
};

Spinner.defaultProps = {
    radius: 32,
    strokeWidth: 12,
    isCenter: false,
    isCenterX: false,
    isVisible: false,
    isFillParentHeight: false,
    bgColor: undefined,
};

export default Spinner;
