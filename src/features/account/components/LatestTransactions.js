import React from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import { getText as i18n } from '@ecster/ecster-i18n/lib/Translate';
import { DataColumns, DataColumn, DataRow, Data } from '@ecster/ecster-components/DataColumns';
import './LatestTransactions.scss';
import { formatDateShort } from '../../../common/util/format-date';
import { formatAmount } from '../../../common/util/format-amount';

export const LatestTransactions = ({ className, transactions, ...rest }) => {
    const classes = classNames({
        'latest-transactions': true,
        [className]: className,
    });

    const hasTransactions = transactions.length !== 0;

    return (
        <div {...rest} className={classes}>
            <DataColumns>
                <DataColumn>
                    <DataRow>
                        <Data stronger>
                            <h4>{i18n('account.latest-transactions.header')}</h4>
                        </Data>
                    </DataRow>
                    {hasTransactions ? (
                        transactions.map(trans => (
                            <DataRow key={trans.id}>
                                <Data weak left className="latest-transactions__date">
                                    {formatDateShort(trans.date)}
                                </Data>
                                <Data left>{trans.description}</Data>
                                <Data strong right>
                                    {formatAmount(
                                        trans.type === 'CREDIT' ? trans.amount : -trans.amount,
                                        trans.currency
                                    )}
                                </Data>
                            </DataRow>
                        ))
                    ) : (
                        <>
                            {i18n('account.latest-transactions.missing', {
                                returnObjects: true,
                                wrapper: { tag: Data },
                            }).map(obj => <DataRow key={obj.key}>{obj}</DataRow>)}
                        </>
                    )}
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
