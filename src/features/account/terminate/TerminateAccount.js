import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
// import { Link } from 'react-router-dom';
import { getText as i18n } from '@ecster/ecster-i18n/lib/Translate';
import { Checkbox, Panel, ConfirmButton, ButtonGroup, ResponsivePanel, Link } from '@ecster/ecster-components';

import { setEvent } from '@ecster/ecster-analytics/v2';
import AuthenticatedSubPageTemplate from '../../common/templates/AuthenticatedSubPageTemplate';
import { deleteAccount } from '../redux/actions';

export class TerminateAccount extends Component {
    state = {
        checkCount: 0,
        deleteAccountSuccess: false,
        deleteAccountFailure: false,
        'terminate-account-q1': false,
        'terminate-account-q2': false,
        'terminate-account-q3': false,
        'terminate-account-q4': false,
        'terminate-account-q5': false,
        'terminate-account-q6': false,
    };

    componentWillReceiveProps(nextProps) {
        // delete account succeeded when pending === true => pending === false
        if (this.props.deleteAccountPending && nextProps.deleteAccountPending === false) {
            if (!nextProps.deleteAccountError) {
                // delete succeeded
                this.setState({ deleteAccountSuccess: true });
                setEvent('message', 'show', 'terminate-account-succeeded');
            } else {
                // delete failed
                this.setState({ deleteAccountFailure: true });
                setEvent('message', 'show', 'terminate-account-failed');
            }
        }
    }

    onCheckboxChanged = ({ name, checked }) => {
        this.setState({ [name]: checked, checkCount: this.state.checkCount + (checked ? 1 : -1) });
    };

    onDeleteAccount = () => {
        this.props.deleteAccount();
    };

    renderForm = backUrl => (
        <div>
            <h1>{i18n('account.terminate.header')}</h1>
            <p>{i18n('account.terminate.info-text')}</p>
            <ResponsivePanel desktop={2} tablet={2} mobile={1} className="choices" verticalLines>
                <div className="checkbox-group">
                    <Checkbox
                        name="terminate-account-q1"
                        checked={this.state['terminate-account-q1']}
                        onChange={({ target }) => this.onCheckboxChanged(target)}
                    >
                        {i18n('account.terminate.q1')}
                    </Checkbox>
                    <Checkbox
                        name="terminate-account-q2"
                        checked={this.state['terminate-account-q2']}
                        onChange={({ target }) => this.onCheckboxChanged(target)}
                    >
                        {i18n('account.terminate.q2')}
                    </Checkbox>
                    <Checkbox
                        name="terminate-account-q3"
                        checked={this.state['terminate-account-q3']}
                        onChange={({ target }) => this.onCheckboxChanged(target)}
                    >
                        {i18n('account.terminate.q3')}
                    </Checkbox>
                </div>
                <div className="checkbox-group">
                    <Checkbox
                        name="terminate-account-q4"
                        checked={this.state['terminate-account-q4']}
                        onChange={({ target }) => this.onCheckboxChanged(target)}
                    >
                        {i18n('account.terminate.q4')}
                    </Checkbox>
                    <Checkbox
                        name="terminate-account-q5"
                        checked={this.state['terminate-account-q5']}
                        onChange={({ target }) => this.onCheckboxChanged(target)}
                    >
                        {i18n('account.terminate.q5')}
                    </Checkbox>
                    <Checkbox
                        name="terminate-account-q6"
                        checked={this.state['terminate-account-q6']}
                        onChange={({ target }) => this.onCheckboxChanged(target)}
                    >
                        {i18n('account.terminate.q6')}
                    </Checkbox>
                </div>
            </ResponsivePanel>
            <ButtonGroup align="center">
                <ConfirmButton
                    round
                    confirmHeader={i18n('account.terminate.confirm-header')}
                    confirmText={i18n('account.terminate.confirm-text')}
                    confirmOk={i18n('account.terminate.confirm-ok')}
                    confirmCancel={i18n('account.terminate.confirm-cancel')}
                    onClick={this.onDeleteAccount}
                    disabled={this.state.checkCount === 0}
                    gaPrefix="terminate-account"
                >
                    {i18n('account.terminate.terminate-my-account')}
                </ConfirmButton>
            </ButtonGroup>
            <ButtonGroup align="center">
                <Link to={backUrl} id="terminate-account-cancel">
                    {i18n('general.cancel')}
                </Link>
            </ButtonGroup>
        </div>
    );

    renderSuccessMessage = backUrl => (
        <div>
            <h1>{i18n('account.terminate.success.header')}</h1>
            <p>{i18n('account.terminate.success.message')}</p>
            <ButtonGroup align="center">
                <Link to={backUrl} id="terminate-account-success-back">
                    {i18n('account.terminate.success.back')}
                </Link>
            </ButtonGroup>
        </div>
    );

    /* eslint-disable react/no-danger */
    renderFailureMessage = backUrl => (
        <div>
            <h1>{i18n('account.terminate.failure.header')}</h1>
            <p dangerouslySetInnerHTML={{ __html: i18n('account.terminate.failure.message') }} />
            <ButtonGroup align="center">
                <Link to={backUrl} id="terminate-account-failure-back">
                    {i18n('account.terminate.failure.back')}
                </Link>
            </ButtonGroup>
        </div>
    );

    render() {
        const backUrl = `/account/${this.props.getAccountRef()}/customer/${this.props.getCustomerId()}/terms`;

        const { deleteAccountSuccess, deleteAccountFailure } = this.state;
        return (
            <AuthenticatedSubPageTemplate header={i18n('account.terminate.terminate-account')}>
                <Panel withMixedContent stretchInMobile className="account-terminate-account">
                    <div className="mixed-content">
                        {!deleteAccountSuccess && !deleteAccountFailure && this.renderForm(backUrl)}
                        {deleteAccountSuccess && this.renderSuccessMessage(backUrl)}
                        {deleteAccountFailure && this.renderFailureMessage(backUrl)}
                    </div>
                </Panel>
            </AuthenticatedSubPageTemplate>
        );
    }
}

TerminateAccount.propTypes = {
    deleteAccount: PropTypes.func.isRequired,
    getAccountRef: PropTypes.func.isRequired,
    getCustomerId: PropTypes.func.isRequired,
    deleteAccountPending: PropTypes.bool,
    deleteAccountError: PropTypes.object,
};

TerminateAccount.defaultProps = {
    deleteAccountPending: false,
    deleteAccountError: null,
};

/* istanbul ignore next */
function mapStateToProps({ account }) {
    return {
        deleteAccountPending: account.deleteAccountPending,
        deleteAccountError: account.deleteAccountError,
    };
}

/* istanbul ignore next */
function mapDispatchToProps(dispatch, state) {
    const { customerId, accountRef } = state.match.params;
    return {
        deleteAccount: () => dispatch(deleteAccount(customerId, accountRef)),
        getAccountRef: () => accountRef,
        getCustomerId: () => customerId,
    };
}

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(TerminateAccount);
