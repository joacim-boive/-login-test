import React, { Component } from 'react';
import PropTypes from 'prop-types';
// import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { getText as i18n } from "@ecster/ecster-i18n";

import AuthenticatedSubPageTemplate from '../common/templates/AuthenticatedSubPageTemplate';
import WhiteBox from '../common/white-box';
// import * as actions from './redux/actions';
import { getAccountTerms } from './redux/actions';

const InfoLine = ({ label, value, description }) => (
    <div className="info-line">
        <div className="item label">{label}</div>
        <div className="item value">{value}</div>
        <div className="item description">{description}</div>
    </div>
);

InfoLine.propTypes = {
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
                    <InfoLine label={} value="" description="" />
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
