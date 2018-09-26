import React from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import './EcsterCard.scss';
import Lazyload from '../../../common/images/Lazyload';

export const EcsterCard = ({ className, account, ...rest }) => {
    const classes = classNames({
        'ecster-card': true,
        lazyload: true,
        [className]: className,
    });

    // Default brick id if none exists
    // Uses the ecster card according to https://jira.shbmain.shb.biz/browse/HXDN-11880
    let brickId = 0;

    if (account && account.numberOfCards && parseInt(account.numberOfCards, 0) > 0) {
        // we shouldn't show this component if no card exists
        // eslint-disable-next-line prefer-destructuring
        brickId = account.brickId;
    }

    return (
        <Lazyload
            alt="Ecster Pay Card"
            className={classes}
            src={`/v1/cards/${brickId}.png`}
            widths={[166, 312]}
            {...rest}
        />
    );
};

EcsterCard.propTypes = {
    className: PropTypes.string,
    account: PropTypes.object,
};

EcsterCard.defaultProps = {
    className: '',
    account: null,
};
