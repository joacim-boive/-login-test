import React from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import { getText as i18n } from '@ecster/ecster-i18n/lib/Translate';
import { ArrowLink } from '../../common/arrow-link/ArrowLink';
import './AccountLinksPanel.scss';

export const AccountLinksPanel = ({ className, account, user, ...rest }) => {
    const classes = classNames({
        'account-links-panel': true,
        [className]: className,
    });

    if (!account) return null;

    const hasCard = account.numberOfCards > 0;

    return (
        <div {...rest} className={classes}>
            <ArrowLink
                text={i18n('account.links.event')}
                icon="icon-minimize-2"
                to={`/account/${account.reference}/customer/${user.id}/transactions`}
            />
            <ArrowLink text={i18n('account.links.credit')} icon="icon-arrow-up" />
            <ArrowLink text={i18n('account.links.part-payment')} icon="icon-layers" />
            <ArrowLink text={i18n('account.links.bills')} icon="icon-file" />
            {hasCard ? (
                <ArrowLink text={i18n('account.links.card')} icon="icon-book" />
            ) : (
                <ArrowLink text={i18n('account.links.apply-card')} icon="icon-book" />
            )}
            <ArrowLink
                text={i18n('account.links.terms')}
                icon="icon-info"
                to={`/account/${account.reference}/customer/${user.id}/terms`}
            />
        </div>
    );
};

AccountLinksPanel.propTypes = {
    className: PropTypes.string,
    account: PropTypes.shape().isRequired,
    user: PropTypes.shape().isRequired,
};

AccountLinksPanel.defaultProps = {
    className: '',
};
