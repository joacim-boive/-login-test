import React from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import { getText as i18n } from '@ecster/ecster-i18n/lib/Translate';
import { DataColumns, DataColumn, DataRow, Data } from '@ecster/ecster-components/DataColumns';
import './NextPaymentPanel.scss';
import { LinkButton } from '@ecster/ecster-components';

import { formatDate, formatDateMonth } from '../../../common/util/format-date';
import { formatAmount } from '../../../common/util/format-amount';

export const NextPaymentPanel = ({ className, bills }) => {
    const classes = classNames({
        'next-payment-panel': true,
        [className]: className,
    });
    const hasBills = bills.ocrNumber && bills.payment;

    let date = '';
    let amount = 0;
    let fullPayment = {};

    if (hasBills) {
        [fullPayment] = bills.payment.options.filter(o => o.type === 'FULLPAYMENT');
        ({ amount } = fullPayment);
        date = bills.payment.dueDate;
    }

    const month = formatDateMonth(date);

    return (
        <div className={classes}>
            <DataColumns>
                <DataColumn>
                    <DataRow>
                        <Data stronger left>
                            <h4>{i18n('account.next-payment.header')}</h4>
                        </Data>
                    </DataRow>
                    {hasBills ? (
                        <>
                            <DataRow>
                                <Data left>{`${i18n('account.next-payment.pay-in')} ${month}`}</Data>
                                <Data strong right>
                                    {formatAmount(amount)}
                                </Data>
                            </DataRow>
                            <DataRow>
                                <Data left>{i18n('account.next-payment.deadline')}</Data>
                                <Data strong right>
                                    {formatDate(date)}
                                </Data>
                            </DataRow>
                            <DataRow>
                                <Data right>
                                    <LinkButton iconRight="icon-chevron-right" className="show-more" to="/invoice/monthly-invoices">
                                        {i18n('account.next-payment.showDetails')}
                                    </LinkButton>
                                </Data>
                            </DataRow>
                        </>
                    ) : (
                        <>
                            {i18n('account.next-payment.missing', {
                                returnObjects: true,
                                nr: bills.ocrNumber,
                                wrapper: { tag: Data },
                            }).map(obj => (
                                <DataRow key={obj.key}>{obj}</DataRow>
                            ))}
                        </>
                    )}
                </DataColumn>
            </DataColumns>
        </div>
    );
};

NextPaymentPanel.propTypes = {
    bills: PropTypes.shape(),
    className: PropTypes.string,
};

NextPaymentPanel.defaultProps = {
    className: '',
    bills: {},
};
