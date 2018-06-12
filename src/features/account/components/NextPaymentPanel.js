import React from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import { Translate } from '@ecster/ecster-i18n/';
import { DataColumns, DataColumn, DataRow, Data } from '@ecster/ecster-components/DataColumns';
import './NextPaymentPanel.scss';
import { formatDate, formatDateMonth } from '../../../common/util/format-date';
import { formatAmount } from '../../../common/util/format-amount';

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
                        </React.Fragment>
                    ) : (
                        <React.Fragment>
                            {i18n('account.next-payment.missing', {
                                returnObjects: true,
                                nr: bills.ocrNumber,
                                wrapper: { tag: Data },
                            }).map(obj => <DataRow key={obj.key}>{obj}</DataRow>)}
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
