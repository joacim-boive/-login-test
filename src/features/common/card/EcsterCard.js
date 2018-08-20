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

    if (!(account && account.numberOfCards && parseInt(account.numberOfCards, 0) > 0)) {
        // we shouldn't show this component if no cards exists
        return null;
    }

    return (
        <Lazyload
            alt="Ecster Pay Card"
            className={classes}
            src={`/v1/cards/${account.brickId || 0}.png`}
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
