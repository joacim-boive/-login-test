import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { getText as i18n } from '@ecster/ecster-i18n/lib/Translate';
import UnderConstruction from '../common/alpha/UnderConstruction';
import AuthenticatedSubPageTemplate from '../common/templates/AuthenticatedSubPageTemplate';

import { updateAccountCard } from '../account/redux/updateAccountCard';

import ActivateCardPanel from './ActivateCardPanel';
import ActivateExtraCardSubpanel from './ActivateExtraCardSubpanel';
import ApplyForCardFailurePanel from './ApplyForCardFailurePanel';
import ApplyForCardPanel from './ApplyForCardPanel';
import ApplyForCardSuccessPanel from './ApplyForCardSuccessPanel';
import ApplyForExtraCardPanel from './ApplyForExtraCardPanel';
import ShowCardPanel from './ShowCardPanel';
import ShowExtraCardsPanel from './ShowExtraCardsPanel';
import ShowExtraCardSubpanel from './ShowExtraCardSubpanel';
import BlockCardPanel from './BlockCardPanel';
import { getAccount } from '../account/redux/getAccount';

export class ManageCardPage extends Component {
    static propTypes = {
        account: PropTypes.shape().isRequired,
        getAccount: PropTypes.func.isRequired,
    };

    componentWillMount() {
        const { getAccount } = this.props;
        getAccount();
    }

    render() {
        const { account } = this.props;

        return (
            <AuthenticatedSubPageTemplate
                className="card-manage-card-page"
                header={i18n('card.manage-card.page-header')}
            >
                <ShowCardPanel account={account} />
                <ApplyForCardPanel account={account} />
                <ActivateCardPanel account={account} />
                <ApplyForCardSuccessPanel account={account} />
                <ApplyForCardFailurePanel />
                <BlockCardPanel />
            </AuthenticatedSubPageTemplate>
        );
    }
}

/* istanbul ignore next */
function mapStateToProps({ account }) {
    // const { customerId, accountRef } = route.match.params;
    return {
        account: account.account,
    };
}

/* istanbul ignore next */
function mapDispatchToProps(dispatch, route) {
    const { customerId, accountRef } = route.match.params;
    return {
        getAccount: () => dispatch(getAccount(customerId, accountRef)),
        updateAccountCard: (customerId, accountRef) => dispatch(updateAccountCard(customerId, accountRef)),
    };
}

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(ManageCardPage);
