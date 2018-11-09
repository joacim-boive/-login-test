import React from 'react';
import PropTypes from 'prop-types';
import { Link as RRLink, withRouter } from 'react-router-dom';
import classNames from 'classnames';
import { getText as i18n } from '@ecster/ecster-i18n/lib/Translate';
import { Logo, Link } from '@ecster/ecster-components';
import { TopNavigation, TopMenu, SubMenu, SubMenuItem } from '../menu/index';
import scrollTopOnLocationChange from './scrollTopOnLocationChange';

// TODO: remove tmp IE fix when fonts load in HITS
import { SvgIconHamburger } from '../../../common/images/index';

import './TabletDesktopNavigation.scss';

class TabletDesktopNavigation extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            showSubMenu: false,
        };
        scrollTopOnLocationChange(props.history);
    }

    toggleSubMenu = e => {
        e.stopPropagation();
        e.preventDefault();
        this.setState({ showSubMenu: !this.state.showSubMenu });
    };

    closeSubMenu = () => {
        this.setState({ showSubMenu: false });
    };

    render() {
        const { showSubMenu } = this.state;
        const { pathname } = this.props.history.location;
        const overviewIsActive = pathname.match(/.account.overview/);
        const invoiceIsActive = pathname.match(/.invoice.overview/);
        const loanIsActive = pathname.match(/.loan.overview/);
        const customerSettingsIsActive = !!pathname.match(/.customer\/[0-9]+\/profile/);
        const customerSupportIsActive = !!pathname.match(/.customer.support/);
        const { showLoanMenu, customerId, hasZeroAccounts } = this.props;

        return (
            <TopNavigation>
                <TopMenu>
                    <div className="top-menu-container">
                        <Link href="#/account/overview" id="top-nav-logo">
                            <Logo withName fill="#fff" width="120px" height="32px" />
                        </Link>
                        <div className="top-menu-links">
                            <Link
                                className={classNames({
                                    'no-underline': true,
                                    'menu-item--is-active': overviewIsActive,
                                })}
                                to="/account/overview"
                                id="top-nav-account-overview"
                                underline={false}
                            >
                                {i18n('navigation.account-overview')}
                            </Link>

                            <Link
                                className={classNames({
                                    'no-underline': true,
                                    'menu-item--is-active': invoiceIsActive,
                                })}
                                to="/invoice/overview"
                                id="top-nav-invoice-overview"
                                underline={false}
                            >
                                {i18n('navigation.invoices')}
                            </Link>

                            {showLoanMenu && (
                                <Link
                                    className={classNames({
                                        'no-underline': true,
                                        'menu-item--is-active': loanIsActive,
                                    })}
                                    to="/loan/overview"
                                    id="top-nav-loan-overview"
                                    underline={false}
                                >
                                    {i18n('navigation.loan')}
                                </Link>
                            )}

                            <div
                                className={classNames({
                                    'icon-link': true,
                                    'menu-item--is-active': showSubMenu,
                                })}
                                onClick={this.toggleSubMenu}
                                role="link"
                            >
                                <i className="icon-menu" />
                                <SvgIconHamburger />
                            </div>
                        </div>
                    </div>
                </TopMenu>
                <div className="submenu-container">
                    <SubMenu top show={showSubMenu} requestClose={this.closeSubMenu}>
                        {!hasZeroAccounts && (
                            <SubMenuItem
                                id="top-nav-customer-profile"
                                linkTo={`/customer/${customerId}/profile`}
                                active={customerSettingsIsActive}
                            >
                                {i18n('navigation.settings')}
                            </SubMenuItem>
                        )}
                        <SubMenuItem
                            id="top-nav-customer-support"
                            linkTo="/customer/support"
                            active={customerSupportIsActive}
                        >
                            {i18n('navigation.customer-support')}
                        </SubMenuItem>
                        <SubMenuItem id="top-nav-logout" linkTo="/authentication/logout" iconClass="icon-lock">
                            {i18n('navigation.logout')}
                        </SubMenuItem>
                    </SubMenu>
                </div>
            </TopNavigation>
        );
    }
}

TabletDesktopNavigation.propTypes = {
    customerId: PropTypes.number.isRequired,
    history: PropTypes.shape().isRequired,
    showLoanMenu: PropTypes.bool,
    hasZeroAccounts: PropTypes.bool.isRequired,
};

TabletDesktopNavigation.defaultProps = {
    showLoanMenu: false,
};
export default withRouter(TabletDesktopNavigation);
