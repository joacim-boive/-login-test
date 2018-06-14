import React, { Component } from 'react';
import PropTypes from 'prop-types';
// import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { getText as i18n } from '@ecster/ecster-i18n/lib/Translate';

import AuthenticatedSubPageTemplate from '../common/templates/AuthenticatedSubPageTemplate';
import WhiteBox from '../common/white-box';
// import * as actions from './redux/actions';
import { getAccountTerms } from './redux/actions';

const InfoItem = ({ label, value, description }) => (
    <div className="info-item">
        <div className="item label">{label}</div>
        <div className="item value">{value}</div>
        <div className="item description">{description}</div>
    </div>
);

InfoItem.propTypes = {
    label: PropTypes.string.isRequired,
    value: PropTypes.string.isRequired,
    description: PropTypes.string.isRequired,
};

export class AccountTerms extends Component {
    componentWillMount() {}

    render() {
        return (
            <AuthenticatedSubPageTemplate header="Kontovillkor">
                <h1>Villkor</h1>
                <WhiteBox className="account-account-terms">
                    <InfoItem
                        value="test"
                        label={i18n('account.terms.account-number')}
                        description={i18n('account.terms.account-number-description')}
                    />
                    <InfoItem
                        value="test"
                        label={i18n('account.terms.account-name')}
                        description={i18n('account.terms.account-name-description')}
                    />
                    <InfoItem
                        value="test"
                        label={i18n('account.terms.total-credit')}
                        description={i18n('account.terms.total-credit-description')}
                    />
                    <InfoItem
                        value="test"
                        label={i18n('account.terms.interest')}
                        description={i18n('account.terms.interest-description')}
                    />
                    <InfoItem
                        value="test"
                        label={i18n('account.terms.admin-fee')}
                        description={i18n('account.terms.admin-fee-description')}
                    />
                    <InfoItem
                        value="test"
                        label={i18n('account.terms.yearly-fee')}
                        description={i18n('account.terms.yearly-fee-description')}
                    />
                    <InfoItem
                        value="test"
                        label={i18n('account.terms.extra-card-fee')}
                        description={i18n('account.terms.extra-card-fee-description')}
                    />
                    <InfoItem
                        value="test"
                        label={i18n('account.terms.atm-withdrawal-fee')}
                        description={i18n('account.terms.atm-withdrawal-fee-description')}
                    />
                    <InfoItem
                        value="test"
                        label={i18n('account.terms.withdrawal-fee')}
                        description={i18n('account.terms.withdrawal-fee-description')}
                    />
                    <InfoItem
                        value="test"
                        label={i18n('account.terms.withdrawal-fee-foreign-currency')}
                        description={i18n('account.terms.withdrawal-fee-foreign-currency-description')}
                    />
                    <InfoItem
                        value="test"
                        label={i18n('account.terms.exchange-fee')}
                        description={i18n('account.terms.exchange-fee-description')}
                    />
                    <InfoItem
                        value="test"
                        label={i18n('account.terms.late-payment-fee')}
                        description={i18n('account.terms.late-payment-fee-description')}
                    />
                    <InfoItem
                        value="test"
                        label={i18n('account.terms.overdraft-fee')}
                        description={i18n('account.terms.overdraft-fee-description')}
                    />
                    <InfoItem
                        value="test"
                        label={i18n('account.terms.account-terms-pdf')}
                        description={i18n('account.terms.account-terms-pdf-description')}
                    />
                    <InfoItem
                        value="test"
                        label={i18n('account.terms.account-agreement-pdf')}
                        description={i18n('account.terms.account-agreement-pdf-description')}
                    />
                </WhiteBox>
            </AuthenticatedSubPageTemplate>
        );
    }
}

AccountTerms.propTypes = {
    account: PropTypes.object.isRequired,
    // actions: PropTypes.object.isRequired,
};

/* istanbul ignore next */
function mapStateToProps(state) {
    return {
        account: state.account.account,
    };
}

/* istanbul ignore next */
function mapDispatchToProps(dispatch) {
    return {
        getAccountTerms: (customerId, refCode) => dispatch(getAccountTerms(customerId, refCode)),
    };
}

export default connect(mapStateToProps, mapDispatchToProps)(AccountTerms);
