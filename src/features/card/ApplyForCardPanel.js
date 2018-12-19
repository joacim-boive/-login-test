import React from 'react';
import PropTypes from 'prop-types';

import { getText as i18n } from '@ecster/ecster-i18n/lib/Translate';
import {
    Panel,
    FlexPanel,
    ResponsivePanel,
    UnorderedList,
    ButtonGroup,
    ConfirmButton,
    Mobile,
    TabletOrDesktop,
} from '@ecster/ecster-components';
import { EcsterCard } from '../common/card/EcsterCard';
import { formatAmount } from '../../common/util/format-amount';

export default class ApplyForCardPanel extends React.Component {
    static propTypes = {
        account: PropTypes.shape().isRequired,
        accountTerms: PropTypes.shape().isRequired,
        createAccountCard: PropTypes.func.isRequired,
    };

    onClick = () => {
        const { createAccountCard } = this.props;
        createAccountCard();
    };

    render() {
        const { account, accountTerms } = this.props;

        const cardName = (
            (account.product && account.product.name) ||
            i18n('card.show-card.default-card-name')
        ).toLocaleLowerCase(); // will be css cap'ed

        return (
            <div className="card-apply-for-card-panel">
                <Mobile>
                    <div className="card-ctr">
                        <EcsterCard account={account} />
                    </div>
                </Mobile>
                <Panel withMixedContent sideMarginsInMobile>
                    <div className="two-col-content">
                        <TabletOrDesktop>
                            <EcsterCard account={account} />
                        </TabletOrDesktop>
                        <h1 className="h2">{i18n('card.apply-for-card.header', { cardName })}</h1>
                        <p>{i18n('card.apply-for-card.info')}</p>
                        <ResponsivePanel separator className="info-panel">
                            <div className="column column-1">
                                <p>
                                    <strong>{i18n('card.apply-for-card.sub-header1')}</strong>
                                </p>
                                <p className="flex-row">
                                    <span>{i18n('card.apply-for-card.yearly-fee')}</span>
                                    <strong>{formatAmount(accountTerms.yearlyFee)}</strong>
                                </p>
                                <p className="flex-row">
                                    <span>{i18n('card.apply-for-card.credit-limit')}</span>
                                    <strong>{formatAmount(account.limit)}</strong>
                                </p>
                                <p
                                    dangerouslySetInnerHTML={{
                                        __html: i18n('card.apply-for-card.terms-info', {
                                            termsURL: accountTerms.termsPDFURL,
                                        }),
                                    }}
                                />
                            </div>
                            <div className="column column-2">
                                <p>
                                    <strong>{i18n('card.apply-for-card.sub-header2')}</strong>
                                </p>
                                <UnorderedList icon="icon-check" iconClass="e-purple">
                                    {i18n('card.apply-for-card.info-list', {
                                        returnObjects: true,
                                        wrapper: { tag: 'span', dangerouslySetInnerHTML: true },
                                    })}
                                </UnorderedList>
                            </div>
                        </ResponsivePanel>
                    </div>
                    <ButtonGroup alignCenter spaceBelow={false}>
                        <ConfirmButton
                            id="order-card"
                            confirmHeader={i18n('card.apply-for-card.confirm-dialog.header')}
                            confirmText={i18n('card.apply-for-card.confirm-dialog.text')}
                            confirmOk={i18n('card.apply-for-card.confirm-dialog.ok-button')}
                            confirmCancel={i18n('general.cancel')}
                            round
                            onClick={this.onClick}
                            gaPrefix="order-card"
                        >
                            {i18n('card.apply-for-card.button')}
                        </ConfirmButton>
                    </ButtonGroup>
                </Panel>
            </div>
        );
    }
}
