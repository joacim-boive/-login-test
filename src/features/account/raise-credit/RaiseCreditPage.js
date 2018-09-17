import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import { getText as i18n } from '@ecster/ecster-i18n/lib/Translate';
import { Panel, Select, ButtonGroup, Button, UnorderedList, Spinner } from '@ecster/ecster-components';
import AuthenticatedSubPageTemplate from '../../common/templates/AuthenticatedSubPageTemplate';
import ResponsivePanel from '../../common/responsive-panel/ResponsivePanel';
import walletIcon from '../../../common/images/icon-wallet.svg';
import happyFace from '../../../common/images/face-happy.svg';
import disappointedFace from '../../../common/images/face-disappointed.svg';
import pendingIcon from '../../../common/images/icon-table-lamp.svg';
import { getAccount, updateAccount } from '../redux/actions';
import { formatAmount } from '../../../common/util/format-amount';

import getCreditLimitOptions from './getCreditLimitOptions';

export class RaiseCreditPage extends Component {
    state = {
        currentLimit: 0,
        newLimit: 0,
        processing: false,
        processingMessage: i18n('account.raise-credit.processing-message'),
        // message before button can change ...
        applyMessage: i18n('account.raise-credit.apply-note'), // ... content ...
        applyClassName: 'none', // ... and appearance
        showView: 'main', // or "APPROVED", "PENDING", "DENIED"
        caseNumber: undefined,
    };

    componentWillMount() {
        const { getAccount } = this.props;
        getAccount();
    }

    componentWillReceiveProps(nextProps) {
        const { updateAccountPending } = this.props;
        const { applicationResult, limit } = nextProps.account;

        // rest operation is pending, next props contains application result
        if (updateAccountPending && applicationResult) {
            this.setState({
                currentLimit: applicationResult.limit,
                showView: applicationResult.status,
                caseNumber: applicationResult.caseNumber, // only for PENDING
            });
        } else {
            this.setState({ currentLimit: limit });
        }
    }

    onButtonClick = () => {
        const { newLimit } = this.state;
        const { updateAccount } = this.props;

        if (newLimit) {
            this.setState({ processing: true });
            // simulate a few seconds processing
            setTimeout(() => {
                this.setState({ processingMessage: i18n('account.raise-credit.processing-message-uc') });
                setTimeout(() => {
                    updateAccount({ limit: newLimit });
                }, 1000);
            }, 2000);
        } else {
            this.setState({
                applyMessage: i18n('account.raise-credit.apply-note-validation'),
                applyClassName: 'e-error',
            });
        }
    };

    onSelectChange = value => {
        if (value) {
            this.setState({
                newLimit: value,
                applyMessage: i18n('account.raise-credit.apply-note'),
                applyClassName: 'none',
            });
        }
        this.setState({ newLimit: value });
    };

