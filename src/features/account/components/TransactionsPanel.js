import React from 'react';
import PropTypes from 'prop-types';
import moment from 'moment';
import { formatAmountCurrency } from '@ecster/ecster-util';
import classNames from 'classnames';
import { Data, DataColumns, DataColumn, DataRow } from '@ecster/ecster-components/DataColumns';
import './TransactionsPanel.scss';
import { formatDateShort } from './../../../common/util/format-date';

const capitalize = string => string.charAt(0).toUpperCase() + string.slice(1);

export const TransactionsPanel = ({ transactions, header, weak }) => {
    if (transactions.length === 0) return null;

    const classes = classNames({
        'transactions-panel': true,
        'transactions-panel__weak': weak,
    });

    const year = moment(transactions[0].date).format('YYYY');
    const month = capitalize(moment(transactions[0].date).format('MMMM'));

    return (
        <div className={classes}>
            <h2>
                {header ? (
                    <span>{header}</span>
                ) : (
                    <React.Fragment>
                        <span>{month}</span>
                        <span>{year}</span>
                    </React.Fragment>
                )}
            </h2>
            <section>
                {transactions.map(trans => (
                    <DataColumns key={trans.id} className="row">
                        <DataColumn>
                            <DataRow className="column-row">
                                <Data left className="date">
                                    {formatDateShort(trans.date)}
                                </Data>
                                <Data left>{trans.description}</Data>
                                <Data right>{formatAmountCurrency(trans.amount, 'sv-SE', 'SEK', true)}</Data>
                            </DataRow>
                        </DataColumn>
                    </DataColumns>
                ))}
            </section>
        </div>
    );
};

TransactionsPanel.propTypes = {
    transactions: PropTypes.array.isRequired,
    header: PropTypes.string,
    weak: PropTypes.bool,
};

TransactionsPanel.defaultProps = {
    header: '',
    weak: false,
};
