import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { getText as i18n } from '@ecster/ecster-i18n/lib/Translate';
import { connect } from 'react-redux';
import AuthenticatedPageTemplate from '../common/templates/AuthenticatedPageTemplate';
import LoanHeaderPanel from './components/LoanHeaderPanel';
import LoanBodyPanel from './components/LoanBodyPanel';
import { getPromissoryNoteDefaultParameters } from './redux/getPromissoryNoteDefaultParameters';

export class OverviewPage extends Component {
    componentWillMount() {
        this.props.getPromissoryDefaultInfo();
    }

    onSubmit = e => {
        console.log(e);
    }

    render() {
        return (
            <AuthenticatedPageTemplate header={i18n('loan.overview-header')}>
                <div className="loan-overview-page">
                    <LoanHeaderPanel />
                    <LoanBodyPanel onSubmit={this.onSubmit} promissory={this.props.promissoryDefaultInfo} />
                </div>
            </AuthenticatedPageTemplate>
        );
    }
}

OverviewPage.propTypes = {
    user: PropTypes.shape().isRequired,
    getPromissoryDefaultInfo: PropTypes.func.isRequired,
    promissoryDefaultInfo: PropTypes.shape(),
};

OverviewPage.defaultProps = {
    promissoryDefaultInfo: {},
};

/* istanbul ignore next */
function mapStateToProps(state) {
    return {
        user: state.authentication.person,
        promissoryDefaultInfo: state.loan.promissoryNoteDefaultParameters,
    };
}

/* istanbul ignore next */
function mapDispatchToProps(dispatch) {
    return {
        getPromissoryDefaultInfo: () => dispatch(getPromissoryNoteDefaultParameters()),
    };
}

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(OverviewPage);
