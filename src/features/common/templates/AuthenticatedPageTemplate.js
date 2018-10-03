import React from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import { connect } from 'react-redux';
import { Mobile, TabletOrDesktop } from '@ecster/ecster-components';
import MessagePanel from '../MessagePanel';
import MobileNavigation from '../navigation/MobileNavigation';
import TabletDesktopNavigation from '../navigation/TabletDesktopNavigation';
import AlphaLabel from '../alpha';

class AuthenticatedPageTemplate extends React.Component {
    render() {
        const { className, customerId, showLoanMenu, header, children } = this.props;

        const classes = classNames({
            'common-authenticated-page': true,
            [className]: className,
        });

        const thisHeader = header && (
            <div className="hero-header">
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
                        {thisHeader}
                        <div className="page-content">{children}</div>
                    </div>
                    <Mobile>
                        <MobileNavigation customerId={customerId} showLoanMenu={showLoanMenu} />
                    </Mobile>
                </div>
                <MessagePanel />
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
};

AuthenticatedPageTemplate.defaultProps = {
    className: '',
    header: undefined,
    showLoanMenu: false,
};

/* istanbul ignore next */
function mapStateToProps({ authentication, customer }) {
    return {
        customerId: authentication.person && authentication.person.id,
        showLoanMenu: customer.SHOW_PRIVATLAN_MENU,
    };
}

export default connect(mapStateToProps)(AuthenticatedPageTemplate);
