import React from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';

import { getText as i18n } from '@ecster/ecster-i18n/lib/Translate';
import { formatAccount } from '../../../common/util/format-account';
import { formatAmount } from '../../../common/util/format-amount';
import infoIcon from '../../../common/images/icon-info-circle.svg';

import './OverdrawnInfo.scss';

const OverdrawnInfo = ({ used, limit, accountNumber, bottomBorder }) => {
    const classes = classNames({
        'account-overdrawn-info': true,
        'bottom-border': bottomBorder,
    });
    return (
        <div className={classes}>
            <img src={infoIcon} />
            <div>
                <strong>{i18n('account.terminate.overdrawn.header')}</strong>
                <p>
                    {i18n('account.terminate.overdrawn.info', {
                        amount: formatAmount(used - limit, undefined, {
                            strip00: true,
                            roundUp: true,
                        }),
                        accountNumber: formatAccount(accountNumber),
                    })}
                </p>
            </div>
        </div>
    );
};

OverdrawnInfo.propTypes = {
    used: PropTypes.number.isRequired,
    limit: PropTypes.number.isRequired,
    accountNumber: PropTypes.string.isRequired,
    bottomBorder: PropTypes.bool,
};

OverdrawnInfo.defaultProps = {
    bottomBorder: false,
};

export default OverdrawnInfo;
