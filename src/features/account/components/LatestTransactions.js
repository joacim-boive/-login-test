import React from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import { formatAmountCurrency } from '@ecster/ecster-util';
import { DataColumns, DataColumn, DataRow, Data } from '@ecster/ecster-components/DataColumns';
import './LatestTransactions.scss';
import { formatDateShort } from './../../../common/util/format-date';

export const LatestTransactions = ({ className, transactions, ...rest }) => {
    const classes = classNames({
        'latest-transactions': true,
        [className]: className,
    });

    return (
        <div {...rest} className={classes}>
            <DataColumns>
                <DataColumn>
                    <DataRow>
                        <Data stronger>
                            <h4>Senaste händelser</h4>
                        </Data>
                    </DataRow>
                    {transactions.map(trans => (
                        <DataRow key={trans.id}>
                            <Data weak left className="latest-transactions__date">
                                {formatDateShort(trans.date)}
                            </Data>
                            <Data left>{trans.description}</Data>
                            <Data strong right>
                                {formatAmountCurrency(trans.amount, 'sv-SE', trans.currency, true)}
                            </Data>
                        </DataRow>
                    ))}
                </DataColumn>
            </DataColumns>
        </div>
    );
};

LatestTransactions.propTypes = {
    className: PropTypes.string,
    transactions: PropTypes.arrayOf(PropTypes.shape()).isRequired,
};

LatestTransactions.defaultProps = {
    className: '',
};
