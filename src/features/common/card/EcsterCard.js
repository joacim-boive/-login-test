import React from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import './EcsterCard.scss';

export const EcsterCard = ({ className }) => {
    const classes = classNames({
        'ecster-card': true,
        [className]: className,
    });

    return (
        <div className={classes}>
            <img alt="Ecster Pay Card" src="../../../images/ecster-card-bitmap.jpg" />
        </div>
    );
};

EcsterCard.propTypes = {
    className: PropTypes.string,
};

EcsterCard.defaultProps = {
    className: '',
};
