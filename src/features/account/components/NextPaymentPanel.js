import React from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import { DataColumns, DataColumn, DataRow, Data } from '@ecster/ecster-components/DataColumns';
import './NextPaymentPanel.scss';

export const NextPaymentPanel = ({ className, bills }) => {
    const classes = classNames({
        'next-payment-panel': true,
        [className]: className,
    });

    let amount = 0;
    let fullPayment = {};
    if (bills.ocrNumber) {
        [fullPayment] = bills.payment.options.filter(o => o.type === 'FULLPAYMENT');
        ({ amount } = fullPayment);
    }
    console.log(bills);
    return (
        <div className={classes}>
            <DataColumns>
                <DataColumn>
                    <DataRow>
                        <Data stronger left>
                            <h4>Nästa Betalning</h4>
                        </Data>
                    </DataRow>
                    <DataRow>
                        <Data left>
                            <div>Att betala i Juni:</div>
                        </Data>
                        <Data strong right>
                            <div>{amount}</div>
                        </Data>
                    </DataRow>
                    <DataRow>
                        <Data left>Förfallodatum:</Data>
                        <Data strong right>
                            <div>2018-06-01</div>
                        </Data>
                    </DataRow>
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
