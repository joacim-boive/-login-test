import React from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import Button from '@ecster/ecster-components/Button';
import { getText as i18n } from '@ecster/ecster-i18n/lib/Translate';
import { DataColumns, DataColumn, DataRow, Data } from '@ecster/ecster-components/DataColumns';
import './AccountSalesPanel.scss';

export const AccountSalesPanel = ({ className }) => {
    const classes = classNames({
        'account-sales-panel': true,
        [className]: className,
    });

    return (
        <div className={classes}>
            <DataColumns>
                <DataColumn>
                    <DataRow>
                        <Data stronger>
                            <h4>{i18n('account.sales-panel.header')}</h4>
                        </Data>
                    </DataRow>
                    <DataRow>
                        <Data>{i18n('account.sales-panel.body')}</Data>
                        <Data className="button-column">
                            <Button outline round onClick={() => {}} name="ansök">
                                {i18n('account.sales-panel.button')}
                            </Button>
                        </Data>
                    </DataRow>
                </DataColumn>
            </DataColumns>
        </div>
    );
};

AccountSalesPanel.propTypes = {
    className: PropTypes.string,
};

AccountSalesPanel.defaultProps = {
    className: '',
};
