import React from 'react';
import PropTypes from 'prop-types';

import { getText as i18n } from '@ecster/ecster-i18n/lib/Translate';
import { formatAccount } from '../../../common/util/format-account';
import { formatAmount } from '../../../common/util/format-amount';
import infoIcon from '../../../common/images/icon-info-circle.svg';

import './OverdrawnInfo.scss';

const OverdrawnInfo = ({ used, limit, accountNumber }) => (
    <div className="account-overdrawn-info">
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

OverdrawnInfo.propTypes = {
    used: PropTypes.number.isRequired,
    limit: PropTypes.number.isRequired,
    accountNumber: PropTypes.string.isRequired,
};

export default OverdrawnInfo;
