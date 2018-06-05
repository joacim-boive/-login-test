import React from 'react';
import PropTypes from 'prop-types';
import moment from 'moment';
import { formatAmountCurrency } from '@ecster/ecster-util';
import { Data, DataColumns, DataColumn, DataRow } from '@ecster/ecster-components/DataColumns';
import './TransactionsPanel.scss';
import { formatDateShort } from './../../../common/util/format-date';

const capitalize = string => string.charAt(0).toUpperCase() + string.slice(1);

export const TransactionsPanel = ({ transactions, header }) => {
    if (transactions.length === 0) return null;

    const year = moment(transactions[0].date).format('YYYY');
    const month = capitalize(moment(transactions[0].date).format('MMMM'));

    return (
        <div className="transactions-panel">
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
                    <DataColumns key={trans.id} className="transactions-panel__row">
                        <DataColumn>
                            <DataRow className="transactions-panel__column-row">
                                <Data left className="transactions-panel__date">
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
};

TransactionsPanel.defaultProps = {
    header: '',
};
