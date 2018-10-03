import React from 'react';
import PropTypes from 'prop-types';
import { Link, withRouter } from 'react-router-dom';
import classNames from 'classnames';
import { getText as i18n } from '@ecster/ecster-i18n/lib/Translate';
import { Logo } from '@ecster/ecster-components';
import { TopNavigation, TopMenu, SubMenu, SubMenuItem } from '../menu/index';
import scrollTopOnLocationChange from './scrollTopOnLocationChange';

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
        const customerSettingsIsActive = !!pathname.match(/.customer.settings/);
        const customerSupportIsActive = !!pathname.match(/.customer.support/);
        const { showLoanMenu, customerId } = this.props;

        return (
            <TopNavigation>
                <TopMenu>
                    <div className="top-menu-container">
                        <a href="#/account/overview">
                            <Logo withName fill="#fff" width="120px" height="32px" />
                        </a>
                        <div className="top-menu-links">
                            <Link
                                className={classNames({
                                    'menu-item--is-active': overviewIsActive,
                                })}
                                to="/account/overview"
                            >
                                {i18n('navigation.account-overview')}
                            </Link>

                            <Link
                                className={classNames({
                                    'menu-item--is-active': invoiceIsActive,
                                })}
                                to="/invoice/overview"
                            >
                                {i18n('navigation.invoices')}
                            </Link>

                            {showLoanMenu && (
                                <Link
                                    className={classNames({
                                        'menu-item--is-active': loanIsActive,
                                    })}
                                    to="/loan/overview"
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
                            </div>
                        </div>
                    </div>
                </TopMenu>
                <div className="submenu-container">
                    <SubMenu top show={this.state.showSubMenu} requestClose={this.closeSubMenu}>
                        <SubMenuItem linkTo={`/customer/${customerId}/profile`} active={customerSettingsIsActive}>
                            {i18n('navigation.settings')}
                        </SubMenuItem>
                        <SubMenuItem linkTo="/customer/support" active={customerSupportIsActive}>
                            {i18n('navigation.customer-support')}
                        </SubMenuItem>
                        <SubMenuItem linkTo="/authentication/logout" iconClass="icon-lock">
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
};

TabletDesktopNavigation.defaultProps = {
    showLoanMenu: false,
};
export default withRouter(TabletDesktopNavigation);
