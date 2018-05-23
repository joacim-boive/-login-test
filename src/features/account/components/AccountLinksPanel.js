import React from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import './AccountLinksPanel.scss';

export const AccountLinksPanel = ({ className }) => {
    const classes = classNames({
        'account-links-panel': true,
        [className]: className,
    });

    return (
        <div className={classes}>
            <div> Länk 1 </div>
            <div> Länk 2 </div>
            <div> Länk 3 </div>
            <div> Länk 4 </div>
            <div> Länk 5 </div>
            <div> Länk 6 </div>
            <div> Länk 7 </div>
            <div> Länk 8 </div>
        </div>
    );
};

AccountLinksPanel.propTypes = {
    className: PropTypes.string,
};

AccountLinksPanel.defaultProps = {
    className: '',
};
