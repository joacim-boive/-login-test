import React from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import { getText as i18n } from '@ecster/ecster-i18n/lib/Translate';
import { ArrowLink } from './../../common/arrow-link/ArrowLink';
import './AccountLinksPanel.scss';

export const AccountLinksPanel = ({ className, ...rest }) => {
    const classes = classNames({
        'account-links-panel': true,
        [className]: className,
    });

    return (
        <div {...rest} className={classes}>
            <ArrowLink text={i18n('account.links.event')} icon="icon-minimize-2" onClick={() => {}} />
            <ArrowLink text={i18n('account.links.credit')} icon="icon-arrow-up" onClick={() => {}} />
            <ArrowLink text={i18n('account.links.part-payment')} icon="icon-layers" onClick={() => {}} />
            <ArrowLink text={i18n('account.links.bills')} icon="icon-file" onClick={() => {}} />
            <ArrowLink text={i18n('account.links.card')} icon="icon-book" onClick={() => {}} />
            <ArrowLink text={i18n('account.links.terms')} icon="icon-info" onClick={() => {}} />
        </div>
    );
};

AccountLinksPanel.propTypes = {
    className: PropTypes.string,
};

AccountLinksPanel.defaultProps = {
    className: '',
};
