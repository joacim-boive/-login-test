import React from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import { ArrowLink } from './../../common/arrow-link/ArrowLink';
import './AccountLinksPanel.scss';

export const AccountLinksPanel = ({ className, ...rest }) => {
    const classes = classNames({
        'account-links-panel': true,
        [className]: className,
    });

    return (
        <div {...rest} className={classes}>
            <ArrowLink text="Kontohändelser" icon="icon-minimize-2" onClick={() => {}} />
            <ArrowLink text="Höj kredit" icon="icon-layers" onClick={() => {}} />
            <ArrowLink text="Delbetalningar" icon="icon-arrow-up" onClick={() => {}} />
            <ArrowLink text="Månadsfakturor" icon="icon-file" onClick={() => {}} />
            <ArrowLink text="Hantera Kort" icon="icon-info" onClick={() => {}} />
            <ArrowLink text="Kontovillkor" icon="icon-book" onClick={() => {}} />
        </div>
    );
};

AccountLinksPanel.propTypes = {
    className: PropTypes.string,
};

AccountLinksPanel.defaultProps = {
    className: '',
};
