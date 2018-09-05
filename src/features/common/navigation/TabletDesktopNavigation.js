import React from 'react';
import PropTypes from 'prop-types';
import { Link, withRouter } from 'react-router-dom';
import classNames from 'classnames';
import { getText as i18n } from '@ecster/ecster-i18n/lib/Translate';
import { Logo } from '@ecster/ecster-components';
import { TopNavigation, TopMenu, SubMenu, SubMenuItem } from '../menu/index';
import scrollOnLocationChange from './scrollOnLocationChange';

import './TabletDesktopNavigation.scss';

class TabletDesktopNavigation extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            showSubMenu: false,
        };
        scrollOnLocationChange(props.history);
    }

    toggleSubMenu = e => {
        console.log('toggleSubMenu... ', this.state, e);
        e.stopPropagation();
        e.preventDefault();
        this.setState({ showSubMenu: !this.state.showSubMenu });
    };

    closeSubMenu = () => {
        this.setState({ showSubMenu: false });
    };

    render() {
        const { showSubMenu } = this.state;
        const overviewIsActive = this.props.history.location.pathname.match(/.account.overview/);
        const invoiceIsActive = this.props.history.location.pathname.match(/.invoice.overview/);
        const loanIsActive = this.props.history.location.pathname.match(/.loan.overview/);
        const customerSettingsIsActive = !!this.props.history.location.pathname.match(/.customer.settings/);
        const customerSupportIsActive = !!this.props.history.location.pathname.match(/.customer.support/);

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

                            <Link
                                className={classNames({
                                    'menu-item--is-active': loanIsActive,
                                })}
                                to="/loan/overview"
                            >
                                {i18n('navigation.loan')}
                            </Link>

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
                        <SubMenuItem
                            linkTo={`/customer/${this.props.customerId}/profile`}
                            active={customerSettingsIsActive}
                        >
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
};

export default withRouter(TabletDesktopNavigation);
