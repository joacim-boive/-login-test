import React from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import { LinkButton, ButtonGroup } from '@ecster/ecster-components';
import { getText as i18n } from '@ecster/ecster-i18n/lib/Translate';
import './AccountSalesPanel.scss';

export const AccountSalesPanel = ({ className, accountRef, customerId }) => {
    const classes = classNames({
        'account-sales-panel': true,
        [className]: className,
    });

    const url = `/card/${accountRef}/customer/${customerId}`;

    return (
        <div className={classes}>
            <h4>{i18n('account.sales-panel.header')}</h4>
            <p>{i18n('account.sales-panel.body')}</p>
            <ButtonGroup alignLeft spaceBelow={false}>
                <LinkButton to={url} small outline round id="read-and-apply-for-card">
                    {i18n('account.sales-panel.button')}
                </LinkButton>
            </ButtonGroup>
        </div>
    );
};

AccountSalesPanel.propTypes = {
    className: PropTypes.string,
    accountRef: PropTypes.string.isRequired,
    customerId: PropTypes.string.isRequired,
};

AccountSalesPanel.defaultProps = {
    className: '',
};
