import React from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import { getText as i18n } from '@ecster/ecster-i18n/lib/Translate';
import { ArrowLink } from '../../common/arrow-link/ArrowLink';
import './AccountLinksPanel.scss';

export const AccountLinksPanel = ({ account, customer, hasInactiveCards }) => {
    const classes = classNames({
        'account-links-panel': true,
    });

    if (!account) return null;

    const hasCard = account.numberOfCards > 0;

    const activateCards = hasInactiveCards && 'Aktivera';

    return (
        <div className={classes}>
            <ArrowLink
                text={i18n('account.links.transactions')}
                icon="icon-minimize-2"
                to={`/account/${account.reference}/customer/${customer.id}/transactions`}
                id="arrow-link-account-overview-transactions"
            />
            <ArrowLink
                text={i18n('account.links.raise-credit')}
                icon="icon-arrow-up"
                to={`/account/${account.reference}/customer/${customer.id}/raise-credit`}
                id="arrow-link-account-overview-raise-credit"
            />
            <ArrowLink
                text={i18n('account.links.part-payments')}
                icon="icon-layers"
                to={`/account/${account.reference}/part-payments`}
                id="arrow-link-account-overview-part-payments"
            />
            <ArrowLink
                text={i18n('account.links.monthly-invoices')}
                icon="icon-file"
                to="/invoice/monthly-invoices"
                id="arrow-link-account-overview-monthly-invoices"
            />
            <ArrowLink
                text={hasCard ? i18n('account.links.manage-cards') : i18n('account.links.apply-for-card')}
                icon="icon-book"
                to={`/card/${account.reference}/customer/${customer.id}`}
                id="arrow-link-account-overview-manage-cards"
                badge={activateCards}
            />
            <ArrowLink
                text={i18n('account.links.terms')}
                icon="icon-info"
                to={`/account/${account.reference}/customer/${customer.id}/terms`}
                id="arrow-link-account-overview-account-terms"
            />
        </div>
    );
};

AccountLinksPanel.propTypes = {
    account: PropTypes.shape().isRequired,
    customer: PropTypes.shape().isRequired,
    hasInactiveCards: PropTypes.bool.isRequired,
};

AccountLinksPanel.defaultProps = {};