    render() {
        const { account, locale } = this.props;
        const {
            processing,
            processingMessage,
            applyMessage,
            applyClassName,
            showView,
            newLimit,
            caseNumber,
            currentLimit,
        } = this.state;

        const BackToOverviewLink = () => (
            <p className="mt-8x">
                <Link to="/account/overview">
                    <i className="icon-chevron-left" /> {i18n('account.raise-credit.back-to-overview')}
                </Link>
            </p>
        );

        return (
            <AuthenticatedSubPageTemplate
                className="account-raise-credit-page"
                header={i18n('account.raise-credit.page-header')}
            >
                {showView === 'main' && (
                    <Panel padding="40px 60px">
                        <div className="center mb-8x">
                            <img className="mb-4x" src={walletIcon} alt="wallet icon" />
                            <h2>{i18n('account.raise-credit.header')}</h2>
                            <p>{i18n('account.raise-credit.intro')}</p>
                        </div>
                        <ResponsivePanel desktop={2} tablet={2} mobile={1} horizontalGutter className="pt-4x">
                            <>
                                <div className="flex-row mb-5x">
                                    <span>{i18n('account.raise-credit.current-credit-limit')}</span>
                                    <strong>{formatAmount(currentLimit)}</strong>
                                </div>
                                <div className="flex-row">
                                    <span>{i18n('account.raise-credit.new-credit-limit')}</span>
                                    <span>
                                        <Select
                                            value={newLimit}
                                            onChange={e => this.onSelectChange(e.target.value)}
                                            defaultOption={i18n('account.raise-credit.select-amount')}
                                        >
                                            {getCreditLimitOptions(locale, account.limit, account.maxLimit)}
                                        </Select>
                                    </span>
                                </div>
                            </>
                            <div>
                                <strong>{i18n('account.raise-credit.terms')}</strong>
                                <p>{i18n('account.raise-credit.terms-description')}</p>
                                <UnorderedList icon="icon-check" iconClass="e-purple">
                                    {i18n('account.raise-credit.terms-items', {
                                        returnObjects: true,
                                    })}
                                </UnorderedList>
                            </div>
                        </ResponsivePanel>
                        <div className="center mt-8x">
                            {!processing && (
                                <div>
                                    <small className={applyClassName}>{applyMessage}</small>
                                    <ButtonGroup align="center">
                                        <Button onClick={this.onButtonClick} round>
                                            {i18n('account.raise-credit.apply')}
                                        </Button>
                                    </ButtonGroup>
                                </div>
                            )}
                            {processing && (
                                <div>
                                    <div className="mb-3x">
                                        <small>{processingMessage}</small>
                                    </div>
                                    <Spinner id="raise-credit-spinner" isCenterX isVisible />
                                </div>
                            )}
                        </div>
                    </Panel>
                )}

                {showView === 'APPROVED' && (
                    <Panel textAlignCenter className="result-panel">
                        <img src={happyFace} aria-hidden="true" alt="happy face icon" />
                        <h2>{i18n('account.raise-credit.approved-header')}</h2>
                        <p>
                            {i18n('account.raise-credit.approved-message', {
                                value: formatAmount(currentLimit),
                            })}
                        </p>
                        <BackToOverviewLink />
                    </Panel>
                )}

                {showView === 'PENDING' && (
                    <Panel textAlignCenter className="result-panel">
                        <img src={pendingIcon} aria-hidden="true" alt="disappointed face icon" />
                        <h2>{i18n('account.raise-credit.pending-header')}</h2>
                        {i18n('account.raise-credit.pending-message', {
                            returnObjects: true,
                            wrapper: { tag: 'p', dangerouslySetInnerHTML: true },
                            caseNumber,
                        })}
                        <BackToOverviewLink />
                    </Panel>
                )}

                {showView === 'DENIED' && (
                    <Panel textAlignCenter className="result-panel">
                        <img src={disappointedFace} aria-hidden="true" alt="sad face icon" />
                        <h2>{i18n('account.raise-credit.denied-header')}</h2>
                        {i18n('account.raise-credit.denied-message', {
                            returnObjects: true,
                            wrapper: { tag: 'p', dangerouslySetInnerHTML: true },
                        })}
                        <BackToOverviewLink />
                    </Panel>
                )}
            </AuthenticatedSubPageTemplate>
        );
    }
}

RaiseCreditPage.propTypes = {
    account: PropTypes.object.isRequired,
    locale: PropTypes.string.isRequired,
    getAccount: PropTypes.func.isRequired,
    updateAccount: PropTypes.func.isRequired,
    updateAccountPending: PropTypes.bool.isRequired,
};

/* istanbul ignore next */
function mapStateToProps(state) {
    return {
        account: state.account.account, // account under feature account
        locale: state.home.locale,
        updateAccountPending: state.account.updateAccountPending,
        updateAccountError: state.account.updateAccountError,
    };
}

/* istanbul ignore next */
function mapDispatchToProps(dispatch, state) {
    const { id, ref } = state.match.params;
    return {
        getAccount: () => dispatch(getAccount(id, ref)),
        updateAccount: data => dispatch(updateAccount(id, ref, data)),
    };
}

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(RaiseCreditPage);
