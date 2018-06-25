import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { getText as i18n } from '@ecster/ecster-i18n/lib/Translate';
import { Checkbox, Panel, Button, ConfirmButton, ButtonGroup } from '@ecster/ecster-components';

import ResponsivePanel from '../../features/common/responsive-panel/ResponsivePanel';
import AuthenticatedSubPageTemplate from '../common/templates/AuthenticatedSubPageTemplate';
import { deleteAccount } from './redux/actions';

export class TerminateAccount extends Component {
    constructor(props) {
        super(props);
        /* eslint-disable react/no-unused-state */
        this.state = {
            'terminate-account-q1': false,
            'terminate-account-q2': false,
            'terminate-account-q3': false,
            'terminate-account-q4': false,
            'terminate-account-q5': false,
            'terminate-account-q6': false,
        };
    }

    onCheckboxChanged = target => {
        console.log(`checkbox ${target.name}, checked = ${target.checked}`);
        this.setState({ [target.name]: target.checked });
    };

    onTerminateAccount = () => {
        console.log('Terminate account not implemented...');
    };

    render() {
        return (
            <AuthenticatedSubPageTemplate header={i18n('account.terminate.terminate-account')}>
                <Panel className="account-terminate-account">
                    <h1>{i18n('account.terminate.header')}</h1>
                    <p>{i18n('account.terminate.info-text')}</p>
                    <ResponsivePanel desktop={2} tablet={2} mobile={1} className="choices">
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
                            onClick={this.onTerminateAccount}
                            disabled={this.state.checkCount === 0}
                        >
                            {i18n('account.terminate.terminate-my-account')}
                        </ConfirmButton>
                    </ButtonGroup>
                    <ButtonGroup align="center">
                        <Button link>{i18n('general.cancel')}</Button>
                    </ButtonGroup>
                </Panel>
            </AuthenticatedSubPageTemplate>
        );
    }
}

TerminateAccount.propTypes = {
    deleteAccount: PropTypes.func.isRequired,
};

/* istanbul ignore next */
function mapStateToProps(state) {
    return {
        account: state.account,
    };
}

/* istanbul ignore next */
function mapDispatchToProps(dispatch, state) {
    const { id, ref } = state.match.params;
    return {
        deleteAccount: () => dispatch(deleteAccount(id, ref)),
    };
}

export default connect(mapStateToProps, mapDispatchToProps)(TerminateAccount);
