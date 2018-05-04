import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import * as actions from './redux/actions';
import AuthenticatedPageTemplate from '../common/templates/AuthenticatedPageTemplate';

export class OverviewPage extends Component {
    static propTypes = {
        account: PropTypes.object.isRequired,
        actions: PropTypes.object.isRequired,
    };

    render() {
        const styles = {
            padding: '12px',
            background: 'white',
            border: '1px solid #ccc',
            borderRadius: '2px',
            minHeight: '150px',
        };

        return (
            <AuthenticatedPageTemplate header="Översikt">
                <div style={styles} className="account-overview-page">
                    <h3>Account / overview page</h3>
                    <p>
                        Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nullam consectetur dolor nec nibh
                        iaculis porttitor. Vestibulum magna lacus, placerat id erat sed, hendrerit eleifend erat. Proin
                        convallis vel diam consequat condimentum. Aliquam pretium elementum leo, ac accumsan enim
                        bibendum luctus.
                    </p>
                </div>
            </AuthenticatedPageTemplate>
        );
    }
}

/* istanbul ignore next */
function mapStateToProps(state) {
    return {
        account: state.account,
    };
}

/* istanbul ignore next */
function mapDispatchToProps(dispatch) {
    return {
        actions: bindActionCreators({ ...actions }, dispatch),
    };
}

export default connect(mapStateToProps, mapDispatchToProps)(OverviewPage);
