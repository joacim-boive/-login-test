import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { getText as i18n } from '@ecster/ecster-i18n/lib/Translate';
import { connect } from 'react-redux';
import { ResponsivePanel } from '@ecster/ecster-components';
import AuthenticatedPageTemplate from '../common/templates/AuthenticatedPageTemplate';
import LoanHeaderPanel from './components/LoanHeaderPanel';
import LoanBodyPanel from './components/LoanBodyPanel';
import { getPromissoryNoteDefaultParameters } from './redux/getPromissoryNoteDefaultParameters';
import { getPromissoryNotePaymentTerms } from './redux/getPromissoryNotePaymentTerms';
import { SETermsWorks } from './components/SETermsWorks';
import { SETermsApply } from './components/SETermsApply';

export class OverviewPage extends Component {
    componentWillMount() {
        this.props.getPromissoryDefaultInfo();
        this.props.getPaymentTerms(2000000, 10, false);
    }

    onSubmit = () => {
        this.props.history.push('/loan/summary');
    };

    render() {
        const { getPaymentTerms, promissoryDefaultInfo, terms } = this.props;
        return (
            <AuthenticatedPageTemplate header={i18n('loan.overview-header')}>
                <div className="loan-overview-page">
                    <LoanHeaderPanel />
                    <LoanBodyPanel
                        onSubmit={this.onSubmit}
                        getTerms={(amount, year) => getPaymentTerms(amount, year, false)}
                        terms={terms}
                        promissory={promissoryDefaultInfo}
                    />
                    <ResponsivePanel className="terms" desktop={2} tablet={2} mobile={1}>
                        <SETermsWorks promissory={promissoryDefaultInfo} />
                        <SETermsApply className="terms-last" />
                    </ResponsivePanel>
                </div>
            </AuthenticatedPageTemplate>
        );
    }
}

OverviewPage.propTypes = {
    terms: PropTypes.shape(),
    getPromissoryDefaultInfo: PropTypes.func.isRequired,
    getPaymentTerms: PropTypes.func.isRequired,
    promissoryDefaultInfo: PropTypes.shape(),
    history: PropTypes.shape().isRequired,
};

OverviewPage.defaultProps = {
    terms: {},
    promissoryDefaultInfo: {},
};

/* istanbul ignore next */
function mapStateToProps(state) {
    return {
        promissoryDefaultInfo: state.loan.promissoryNoteDefaultParameters,
        terms: state.loan.promissoryNotePaymentTerms,
    };
}

/* istanbul ignore next */
function mapDispatchToProps(dispatch) {
    return {
        getPromissoryDefaultInfo: () => dispatch(getPromissoryNoteDefaultParameters()),
        getPaymentTerms: (amount, year, willCreate) =>
            dispatch(getPromissoryNotePaymentTerms(amount, year, willCreate)),
    };
}

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(OverviewPage);
