import React from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import { connect } from 'react-redux';
import { Mobile, TabletOrDesktop } from '@ecster/ecster-components';
import MessagePanel from '../MessagePanel';
import MobileNavigation from '../navigation/MobileNavigation';
import TabletDesktopNavigation from '../navigation/TabletDesktopNavigation';
import Footer from '../footer';
import AlphaLabel from '../alpha';
import { getCustomerProperties } from '../../customer/redux/actions';

class AuthenticatedPageTemplate extends React.Component {
    componentDidUpdate() {
        const { showLoanMenu, getCustomerPropertiesPending, customerId, getCustomerProperties } = this.props;
        if (showLoanMenu === undefined && !getCustomerPropertiesPending) {
            getCustomerProperties(customerId, 'SHOW_PRIVATLAN_MENU');
        }
    }

    render() {
        const { className, customerId, showLoanMenu, header, children, hasZeroAccounts } = this.props;

        const classes = classNames({
            'common-authenticated-page': true,
            [className]: className,
        });

        const thisHeader = header && (
            <div className="page-header">
                <h1>{header}</h1>
            </div>
        );

        return (
            <>
                <div className={classes}>
                    <AlphaLabel />
                    <TabletOrDesktop>
                        <TabletDesktopNavigation
                            customerId={customerId}
                            showLoanMenu={showLoanMenu}
                            hasZeroAccounts={hasZeroAccounts}
                        />
                    </TabletOrDesktop>
                    <div className="page-container">
                        {thisHeader}
                        <div className="page-content">{children}</div>
                    </div>
                    <Mobile>
                        <MobileNavigation
                            customerId={customerId}
                            showLoanMenu={showLoanMenu}
                            hasZeroAccounts={hasZeroAccounts}
                        />
                    </Mobile>
                </div>
                <MessagePanel />
                <Footer />
            </>
        );
    }
}

AuthenticatedPageTemplate.propTypes = {
    customerId: PropTypes.number.isRequired,
    className: PropTypes.string,
    header: PropTypes.string,
    children: PropTypes.node.isRequired,
    showLoanMenu: PropTypes.bool,
    hasZeroAccounts: PropTypes.bool,
    getCustomerPropertiesPending: PropTypes.bool.isRequired,
    getCustomerProperties: PropTypes.func.isRequired,
};

AuthenticatedPageTemplate.defaultProps = {
    className: '',
    header: undefined,
    showLoanMenu: undefined, // undefined important, used in componentDidUpdate
    hasZeroAccounts: undefined,
};

/* istanbul ignore next */
function mapStateToProps({ account, authentication, customer }) {
    return {
        customerId: authentication.person && authentication.person.id || 0,
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
)(AuthenticatedPageTemplate);
