import React from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import { getText as i18n } from '@ecster/ecster-i18n/lib/Translate';
import { Link, TabletOrDesktop, Mobile, LabelValue } from '@ecster/ecster-components';
import { DataColumns, DataColumn, DataRow, Data } from '@ecster/ecster-components/DataColumns';
import './NextPaymentPanel.scss';

import { formatDate, formatDateMonth } from '../../../common/util/format-date';
import { formatAmount } from '../../../common/util/format-amount';
import { formatAccount } from '../../../common/util/format-account';

export const NextPaymentPanel = ({ className, bills, bg, ocr }) => {
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

    const monthlyInvoiceRoute = '/invoice/monthly-invoices';

    const TheHeader = ({ icon }) => (
        <h4>
            {i18n('account.next-payment.header')}
            {icon && <i className={icon} />}
        </h4>
    );

    TheHeader.propTypes = {
        icon: PropTypes.string,
    };

    TheHeader.defaultProps = {
        icon: undefined,
    };

    const TheData = () => (
        <>
            <LabelValue label={`${i18n('account.next-payment.pay-in')} ${month}`} value={formatAmount(amount)} />
            <LabelValue label={i18n('account.next-payment.deadline')} value={formatDate(date)} />
            {bg && <LabelValue label={i18n('account.next-payment.bg')} value={bg} />}
            {ocr && <LabelValue label={i18n('account.next-payment.ocr')} value={ocr} />}
        </>
    );

    return (
        <div className={classes}>
            {hasBills ? (
                <>
                    <Mobile>
                        <Link
                            to={monthlyInvoiceRoute}
                            className="link-no-style"
                            id="show-detailed-invoice-mobile"
                            underline={false}
                        >
                            <TheHeader icon="icon-chevron-right" />
                            <TheData />
                        </Link>
                    </Mobile>
                    <TabletOrDesktop>
                        <TheHeader />
                        <TheData />
                        <Link
                            className="detail-link"
                            purple
                            iconRight="icon-chevron-right"
                            iconColorClass="e-black"
                            to={monthlyInvoiceRoute}
                            underline={false}
                            id="show-detailed-invoice-tablet-or-desktop"
                        >
                            {i18n('account.next-payment.show-details')}
                        </Link>
                    </TabletOrDesktop>
                </>
            ) : (
                <>
                    <TheHeader />
                    {i18n('account.next-payment.missing', {
                        returnObjects: true,
                        nr: formatAccount(bills.ocrNumber),
                        wrapper: { tag: 'p' },
                    })}
                </>
            )}
        </div>
    );
};

NextPaymentPanel.propTypes = {
    bills: PropTypes.shape(),
    className: PropTypes.string,
    bg: PropTypes.string,
    ocr: PropTypes.string,
};

NextPaymentPanel.defaultProps = {
    className: '',
    bills: {},
    bg: undefined,
    ocr: undefined,
};
