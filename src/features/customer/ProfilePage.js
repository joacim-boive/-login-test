import React, { Component } from 'react';
import PropTypes from 'prop-types';
// import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { getText as i18n } from '@ecster/ecster-i18n/lib/Translate';
import { Panel, Spinner } from '@ecster/ecster-components';
import ResponsivePanel from './../common/responsive-panel/ResponsivePanel';
import AuthenticatedPageTemplate from '../common/templates/AuthenticatedPageTemplate';
import { getCustomer, updateCustomerContactInfo } from '../customer/redux/actions';
import capWords from '../../common/cap-words';
import { EditableInput } from '../common/editable-input/EditableInput';
import { EditableInputPhone } from '../common/editable-input/EditableInputPhone';

class ProfilePage extends Component {
    componentWillMount() {
        this.props.getCustomer();
    }

    renderPanel(person) {
        return (
            <ResponsivePanel desktop={2} tablet={2} mobile={1} horizontalGutter horizontalPadding={20}>
                <div key={1} className="summary-panel">
                    <h2>{person.name}</h2>
                    <p>{i18n('customer.profile.info-text')}</p>
                </div>
                <div key={2} className="profile-panel">
                    <section>
                        <label>{i18n('general.address.address')}</label>
                        <div className="strong">
                            <div>{capWords(person.address)}</div>
                            <div>
                                {person.zip} {capWords(person.city)}
                            </div>
                        </div>
                    </section>

                    <section>
                        <EditableInputPhone
                            value={person.contactInformation.phoneNumber}
                            label={i18n('general.address.mobile')}
                            onSave={val => this.props.updateCustomerContactInfo({ phoneNumber: val })}
                            type="tel"
                        />
                    </section>

                    <section>
                        <EditableInput
                            type="email"
                            value={person.contactInformation.email}
                            label={i18n('general.address.email')}
                            onSave={val => this.props.updateCustomerContactInfo({ email: val })}
                            validationMessage={i18n('general.validation.email')}
                            validateOnKeyUp
                        />
                    </section>
                </div>
            </ResponsivePanel>
        );
    }

    render() {
        const { person } = this.props;
        const dataReceived = person && person.name && person.contactInformation;
        return (
            <AuthenticatedPageTemplate header="Profil">
                <div className="customer-profile-page">
                    <Panel padding="50px">
                        {dataReceived ? this.renderPanel(person) : <Spinner id="profile-spinner" isVisible isCenterX />}
                    </Panel>
                </div>
            </AuthenticatedPageTemplate>
        );
    }
}

ProfilePage.propTypes = {
    person: PropTypes.shape().isRequired,
    getCustomer: PropTypes.func.isRequired,
    updateCustomerContactInfo: PropTypes.func.isRequired,
};

/* istanbul ignore next */
function mapStateToProps({ customer }) {
    return {
        person: customer.customer,
    };
}

/* istanbul ignore next */
function mapDispatchToProps(dispatch, state) {
    const { customerId } = state.match.params;
    return {
        getCustomer: () => dispatch(getCustomer(customerId)),
        updateCustomerContactInfo: data => dispatch(updateCustomerContactInfo(customerId, data)),
    };
}

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(ProfilePage);
