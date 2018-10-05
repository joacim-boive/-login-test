import React from 'react';
import PropTypes from 'prop-types';
import moment from 'moment';
import classNames from 'classnames';
import { Data, DataColumns, DataColumn, DataRow } from '@ecster/ecster-components/DataColumns';
import { Panel } from '@ecster/ecster-components';
import './TransactionsPanel.scss';
import { formatDateShort } from '../../../common/util/format-date';
import { formatAmount } from '../../../common/util/format-amount';

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
                    <>
                        <span>{month}</span>
                        <span>{year}</span>
                    </>
                )}
            </h2>
            <Panel withSidePaddingOnly className="transactions-panel">
                {transactions.map(trans => (
                    <DataColumns key={trans.id} className="row">
                        <DataColumn>
                            <DataRow className="column-row">
                                <Data left className="date">
                                    {formatDateShort(trans.date)}
                                </Data>
                                <Data left>{trans.description}</Data>
                                <Data right>
                                    {formatAmount(trans.type === 'CREDIT' ? trans.amount : -trans.amount, undefined, {
                                        strip00: false,
                                        style: 'decimal',
                                        decimals: 2,
                                    })}
                                </Data>
                            </DataRow>
                        </DataColumn>
                    </DataColumns>
                ))}
            </Panel>
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
