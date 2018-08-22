import React from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import './EcsterCard.scss';

const ecsterCard = require('../../../images/ecster-card-bitmap.jpg');

export const EcsterCard = ({ className, ...rest }) => {
    const classes = classNames({
        'ecster-card': true,
        [className]: className,
    });

    return (
        <div {...rest}>
            <div className={classes}>
                <img alt="Ecster Pay Card" src={ecsterCard} />
            </div>
        </div>
    );
};

EcsterCard.propTypes = {
    className: PropTypes.string,
};

EcsterCard.defaultProps = {
    className: '',
};
