import React, { Component } from 'react';
import PropTypes from 'prop-types';
// import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { getText as i18n } from '@ecster/ecster-i18n/lib/Translate';
import { Panel, Button, Spinner, ButtonGroup, Input } from '@ecster/ecster-components';
import ResponsivePanel from './../common/responsive-panel/ResponsivePanel';
import AuthenticatedPageTemplate from '../common/templates/AuthenticatedPageTemplate';
import { getCustomer, updateCustomerContactInfo } from '../customer/redux/actions';
import capWords from '../../common/cap-words';

class ProfilePage extends Component {
    constructor(props) {
        super(props);
        this.emailInputRef = React.createRef();
        this.phoneInputRef = React.createRef();

        this.state = {
            isEditingPhone: false,
            isEditingEmail: false,
            editedCountryCode: '',
            editedPhone: '',
            editedEmail: '',
            emailIsInvalid: false,
            countryCodeIsInvalid: false,
            phoneIsInvalid: false,
        };
    }

    componentWillMount() {
        this.props.getCustomer();
    }

    editPhone = () => {
        this.setState({ isEditingPhone: true }, () => {
            this.phoneInputRef.current.getInputEl().focus();
        });
    };

    editEmail = () => {
        this.setState({ editedEmail: this.props.person.contactInformation.email, isEditingEmail: true }, () => {
            this.emailInputRef.current.getInputEl().focus();
        });
    };

    onCountryCodeChange = field => {
        this.setState({ editedCountryCode: field.value });
    };

    onPhoneChange = field => {
        this.setState({ editedPhone: field.value });
    };

    onEmailChange = field => {
        this.setState({ editedEmail: field.value });
    };

    savePhone = () => {
        console.log('savePhone not implemented');
    };

    saveEmail = () => {
        console.log('saveEmail not implemented');
    };

    cancelEditPhone = () => {
        this.setState({ isEditingPhone: false });
    };

    cancelEditEmail = () => {
        this.setState({ isEditingEmail: false });
    };

    renderPanel(person) {
        const { isEditingPhone, isEditingEmail, phoneIsInvalid, countryCodeIsInvalid } = this.state;
        return (
            <ResponsivePanel desktop={2} tablet={2} mobile={1} horizontalGutter horizontalPadding={20}>
                <div key={1} className="summary-panel">
                    <h2>{person.name}</h2>
                    <p>{i18n('customer.profile.info-text')}</p>
                </div>
                <div key={2} className="profile-panel">
                    <h5>{i18n('general.address')}</h5>
                    <section>
                        <div>{capWords(person.address)}</div>
                        <div>
                            {person.zip} {capWords(person.city)}
                        </div>
                    </section>
                    <h5>{i18n('general.cell-phone')}</h5>
                    {!isEditingPhone && (
                        <section className="flex">
                            <div className="strong">
                                {person.contactInformation.phoneNumber.countryCallingCode}{' '}
                                {person.contactInformation.phoneNumber.number}
                            </div>
                            <Button outline small round onClick={this.editPhone}>
                                {i18n('general.buttons.edit')}
                            </Button>
                        </section>
                    )}
                    {isEditingPhone && (
                        <section className="flex phone-form">
                            <div>EDIT +46 070 355 50 21</div>
                            <ButtonGroup align="right">
                                <Button link small onClick={this.cancelEditPhone}>
                                    {i18n('general.buttons.cancel')}
                                </Button>
                                <Button
                                    disabled={phoneIsInvalid || countryCodeIsInvalid}
                                    small
                                    round
                                    onClick={this.savePhone}
                                >
                                    {i18n('general.buttons.save')}
                                </Button>
                            </ButtonGroup>
                        </section>
                    )}

                    <h5>{i18n('general.email')}</h5>
                    {!isEditingEmail && (
                        <section className="flex">
                            <div className="strong">{person.contactInformation.email}</div>
                            <Button outline small round onClick={this.editEmail}>
                                {i18n('general.buttons.edit')}
                            </Button>
                        </section>
                    )}
                    {isEditingEmail && (
                        <section className="flex email-form">
                            <Input
                                type="email"
                                required
                                validationMessage="Men va f.. rätt format!"
                                value={this.state.editedEmail}
                                onChange={e => this.onEmailChange(e.target)}
                                ref={this.emailInputRef}
                                validateOnKeyUp
                                name="email-field"
                                onValidation={(name, isValid) => this.setState({ emailIsInvalid: !isValid })}
                            />
                            <ButtonGroup align="right">
                                <Button link small onClick={this.cancelEditEmail}>
                                    {i18n('general.buttons.cancel')}
                                </Button>
                                <Button disabled={this.state.emailIsInvalid} small round onClick={this.saveEmail}>
                                    {i18n('general.buttons.save')}
                                </Button>
                            </ButtonGroup>
                        </section>
                    )}
                </div>
            </ResponsivePanel>
        );
    }

    render() {
        const { person } = this.props;
        const doRender = person && person.name && person.contactInformation;
        console.log('ProfilePage.ränder');
        return (
            <AuthenticatedPageTemplate header="Profil">
                <div className="customer-profile-page">
                    <Panel padding="50px">
                        {doRender ? this.renderPanel(person) : <Spinner id="profile-spinner" isVisible isCenterX />}
                    </Panel>
                </div>
            </AuthenticatedPageTemplate>
        );
    }
}

ProfilePage.propTypes = {
    person: PropTypes.shape().isRequired,
    getCustomer: PropTypes.func.isRequired,
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
