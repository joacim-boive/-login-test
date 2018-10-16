import React from 'react';
import PropTypes from 'prop-types';
import { Panel } from '@ecster/ecster-components';
import { getText as i18n } from '@ecster/ecster-i18n/lib/Translate';
import moment from 'moment';
import './AccountTransactions.scss';
import { TransactionsPanel } from './TransactionsPanel';

export const parseTransactionsOnMonth = transactions => {
    const result = [];
    transactions.forEach((trans, index) => {
        if (index === 0 || moment(transactions[index].date).month() !== moment(transactions[index - 1].date).month()) {
            result.push([trans]);
        } else {
            result[result.length - 1].push(trans);
        }
    });

    return result;
};

export const AccountTransactions = ({ transactions }) => {
    const parsedTransactions = parseTransactionsOnMonth(transactions);

    if (parsedTransactions.length === 0) {
        return (
            <Panel withTextContent sideMarginsInMobile>
                <div className="text-content">{i18n('account.transactions.no-transactions')}</div>
            </Panel>
        );
    }

    return (
        <div className="account-transactions">
            {parsedTransactions.map(trans => (
                <TransactionsPanel key={trans[0].date} transactions={trans} />
            ))}
        </div>
    );
};

AccountTransactions.propTypes = {
    transactions: PropTypes.array.isRequired,
};
