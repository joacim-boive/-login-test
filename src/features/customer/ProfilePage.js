import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { Panel, Button } from '@ecster/ecster-components';
import ResponsivePanel from './../common/responsive-panel/ResponsivePanel';
import AuthenticatedPageTemplate from '../common/templates/AuthenticatedPageTemplate';
import * as actions from './redux/actions';

export class ProfilePage extends Component {
    state = {
        isEditingPhone: false,
        isEditingEmail: false,
    };

    toggleEditPhone = () => {
        this.setState({ isEditingPhone: !this.state.isEditingPhone });
    };

    toggleEditEmail = () => {
        this.setState({ isEditingEmail: !this.state.isEditingEmail });
    };

    render() {
        const { isEditingPhone, isEditingEmail } = this.state;

        return (
            <AuthenticatedPageTemplate header="Profil">
                <div className="customer-profile-page">
                    <Panel padding="50px">
                        <ResponsivePanel desktop={2} tablet={2} mobile={1} horizontalGutter horizontalPadding={20}>
                            <div>
                                <h2>Sara Israelsson</h2>
                                <p>
                                    Fyll i ditt mobilnummer ... lorem ipsum dolor sit amet lorem ipsum dolor sit amet
                                    lorem ipsum dolor sit amet lorem ipsum dolor sit amet lorem ipsum dolor sit amet
                                    lorem ipsum dolor sit amet lorem ipsum dolor sit amet lorem ipsum dolor sit amet{' '}
                                </p>
                            </div>
                            <div>
                                <dl>
                                    <dt>Adress</dt>
                                    <dd>
                                        <div>Stora vägen 1</div>
                                        <div>112 12 Stockholm</div>
                                    </dd>
                                    <dt>Mobil</dt>
                                    {!isEditingEmail && (
                                        <dd>
                                            <div>+46 070 355 50 21</div>
                                            <Button outline small round onClick={this.}>
                                                Ändra
                                            </Button>
                                        </dd>
                                    )}

                                    <dt>E-post</dt>
                                    {!isEditingPhone && <dd>sara.israelsson@mail.com</dd>}
                                </dl>
                            </div>
                        </ResponsivePanel>
                    </Panel>
                </div>
            </AuthenticatedPageTemplate>
        );
    }
}

ProfilePage.propTypes = {
    customer: PropTypes.object.isRequired,
    actions: PropTypes.object.isRequired,
};

/* istanbul ignore next */
function mapStateToProps(state) {
    return {
        customer: state.customer,
    };
}

/* istanbul ignore next */
function mapDispatchToProps(dispatch) {
    return {
        actions: bindActionCreators({ ...actions }, dispatch),
    };
}

export default connect(mapStateToProps, mapDispatchToProps)(ProfilePage);
