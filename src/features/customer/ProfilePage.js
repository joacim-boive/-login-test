import React, { Component } from 'react';
import PropTypes from 'prop-types';
// import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { Panel, Button, Input } from '@ecster/ecster-components';
import ResponsivePanel from './../common/responsive-panel/ResponsivePanel';
import AuthenticatedPageTemplate from '../common/templates/AuthenticatedPageTemplate';
import { getCustomer, updateCustomerContactInfo } from '../customer/redux/actions';
import capWords from '../../common/cap-words';

// import * as actions from './redux/actions';

class ProfilePage extends Component {
    state = {
        isEditingPhone: false,
        isEditingEmail: false,
    };

    componentWillMount() {
        this.props.getCustomer();
    }

    toggleEditPhone = () => {
        this.setState({ isEditingPhone: !this.state.isEditingPhone });
    };

    toggleEditEmail = () => {
        this.setState({ isEditingEmail: !this.state.isEditingEmail });
    };

    render() {
        const { isEditingPhone, isEditingEmail } = this.state;
        const { person } = this.props;

        return (
            <AuthenticatedPageTemplate header="Profil">
                <div className="customer-profile-page">
                    <Panel padding="50px">
                        <ResponsivePanel desktop={2} tablet={2} mobile={1} horizontalGutter horizontalPadding={20}>
                            <div className="summary-panel">
                                <h2>{person.name}</h2>
                                <p>
                                    Fyll i ditt mobilnummer ... lorem ipsum dolor sit amet lorem ipsum dolor sit amet
                                    lorem ipsum dolor sit amet lorem ipsum dolor sit amet lorem ipsum dolor sit amet
                                    lorem ipsum dolor sit amet lorem ipsum dolor sit amet lorem ipsum dolor sit amet{' '}
                                </p>
                            </div>
                            <div className="profile-panel">
                                <h5>Adress</h5>
                                <section>
                                    <div>{capWords(person.address)}</div>
                                    <div>
                                        {person.zip} {capWords(person.city)}
                                    </div>
                                </section>
                                <h5>Mobil</h5>
                                {!isEditingPhone && (
                                    <section className="flex">
                                        <div>
                                            {person.contactInformation.phoneNumber.countryCallingCode}{' '}
                                            {person.contactInformation.phoneNumber.number}
                                        </div>
                                        <Button outline small round onClick={this.toggleEditPhone}>
                                            Ändra
                                        </Button>
                                    </section>
                                )}
                                {isEditingPhone && (
                                    <section className="flex">
                                        <div>EDIT +46 070 355 50 21</div>
                                        <Button outline small round onClick={this.toggleEditPhone}>
                                            Ändra
                                        </Button>
                                    </section>
                                )}

                                <h5>E-post</h5>
                                {!isEditingEmail && (
                                    <section className="flex">
                                        <div>{person.contactInformation.email}</div>
                                        <Button outline small round onClick={this.toggleEditEmail}>
                                            Ändra
                                        </Button>
                                    </section>
                                )}
                                {isEditingEmail && (
                                    <section className="flex">
                                        <div>EDIT sara.israelsson@mail.com</div>
                                    </section>
                                )}
                            </div>
                        </ResponsivePanel>
                    </Panel>
                </div>
            </AuthenticatedPageTemplate>
        );
    }
}

ProfilePage.propTypes = {
    person: PropTypes.shape.isRequired,
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
