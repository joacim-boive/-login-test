import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import { getText as i18n } from '@ecster/ecster-i18n/lib/Translate';
import { FlexPanel, Panel, Form, Select, ButtonGroup, Button, UnorderedList, Spinner } from '@ecster/ecster-components';
import AuthenticatedSubPageTemplate from '../../common/templates/AuthenticatedSubPageTemplate';
import AlertPanel from '../../../common/AlertPanel';

import walletIcon from '../../../common/images/icon-wallet.svg';
import happyFace from '../../../common/images/face-happy.svg';
import disappointedFace from '../../../common/images/face-disappointed.svg';
import robotFace from '../../../common/images/face-robot.svg';
import pendingIcon from '../../../common/images/icon-table-lamp.svg';
import { getAccount, getAccountTerms, updateAccount, dismissUpdateAccountError } from '../redux/actions';
import { formatAmount } from '../../../common/util/format-amount';

import getCreditLimitOptions from './getCreditLimitOptions';

export class RaiseCreditPage extends Component {
    state = {
        currentLimit: 0,
        newLimit: 0,
        processing: false,
        processingMessage: i18n('account.raise-credit.processing-message'),
        showView: 'main', // "main" or "APPROVED", "PENDING", "DENIED", "ERROR"
        caseNumber: undefined,
        allowRaise: true,
    };

    componentWillMount() {
        const { getAccountTerms, getAccount, dismissUpdateAccountError } = this.props;
        dismissUpdateAccountError(); // dismiss any previous errors
        getAccount();
        getAccountTerms();
        this.formRef = React.createRef();
        this.selectRef = React.createRef();
    }

    componentWillReceiveProps(nextProps) {
        const { updateAccountPending } = this.props;
        const { applicationResult, limit, maxLimit, allowIncreaseLimit } = nextProps.account;

        if (limit === maxLimit || !allowIncreaseLimit) {
            this.setState({ allowRaise: false });
        }

        // rest operation is pending, next props contains application result
        if (updateAccountPending && applicationResult) {
            this.setState({
                currentLimit: applicationResult.limit,
                showView: applicationResult.status,
                caseNumber: applicationResult.caseNumber, // only for PENDING
            });
        } else if (nextProps.updateAccountError) {
            this.setState({ showView: 'ERROR' });
        } else {
            this.setState({ currentLimit: limit });
        }
    }

    onButtonClick = () => {
        const { newLimit } = this.state;
        const { updateAccount } = this.props;

        if (this.formRef.current.validate()) {
            this.setState({ processing: true });
            // simulate a few seconds processing. TODO: simulation (if needed) after updateAccount returns successfully
            setTimeout(() => {
                updateAccount({ limit: newLimit });
            }, 2500);
        }
    };

    onSelectChange = e => {
        const { value } = e.target;
        this.setState({ newLimit: value });
    };

