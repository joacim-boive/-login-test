/* eslint-disable react/no-danger */
import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { getText as i18n } from '@ecster/ecster-i18n/lib/Translate';
import { Panel, Spinner, FlexPanel } from '@ecster/ecster-components';
import phoneValidator from '@ecster/ecster-components/Input/validators/mobilePhoneNumberSE';

// TODO: Make an ecster-component of this one or Tooltip in Dashboard-X, use component hera and in DBX
import Tooltip from 'react-tooltip'; // https://github.com/wwayne/react-tooltip
import AuthenticatedPageTemplate from '../common/templates/AuthenticatedPageTemplate';
import { getCustomer, updateCustomerContactInfo } from './redux/actions';
import capWords from '../../common/cap-words';
import { EditableInput } from '../common/editable-input/EditableInput';
import { EditableInputPhone } from '../common/editable-input/EditableInputPhone';
import profileIcon from '../../common/images/icon-profile.svg';

class ProfilePage extends Component {
    componentWillMount() {
        this.props.getCustomer(this.props.hasAccounts);
    }

    renderPanel(person, customer) {
        const { updateCustomerContactInfo, hasAccounts } = this.props;

        return (
            <FlexPanel>
                <div key={1} className="summary-panel">
                    <img src={profileIcon} aria-hidden="true" alt="" />
                    <div>
                        <h2>
                            {person.firstName && person.lastName
                                ? person.firstName + ' ' + person.lastName
                                : person.name}
                        </h2>
                        <p>{i18n('customer.profile.info-text')}</p>
                    </div>
                </div>
                <div key={2} className="profile-panel">
                    <section className="sub-panel">
                        <label>
                            {i18n('general.address.address')}{' '}
                            <i data-tip data-for="address-tooltip" className="icon-info e-green" />
                        </label>
                        <Tooltip
                            className="ecster-tooltip"
                            id="address-tooltip"
                            type="light"
                            place="bottom"
                            effect="solid"
                            border
                        >
                            {i18n('general.address.info')}
                        </Tooltip>
                        <div className="strong">
                            <div>{capWords(customer.address)}</div>
                            <div>
                                {customer.zip} {capWords(customer.city)}
                            </div>
                        </div>
                    </section>

                    <section className="sub-panel">
                        <EditableInputPhone
                            type="tel"
                            value={customer.contactInformation.phoneNumber}
                            label={i18n('general.address.mobile')}
                            onSave={value => updateCustomerContactInfo(hasAccounts, { phoneNumber: value })}
                            validationMessage={i18n('general.validation.phone')}
                            validator={phoneValidator}
                            gaPrefix="profile"
                        />
                    </section>

                    <section className="sub-panel">
                        <EditableInput
                            type="email"
                            value={customer.contactInformation.email}
                            label={i18n('general.address.email')}
                            onSave={val => updateCustomerContactInfo(hasAccounts, { email: val })}
                            validationMessage={i18n('general.validation.email')}
                            required
                            gaPrefix="profile"
                        />
                    </section>
                </div>
            </FlexPanel>
        );
    }

    render() {
        const { person, customer } = this.props;
        const dataReceived = customer && customer.name && customer.contactInformation;
        return (
            <AuthenticatedPageTemplate header="Profil">
                <div className="customer-profile-page">
                    <Panel withNoPadding className="customer-profile-panel">
                        {dataReceived ? (
                            this.renderPanel(person, customer)
                        ) : (
                            <Spinner id="profile-spinner" isVisible isCenterX />
                        )}
                    </Panel>
                </div>
            </AuthenticatedPageTemplate>
        );
    }
}

ProfilePage.propTypes = {
    person: PropTypes.shape().isRequired,
    customer: PropTypes.shape().isRequired,
    getCustomer: PropTypes.func.isRequired,
    updateCustomerContactInfo: PropTypes.func.isRequired,
    hasAccounts: PropTypes.bool.isRequired,
};

/* istanbul ignore next */
function mapStateToProps(state) {
    return {
        person: state.authentication.person,
        customer: state.customer.customer,
        hasAccounts: !state.account.hasZeroAccounts,
    };
}

/* istanbul ignore next */
function mapDispatchToProps(dispatch, route) {
    const { customerId } = route.match.params;

    return {
        getCustomer: customerHasAccounts => dispatch(getCustomer(customerId, customerHasAccounts)),
        updateCustomerContactInfo: (customerHasAccounts, data) =>
            dispatch(updateCustomerContactInfo(customerId, customerHasAccounts, data)),
    };
}

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(ProfilePage);
