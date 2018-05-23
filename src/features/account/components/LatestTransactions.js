import React from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import './LatestTransactions.scss';

export const LatestTransactions = ({ className }) => {
    const classes = classNames({
        'latest-transactions': true,
        [className]: className,
    });

    return (
        <div className={classes}>
            <h4>Senaste händelser</h4>
            <div>Se fler</div>
        </div>
    );
};

LatestTransactions.propTypes = {
    className: PropTypes.string,
};

LatestTransactions.defaultProps = {
    className: '',
};
