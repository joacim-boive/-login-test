import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { getText as i18n } from '@ecster/ecster-i18n/lib/Translate';
import { Panel, Select, Option, ButtonGroup, Button, UnorderedList, Spinner } from '@ecster/ecster-components';
import AuthenticatedSubPageTemplate from '../../common/templates/AuthenticatedSubPageTemplate';
import ResponsivePanel from '../../common/responsive-panel/ResponsivePanel';
import walletIcon from '../../../common/images/icon-wallet.svg';
import { getAccount, updateAccount } from '../redux/actions';
import { formatAmount } from '../../../common/util/format-amount';

// generate select options
// start from current limit, increase in small steps up to a certain amount, then in bigger steps
const getNewLimitOptions = (locale, currentLimit, maxLimit) => {
    // configure increments and limit for big increments
    const config = {
        sv: {
            small: 500000, // 5 000 kr
            big: 1000000, // 10 000 kr
            bigFrom: 2000000, // 20 000 kr
        },
        fi: {
            small: 50000, // 500 EUR
            big: 100000, // 1 000 EUR
            bigFrom: 200000, // 2 000 EUR
        },
    };

    const country = locale.substring(0, 2);
    const options = [];

    const increments = config[country];
    let increment =
        currentLimit < increments.bigFrom || (currentLimit / increments.small) % 2 === 1
            ? increments.small
            : increments.big;

    let nextLimit = currentLimit + increment;

    while (nextLimit <= maxLimit) {
        console.log('pushing option: ', formatAmount(nextLimit), nextLimit);
        options.push(<Option key={nextLimit} label={formatAmount(nextLimit)} value={nextLimit} />);
        if (nextLimit >= increments.bigFrom) {
            increment = increments.big;
        }
        nextLimit += increment;
    }

    return options;
};

export class RaiseCreditPage extends Component {
    state = {
        currentLimit: 0,
        newLimit: 0,
        processing: false,
        processingMessage: i18n('account.raise-credit.processing-message'),
        applyMessage: i18n('account.raise-credit.apply-note'),
        applyClassName: 'none',
    };

    componentWillMount() {
        console.log('component will mount: dispatching getAccount()');
        this.props.getAccount();
    }

    componentWillReceiveProps(nextProps) {
        this.setState({ currentLimit: nextProps.account.limit });
    }

    onButtonClick = () => {
        console.log(`Clickety click... newLimit = [${this.state.newLimit}]`);

        if (this.state.newLimit) {
            this.setState({ processing: true });
            this.props.updateAccount({ limit: this.state.newLimit });
        } else {
            this.setState({
                applyMessage: i18n('account.raise-credit.apply-note-validation'),
                applyClassName: 'e-error',
            });
        }
    };

    onSelectChange = value => {
        console.log('new limit changed = ', value);
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
        const { processing, processingMessage, applyMessage, applyClassName } = this.state;

        return (
            <AuthenticatedSubPageTemplate
                className="account-raise-credit-page"
                header={i18n('account.raise-credit.page-header')}
            >
                <Panel padding="40px 60px">
                    <div className="center mb-8x">
                        <img className="mb-4x" src={walletIcon} alt="wallet icon" />
                        <h2>{i18n('account.raise-credit.header')}</h2>
                        <p>{i18n('account.raise-credit.intro')}</p>
                    </div>
                    <ResponsivePanel desktop={2} tablet={2} mobile={1} horizontalGutter className="pt-4x">
                        <div>
                            <div className="flex-row mb-5x">
                                <span>{i18n('account.raise-credit.current-credit-limit')}</span>
                                <strong>{formatAmount(this.state.currentLimit)}</strong>
                            </div>
                            <div className="flex-row mb-5x">
                                <span>{i18n('account.raise-credit.max-credit-limit')}</span>
                                <strong>{formatAmount(account.maxLimit)}</strong>
                            </div>
                            <div className="flex-row">
                                <span>{i18n('account.raise-credit.new-credit-limit')}</span>
                                <span>
                                    <Select
                                        value={this.state.newLimit}
                                        onChange={e => this.onSelectChange(e.target.value)}
                                        defaultOption={i18n('account.raise-credit.select-amount')}
                                    >
                                        {getNewLimitOptions(locale, account.limit, account.maxLimit)}
                                    </Select>
                                </span>
                            </div>
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
            </AuthenticatedSubPageTemplate>
        );
    }
}

RaiseCreditPage.propTypes = {
    account: PropTypes.object.isRequired,
    locale: PropTypes.string.isRequired,
    getAccount: PropTypes.func.isRequired,
    updateAccount: PropTypes.func.isRequired,
};

/* istanbul ignore next */
function mapStateToProps(state) {
    return {
        account: state.account.account, // account under feature account
        locale: state.home.locale,
    };
}

/* istanbul ignore next */
function mapDispatchToProps(dispatch, state) {
    const { id, ref } = state.match.params;
    return {
        getAccount: () => dispatch(getAccount(id, ref)),
        updateAccount: data => dispatch(updateAccount(data, id, ref)),
    };
}

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(RaiseCreditPage);
