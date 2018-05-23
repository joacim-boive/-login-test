import React from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import './NextPaymentPanel.scss';

export const NextPaymentPanel = ({ className }) => {
    const classes = classNames({
        'next-payment-panel': true,
        [className]: className,
    });

    return (
        <div className={classes}>
            <h4>Nästa betalning</h4>
            <div>Detaljerad faktura</div>
            <label>Att betala i juni:</label>
            <div>8 928 kr</div>
            <label>Förfallodatum:</label>
            <div>2018-06-01</div>
        </div>
    );
};

NextPaymentPanel.propTypes = {
    className: PropTypes.string,
};

NextPaymentPanel.defaultProps = {
    className: '',
};
