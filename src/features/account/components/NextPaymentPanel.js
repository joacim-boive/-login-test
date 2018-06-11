import React from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import { formatAmountCurrency } from '@ecster/ecster-util';
import { Translate } from '@ecster/ecster-i18n';
import { DataColumns, DataColumn, DataRow, Data } from '@ecster/ecster-components/DataColumns';
import './NextPaymentPanel.scss';
import { formatDate, formatDateMonth } from '../../../common/util/format-date';

const i18n = Translate.getText;

export const NextPaymentPanel = ({ className, bills }) => {
    const classes = classNames({
        'next-payment-panel': true,
        [className]: className,
    });

    let date = '';
    let amount = 0;
    let fullPayment = {};
    const hasBills = bills.ocrNumber && bills.payment;
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
                        <React.Fragment>
                            <DataRow>
                                <Data left>
                                    <div>{`${i18n('account.next-payment.pay-in')} ${month}`}</div>
                                </Data>
                                <Data strong right>
                                    <div>{formatAmountCurrency(amount, 'sv-SE', 'SEK', true)}</div>
                                </Data>
                            </DataRow>
                            <DataRow>
                                <Data left>{i18n('account.next-payment.deadline')}</Data>
                                <Data strong right>
                                    <div>{formatDate(date)}</div>
                                </Data>
                            </DataRow>
                        </React.Fragment>
                    ) : (
                        <React.Fragment>
                            <DataRow>
                                <Data className="word-wrap" left>{i18n('account.next-payment.missing1')}</Data>
                            </DataRow>
                            <DataRow>
                                <Data left>{i18n('account.next-payment.missing2')}</Data>
                            </DataRow>
                            <DataRow>
                                <Data left>{i18n('account.next-payment.missing3')}</Data>
                            </DataRow>
                        </React.Fragment>
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
