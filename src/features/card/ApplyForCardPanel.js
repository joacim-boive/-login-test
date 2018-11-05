import React from 'react';
import PropTypes from 'prop-types';

import { getText as i18n } from '@ecster/ecster-i18n/lib/Translate';
import { Panel, FlexPanel, UnorderedList, ButtonGroup, ConfirmButton } from '@ecster/ecster-components';
import { EcsterCard } from '../common/card/EcsterCard';

export default class ApplyForCardPanel extends React.Component {
    static propTypes = {
        account: PropTypes.shape().isRequired,
    };

    static defaultProps = {};

    onClick = () => {
        console.log('Applying for card... not yet implemented');
    };

    render() {
        const { account } = this.props;

        const cardName = (
            (account.product && account.product.cardName) ||
            i18n('card.show-card.default-card-name')
        ).toLocaleLowerCase(); // will be css cap'ed

        return (
            <div className="card-apply-for-card-panel">
                <Panel withMixedContent sideMarginsInMobile>
                    <div className="two-col-content">
                        <EcsterCard account={account} />
                        <h1 className="h2">{i18n('card.apply-for-card.header', { cardName })}</h1>
                        <FlexPanel>
                            <div className="column-1">
                                <p>{i18n('card.apply-for-card.info', { cardName: 'Ecster' })}</p>
                                <p className="flex-row">
                                    <span>{i18n('card.apply-for-card.yearly-fee')}</span>
                                    <strong>15 000 kr</strong>
                                </p>
                                <p className="flex-row">
                                    <span>{i18n('card.apply-for-card.credit-limit')}</span>
                                    <strong>1 000 000 000 kr</strong>
                                </p>
                                <p dangerouslySetInnerHTML={{ __html: i18n('card.apply-for-card.card-terms') }} />
                            </div>
                            <div className="column-2">
                                <UnorderedList icon="icon-check" iconClass="e-purple">
                                    {i18n('card.apply-for-card.info-list', {
                                        returnObjects: true,
                                        wrapper: { tag: 'span', dangerouslySetInnerHTML: true },
                                    })}
                                </UnorderedList>
                            </div>
                        </FlexPanel>
                        <ButtonGroup alignCenter spaceBelow={false}>
                            <ConfirmButton
                                round
                                confirmHeader={i18n('card.apply-for-card.confirm-dialog.header')}
                                confirmText={i18n('card.apply-for-card.confirm-dialog.text')}
                                consfirmOk={i18n('general.ok')}
                                confirmCancel={i18n('general.cancel')}
                                onClick={this.onClick}
                            >
                                {i18n('card.apply-for-card.button')}
                            </ConfirmButton>
                        </ButtonGroup>
                    </div>
                </Panel>
            </div>
        );
    }
}
