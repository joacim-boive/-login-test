import React from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import { formatAmountCurrency } from '@ecster/ecster-util';
import { Translate } from '@ecster/ecster-i18n';
import { DataColumns, DataColumn, DataRow, Data } from '@ecster/ecster-components/DataColumns';
import './LatestTransactions.scss';
import { formatDateShort } from './../../../common/util/format-date';

const i18n = Translate.getText;

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
                                    {formatAmountCurrency(
                                        trans.type === 'CREDIT' ? trans.amount : -trans.amount,
                                        'sv-SE',
                                        trans.currency,
                                        true
                                    )}
                                </Data>
                            </DataRow>
                        ))
                    ) : (
                        <React.Fragment>
                            {i18n('account.latest-transactions.missing', {
                                returnObjects: true,
                                wrapper: { tag: Data },
                            }).map(obj => <DataRow key={obj.key}>{obj}</DataRow>)}
                        </React.Fragment>
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