    render() {
        const { account, terms, locale } = this.props;
        const { processing, processingMessage, showView, newLimit, caseNumber, currentLimit, allowRaise } = this.state;

        const BackToOverviewLink = () => (
            <p className="mt-8x">
                <Link to="/account/overview">
                    <i className="icon-chevron-left" /> {i18n('account.raise-credit.back-to-overview')}
                </Link>
            </p>
        );

        const NoRaiseMsg = () =>
            !allowRaise && (
                <AlertPanel
                    header={i18n('account.raise-credit.not-allowed.alert-header')}
                    body={i18n('account.raise-credit.not-allowed.alert-message')}
                    className="mb-8x"
                />
            );

        return (
            <AuthenticatedSubPageTemplate
                className="account-raise-credit-page"
                header={i18n('account.raise-credit.page-header')}
            >
                {showView === 'main' && (
                    <>
                        <NoRaiseMsg />
                        <Panel withMixedContent stretchInMobile>
                            <div className="mixed-content centered-content mb-8x">
                                <img className="mb-4x" src={walletIcon} alt="wallet icon" />
                                <h2>{i18n('account.raise-credit.header')}</h2>
                                <p>{i18n('account.raise-credit.intro')}</p>
                            </div>

                            <Form ref={this.formRef} className="two-col-content" validateRefs={[this.selectRef]}>
                                <FlexPanel>
                                    <div>
                                        <div className="flex-row mb-5x">
                                            <span>{i18n('account.raise-credit.current-credit-limit')}</span>
                                            <strong>{formatAmount(currentLimit)}</strong>
                                        </div>
                                        <div className="flex-row">
                                            <label htmlFor="creditLimit" className={!allowRaise ? 'no-raise-label' : ''}>
                                                {i18n('account.raise-credit.new-credit-limit')}
                                            </label>
                                            <Select
                                                ref={this.selectRef}
                                                value={newLimit}
                                                name="creditLimit"
                                                id="creditLimit"
                                                onChange={this.onSelectChange}
                                                defaultOption={i18n('account.raise-credit.select-amount')}
                                                required
                                                validationMessage={i18n('account.links.validation-message')}
                                                disabled={!allowRaise}
                                            >
                                                {getCreditLimitOptions(locale, account.limit, account.maxLimit)}
                                            </Select>
                                        </div>
                                        {!allowRaise && (
                                            <p className="no-raise-info">
                                                <i className="icon-alert-circle" />{' '}
                                                {i18n('account.raise-credit.not-allowed.info-message')}
                                            </p>
                                        )}
                                    </div>
                                    <div>
                                        <strong>{i18n('account.raise-credit.terms')}</strong>
                                        <p>{i18n('account.raise-credit.terms-description')}</p>
                                        <UnorderedList icon="icon-check" iconClass="e-purple">
                                            {i18n('account.raise-credit.terms-items', {
                                                returnObjects: true,
                                            })}
                                        </UnorderedList>
                                    </div>
                                </FlexPanel>
                                <div
                                    className="center mt-6x"
                                    dangerouslySetInnerHTML={{
                                        __html: i18n('account.raise-credit.terms-conditions', {
                                            url: terms.termsPDFURL,
                                        }),
                                    }}
                                />
                                {!processing && (
                                    <ButtonGroup align="center" className="mt-8x">
                                        <Button onClick={this.onButtonClick} round disabled={!allowRaise}>
                                            {i18n('account.raise-credit.apply')}
                                        </Button>
                                    </ButtonGroup>
                                )}
                                {processing && (
                                    <>
                                        <div className="mtb-3x centered-content">
                                            <small>{processingMessage}</small>
                                        </div>
                                        <Spinner id="raise-credit-spinner" isCenterX isVisible />
                                    </>
                                )}
                            </Form>
                        </Panel>
                    </>
                )}

                {showView === 'APPROVED' && (
                    <Panel withMixedContent centeredContent className="result-panel">
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
                    <Panel withMixedContent centeredContent className="result-panel">
                        <div className="mixed-content">
                            <img src={pendingIcon} aria-hidden="true" alt="disappointed face icon" />
                            <h2>{i18n('account.raise-credit.pending-header')}</h2>
                            {i18n('account.raise-credit.pending-message', {
                                returnObjects: true,
                                wrapper: { tag: 'p', dangerouslySetInnerHTML: true },
                                caseNumber,
                            })}
                            <BackToOverviewLink />
                        </div>
                    </Panel>
                )}

                {showView === 'DENIED' && (
                    <Panel withMixedContent centeredContent className="result-panel">
                        <div className="mixed-content">
                            <img src={disappointedFace} aria-hidden="true" alt="sad face icon" />
                            <h2>{i18n('account.raise-credit.denied-header')}</h2>
                            {i18n('account.raise-credit.denied-message', {
                                returnObjects: true,
                                wrapper: { tag: 'p', dangerouslySetInnerHTML: true },
                            })}
                            <BackToOverviewLink />
                        </div>
                    </Panel>
                )}

                {showView === 'ERROR' && (
                    <Panel withMixedContent centeredContent className="result-panel">
                        <div className="mixed-content">
                            <img src={robotFace} aria-hidden="true" alt="sad face icon" />
                            <h2>{i18n('account.raise-credit.error.communication.header')}</h2>
                            <p>{i18n('account.raise-credit.error.communication.body')}</p>
                            <BackToOverviewLink />
                        </div>
                    </Panel>
                )}
            </AuthenticatedSubPageTemplate>
        );
    }
}

RaiseCreditPage.propTypes = {
    account: PropTypes.object.isRequired,
    terms: PropTypes.object.isRequired,
    locale: PropTypes.string.isRequired,
    getAccount: PropTypes.func.isRequired,
    getAccountTerms: PropTypes.func.isRequired,
    updateAccount: PropTypes.func.isRequired,
    dismissUpdateAccountError: PropTypes.func.isRequired,
    updateAccountError: PropTypes.any,
    updateAccountPending: PropTypes.bool.isRequired,
};

RaiseCreditPage.defaultProps = {
    updateAccountError: null,
};

/* istanbul ignore next */
function mapStateToProps(state) {
    return {
        account: state.account.account, // account under feature account
        terms: state.account.accountTerms,
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
        getAccountTerms: () => dispatch(getAccountTerms(id, ref)),
        updateAccount: data => dispatch(updateAccount(id, ref, data)),
        dismissUpdateAccountError: () => dispatch(dismissUpdateAccountError()),
    };
}

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(RaiseCreditPage);
