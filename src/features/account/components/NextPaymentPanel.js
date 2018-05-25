import React from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import { DataColumns, DataColumn, DataRow, Data } from '@ecster/ecster-components/DataColumns';
import './NextPaymentPanel.scss';

export const NextPaymentPanel = ({ className, ...rest }) => {
    const classes = classNames({
        'next-payment-panel': true,
        [className]: className,
    });

    return (
        <div {...rest} className={classes}>
            <DataColumns>
                <DataColumn>
                    <DataRow>
                        <Data stronger left>
                            <h4>Nästa Betalning</h4>
                        </Data>
                    </DataRow>
                    <DataRow>
                        <Data left>Att betala i juni:</Data>
                        <Data strong right>
                            8 928 kr
                        </Data>
                    </DataRow>
                    <DataRow>
                        <Data left>Förfallodatum:</Data>
                        <Data strong right>
                            2018-06-01
                        </Data>
                    </DataRow>
                </DataColumn>
            </DataColumns>
        </div>
    );
};

NextPaymentPanel.propTypes = {
    className: PropTypes.string,
};

NextPaymentPanel.defaultProps = {
    className: '',
};
