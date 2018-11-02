import React from 'react';
import PropTypes from 'prop-types';

import { getText as i18n } from '@ecster/ecster-i18n/lib/Translate';
import { Panel } from '@ecster/ecster-components';
import { EcsterCard } from '../common/card/EcsterCard';

export default class ApplyForCardSuccessPanel extends React.Component {
    static propTypes = {
        account: PropTypes.shape().isRequired,
    };

    static defaultProps = {};

    render() {
        const { account } = this.props;

        return (
            <Panel withFullWidthContent sideMarginsInMobile className="card-apply-for-card-success-panel">
                <div className="full-width-content flex-row">
                    <div className="col1">
                        <EcsterCard account={account} />
                    </div>
                    <div className="col2 centered-content">
                        <h1 className="h3">{i18n('card.apply-for-card.success.header')}</h1>
                        <p>{i18n('card.apply-for-card.success.info')}</p>
                    </div>
                </div>
            </Panel>
        );
    }
}
