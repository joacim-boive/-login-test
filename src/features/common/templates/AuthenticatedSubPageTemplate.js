import React, { Component } from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import { connect } from 'react-redux';
import { Link, Mobile, TabletOrDesktop } from '@ecster/ecster-components';
import MobileNavigation from '../navigation/MobileNavigation';
import TabletDesktopNavigation from '../navigation/TabletDesktopNavigation';
import MessagePanel from '../MessagePanel';
import AlphaLabel from '../alpha';
import Footer from '../footer';
import { getCustomerProperties } from '../../customer/redux/actions';

class AuthenticatedSubPageTemplate extends Component {
    componentDidUpdate() {
        const { showLoanMenu, getCustomerPropertiesPending, customerId, getCustomerProperties } = this.props;
        if (showLoanMenu === undefined && !getCustomerPropertiesPending) {
            getCustomerProperties(customerId, 'SHOW_PRIVATLAN_MENU');
        }
    }

    render() {
        const { className, linkTo, header, customerId, children, showLoanMenu, hasZeroAccounts } = this.props;

        const classes = classNames({
            'common-authenticated-sub-page': true,
            [className]: className,
        });

        const renderHeader = header && (
            <div className="page-header">
                <div className="page-header-content">
                    <Link to={linkTo} underline={false} gaLabel="back-link">
                        <i className="icon-arrow-left" />
                    </Link>
                    <h1>{header}</h1>
                </div>
            </div>
        );

        return (
            <>
                <div className={classes}>
                    <TabletOrDesktop>
                        <TabletDesktopNavigation
                            customerId={customerId}
                            showLoanMenu={showLoanMenu}
                            hasZeroAccounts={hasZeroAccounts}
                        />
                    </TabletOrDesktop>
                    <div className="page-container">
                        {renderHeader}
                        <div className="page-content">{children}</div>
                    </div>
                    <Mobile>
                        <MobileNavigation
                            customerId={customerId}
                            showLoanMenu={showLoanMenu}
                            hasZeroAccounts={hasZeroAccounts}
                        />
                    </Mobile>
                    <AlphaLabel />
                </div>
                <MessagePanel />
                <Footer />
            </>
        );
    }
}

AuthenticatedSubPageTemplate.propTypes = {
    customerId: PropTypes.number.isRequired,
    className: PropTypes.string,
    header: PropTypes.string,
    linkTo: PropTypes.string,
    children: PropTypes.node.isRequired,
    showLoanMenu: PropTypes.bool,
    hasZeroAccounts: PropTypes.bool.isRequired,
    getCustomerPropertiesPending: PropTypes.bool.isRequired,
    getCustomerProperties: PropTypes.func.isRequired,
};

AuthenticatedSubPageTemplate.defaultProps = {
    className: '',
    header: undefined,
    linkTo: '/account/overview',
    showLoanMenu: undefined, // undefined important, used in componentDidUpdate
};

/* istanbul ignore next */
function mapStateToProps({ account, authentication, customer }) {
    return {
        customerId: authentication.person && authentication.person.id,
        showLoanMenu: customer.SHOW_PRIVATLAN_MENU,
        hasZeroAccounts: account.hasZeroAccounts,
        getCustomerPropertiesPending: customer.getCustomerPropertiesPending,
    };
}

function mapDispatchToProps(dispatch) {
    return {
        getCustomerProperties: (customerId, propertyName) => {
            dispatch(getCustomerProperties(customerId, propertyName));
        },
    };
}

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(AuthenticatedSubPageTemplate);
