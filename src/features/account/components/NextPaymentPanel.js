import React from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import { Link } from 'react-router-dom';
import { getText as i18n } from '@ecster/ecster-i18n/lib/Translate';
import { LinkButton, TabletOrDesktop, Mobile } from '@ecster/ecster-components';
import { DataColumns, DataColumn, DataRow, Data } from '@ecster/ecster-components/DataColumns';
import './NextPaymentPanel.scss';

import { formatDate, formatDateMonth } from '../../../common/util/format-date';
import { formatAmount } from '../../../common/util/format-amount';

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

    const TheHeader = () => (
        <DataRow>
            <Data stronger left>
                <h4>{i18n('account.next-payment.header')}</h4>
            </Data>
        </DataRow>
    );

    const TheData = () => (
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
            {bg && (
                <DataRow>
                    <Data left>{i18n('account.next-payment.bg')}</Data>
                    <Data strong right>
                        {bg}
                    </Data>
                </DataRow>
            )}
            {ocr && (
                <DataRow>
                    <Data left>{i18n('account.next-payment.ocr')}</Data>
                    <Data strong right>
                        {ocr}
                    </Data>
                </DataRow>
            )}
        </>
    );

    const TheLink = () => (
        <DataRow>
            <Data right>
                <LinkButton iconRight="icon-chevron-right" className="show-more" to={monthlyInvoiceRoute}>
                    {i18n('account.next-payment.show-details')}
                </LinkButton>
            </Data>
        </DataRow>
    );

    return (
        <div className={classes}>
            <DataColumns>
                <DataColumn>
                    {hasBills ? (
                        <>
                            <Mobile>
                                <Link to={monthlyInvoiceRoute} className="link-no-style">
                                    <TheHeader />
                                    <TheData />
                                </Link>
                            </Mobile>
                            <TabletOrDesktop>
                                <TheHeader />
                                <TheData />
                                <TheLink />
                            </TabletOrDesktop>
                        </>
                    ) : (
                        <>
                            <TheHeader />
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
    bg: PropTypes.string,
    ocr: PropTypes.string,
};

NextPaymentPanel.defaultProps = {
    className: '',
    bills: {},
    bg: undefined,
    ocr: undefined,
};
