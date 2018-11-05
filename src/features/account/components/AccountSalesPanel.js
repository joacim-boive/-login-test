import React from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import { Button, ButtonGroup } from '@ecster/ecster-components';
import { getText as i18n } from '@ecster/ecster-i18n/lib/Translate';
import './AccountSalesPanel.scss';

export const AccountSalesPanel = ({ className }) => {
    const classes = classNames({
        'account-sales-panel': true,
        [className]: className,
    });

    return (
        <div className={classes}>
            <h4>{i18n('account.sales-panel.header')}</h4>
            <p>{i18n('account.sales-panel.body')}</p>
            <ButtonGroup alignCenter spaceBelow={false}>
                <Button outline round onClick={() => {}} name="submit" gaLabel="read-and-apply-for-card">
                    {i18n('account.sales-panel.button')}
                </Button>
            </ButtonGroup>
        </div>
    );
};

AccountSalesPanel.propTypes = {
    className: PropTypes.string,
};

AccountSalesPanel.defaultProps = {
    className: '',
};
