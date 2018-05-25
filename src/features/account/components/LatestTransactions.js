import React from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import { DataColumns, DataColumn, DataRow, Data } from '@ecster/ecster-components/DataColumns';
import './LatestTransactions.scss';

export const LatestTransactions = ({ className, ...rest }) => {
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
                    <DataRow>
                        <Data weak left className="latest-transactions__date">
                            29 Juni
                        </Data>
                        <Data left>K-Rauta</Data>
                        <Data strong right>
                            499 kr
                        </Data>
                    </DataRow>
                    <DataRow>
                        <Data weak left className="latest-transactions__date">
                            31 Maj
                        </Data>
                        <Data left>Elgiganten</Data>
                        <Data strong right>
                            499 kr
                        </Data>
                    </DataRow>
                    <DataRow>
                        <Data weak left className="latest-transactions__date">
                            30 April
                        </Data>
                        <Data left>ICA Bromma</Data>
                        <Data strong right>
                            -12 334 kr
                        </Data>
                    </DataRow>
                </DataColumn>
            </DataColumns>
        </div>
    );
};

LatestTransactions.propTypes = {
    className: PropTypes.string,
};

LatestTransactions.defaultProps = {
    className: '',
};
