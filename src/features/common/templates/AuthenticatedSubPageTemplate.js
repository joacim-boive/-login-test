import React, { Component } from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import { Mobile, TabletOrDesktop } from '@ecster/ecster-components';
import MobileNavigation from '../navigation/MobileNavigation';
import TabletDesktopNavigation from '../navigation/TabletDesktopNavigation';
import MessagePanel from '../MessagePanel';
import AlphaLabel from '../alpha';
import Footer from '../footer';

class AuthenticatedSubPageTemplate extends Component {
    render() {
        const { className, linkTo, header, customerId, children, showLoanMenu } = this.props;

        const classes = classNames({
            'common-authenticated-sub-page': true,
            [className]: className,
        });

        const renderHeader = header && (
            <div className="hero-header">
                <Link to={linkTo} href={linkTo}>
                    <i className="icon-arrow-left" />
                </Link>
                <h1>{header}</h1>
            </div>
        );

        return (
            <>
                <div className={classes}>
                    <AlphaLabel />
                    <TabletOrDesktop>
                        <TabletDesktopNavigation customerId={customerId} showLoanMenu={showLoanMenu} />
                    </TabletOrDesktop>
                    <div className="page-container">
                        {renderHeader}
                        <div className="page-content">{children}</div>
                    </div>
                    <Mobile>
                        <MobileNavigation customerId={customerId} showLoanMenu={showLoanMenu} />
                    </Mobile>
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
};

AuthenticatedSubPageTemplate.defaultProps = {
    className: '',
    header: undefined,
    linkTo: '',
    showLoanMenu: false,
};

/* istanbul ignore next */
function mapStateToProps({ authentication, customer }) {
    return {
        customerId: authentication.person && authentication.person.id,
        showLoanMenu: customer.SHOW_PRIVATLAN_MENU,
    };
}

export default connect(mapStateToProps)(AuthenticatedSubPageTemplate);
