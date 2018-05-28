import React from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import { withRouter } from 'react-router-dom';

import { Translate } from '@ecster/ecster-i18n';

import { BottomNavigation, BottomMenu, MenuItem, MenuItemText, SubMenu, SubMenuItem } from '../menu/index';
import { SvgIconHamburger, SvgIconInvoices, SvgIconLoan, SvgIconOverview } from '../../../common/images/index';
import './MobileNavigation.scss';

const i18n = Translate.getText;

class MobileNavigation extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            showMoreSubMenu: false,
        };
    }

    toggleSubMenu = e => {
        console.log('MobileNavigation.toggleSubMenu: this.state = ', this.state);
        e.stopPropagation();
        e.preventDefault();
        this.setState({ showMoreSubMenu: !this.state.showMoreSubMenu });
    };

    closeSubMenu = () => {
        console.log('MobileNavigation.closeSubMenu: this.state = ', this.state);
        this.setState({ showMoreSubMenu: false });
    };

    render() {
        console.log('MobileNavigation history.location.pathname = ', this.props.history.location.pathname);

        const submenuIsActive = this.state.showMoreSubMenu;

        // three visible menu items, don't indicate active if submenu is visible, double !! => true or false not array
        const overviewIsActive = !submenuIsActive && !!this.props.history.location.pathname.match(/.account.overview/);
        const invoiceIsActive = !submenuIsActive && !!this.props.history.location.pathname.match(/.invoice.overview/);
        const loanIsActive = !submenuIsActive && !!this.props.history.location.pathname.match(/.loan.overview/);
        // submenu items, indicate active when submenu is visible
        const customerSettingsIsActive = !!this.props.history.location.pathname.match(/.customer.settings/);
        const customerSupportIsActive = !!this.props.history.location.pathname.match(/.customer.support/);

        console.log('location.pathname: ', this.props.history.location.pathname);
        console.log('subMenuIsActive: ', submenuIsActive);
        console.log('overviewIsActive: ', overviewIsActive);
        console.log('invoiceIsActive: ', invoiceIsActive);
        console.log('loanIsActive: ', loanIsActive);
        console.log('customerSettingsIsActive: ', customerSettingsIsActive);
        console.log('customerSupportIsActive: ', customerSupportIsActive);

        return (
            <BottomNavigation light showOverlay={this.state.showMoreSubMenu}>
                <BottomMenu>
                    <MenuItem linkTo="/account/overview" active={overviewIsActive}>
                        <SvgIconOverview />
                        <MenuItemText>{i18n('navigation.account-overview')}</MenuItemText>
                    </MenuItem>

                    <MenuItem linkTo="/invoice/overview" active={invoiceIsActive}>
                        <SvgIconInvoices />
                        <MenuItemText>{i18n('navigation.invoices')}</MenuItemText>
                    </MenuItem>
                    <MenuItem linkTo="/loan/overview" active={loanIsActive}>
                        <SvgIconLoan />
                        <MenuItemText>{i18n('navigation.loan')}</MenuItemText>
                    </MenuItem>
                    <div
                        onClick={this.toggleSubMenu}
                        className={classNames({
                            'menu-item': true,
                            active: submenuIsActive,
                        })}
                    >
                        <SvgIconHamburger />
                        <MenuItemText>{i18n('navigation.more')}</MenuItemText>
                    </div>
                </BottomMenu>
                <SubMenu bottom show={this.state.showMoreSubMenu} requestClose={this.closeSubMenu}>
                    <SubMenuItem linkTo="/customer/settings" active={customerSettingsIsActive}>
                        {i18n('navigation.settings')}
                    </SubMenuItem>
                    <SubMenuItem linkTo="/customer/support" active={customerSupportIsActive}>
                        {i18n('navigation.customer-support')}
                    </SubMenuItem>
                    <SubMenuItem linkTo="/authentication/logout" iconClass="icon-lock">
                        {i18n('navigation.logout')}
                    </SubMenuItem>
                </SubMenu>
            </BottomNavigation>
        );
    }
}

MobileNavigation.propTypes = {
    history: PropTypes.shape().isRequired,
};

export default withRouter(MobileNavigation);
