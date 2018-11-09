import React from 'react';
import PropTypes from 'prop-types';

import { getText as i18n } from '@ecster/ecster-i18n/lib/Translate';
import { Panel, FlexPanel, UnorderedList, Form, Checkbox, ButtonGroup, Button } from '@ecster/ecster-components';
import { EcsterCard } from '../common/card/EcsterCard';
import { formatAmount } from '../../common/util/format-amount';

export default class ApplyForCardPanel extends React.Component {
    static propTypes = {
        account: PropTypes.shape().isRequired,
        accountTerms: PropTypes.shape().isRequired,
        createAccountCard: PropTypes.func.isRequired,
    };

    static defaultProps = {};

    state = {
        checkboxChecked: false,
    };

    formRef = React.createRef();

    checkboxRef = React.createRef();

    onClick = () => {
        if (this.formRef.current.validate()) {
            const { createAccountCard } = this.props;
            createAccountCard();
        }
    };

    onCheckboxChange = ({ target }) => {
        this.setState({ checkboxChecked: target.checked });
    };

    render() {
        const { account, accountTerms } = this.props;
        const { checkboxChecked } = this.state;

        const cardName = (
            (account.product && account.product.name) ||
            i18n('card.show-card.default-card-name')
        ).toLocaleLowerCase(); // will be css cap'ed

        return (
            <div className="card-apply-for-card-panel">
                <Panel withMixedContent sideMarginsInMobile>
                    <div className="two-col-content">
                        <EcsterCard account={account} />
                        <h1 className="h2">{i18n('card.apply-for-card.header', { cardName })}</h1>
                        <Form ref={this.formRef} validateRefs={[this.checkboxRef]}>
                            <FlexPanel>
                                <div className="column-1">
                                    <p>{i18n('card.apply-for-card.info', { cardName: 'Ecster' })}</p>
                                    <p className="flex-row">
                                        <span>{i18n('card.apply-for-card.yearly-fee')}</span>
                                        <strong>{formatAmount(accountTerms.yearlyFee)}</strong>
                                    </p>
                                    <p className="flex-row">
                                        <span>{i18n('card.apply-for-card.credit-limit')}</span>
                                        <strong>{formatAmount(account.limit)}</strong>
                                    </p>
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
                        </Form>
                    </div>
                    <div className="flex-row">
                        <Checkbox
                            ref={this.checkboxRef}
                            required
                            checked={checkboxChecked}
                            onChange={this.onCheckboxChange}
                            validationMessage={i18n('card.apply-for-card.validation-message')}
                            className="terms-cb"
                        >
                            <span dangerouslySetInnerHTML={{ __html: i18n('card.apply-for-card.card-terms') }} />
                        </Checkbox>
                    </div>
                    <ButtonGroup alignColumn spaceBelow={false}>
                        <Button round onClick={this.onClick}>
                            {i18n('card.apply-for-card.button')}
                        </Button>
                    </ButtonGroup>
                </Panel>
            </div>
        );
    }
}
