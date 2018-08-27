import React from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import { getText as i18n } from '@ecster/ecster-i18n/lib/Translate';
import { DataColumns, DataColumn, DataRow, Data } from '@ecster/ecster-components/DataColumns';
import './LatestTransactions.scss';
import { LinkButton } from '@ecster/ecster-components';
import { formatDateShort } from '../../../common/util/format-date';
import { formatAmount } from '../../../common/util/format-amount';

export const LatestTransactions = ({ className, transactions, account, user, ...rest }) => {
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
                            }).map(obj => (
                                <DataRow key={obj.key}>{obj}</DataRow>
                            ))}
                        </>
                    )}
                    {hasTransactions && (
                        <DataRow>
                            <Data right>
                                <LinkButton
                                    iconRight={`icon-chevron-right`}
                                    className={`show-more`}
                                    to={`/account/${account.reference}/customer/${user.id}/transactions`}
                                >
                                    {i18n('general.showMore')}
                                </LinkButton>
                            </Data>
                        </DataRow>
                    )}
                </DataColumn>
            </DataColumns>
        </div>
    );
};

LatestTransactions.propTypes = {
    className: PropTypes.string,
    transactions: PropTypes.arrayOf(PropTypes.shape()).isRequired,
    account: PropTypes.shape().isRequired,
};

LatestTransactions.defaultProps = {
    className: '',
};
