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
            showSubMenu: false,
        };
    }

    toggleSubMenu = e => {
        console.log('MobileNavigation.toggleSubMenu: this.state = ', this.state);
        e.stopPropagation();
        e.preventDefault();
        this.setState({ showSubMenu: !this.state.showSubMenu });
    };

    closeSubMenu = () => {
        console.log('MobileNavigation.closeSubMenu: this.state = ', this.state);
        this.setState({ showSubMenu: false });
    };

    render() {
        console.log('MobileNavigation history.location.pathname = ', this.props.history.location.pathname);

        const { showSubMenu } = this.state;

        // three visible menu items, don't indicate active if submenu is visible, double !! => true or false not array
        const overviewIsActive = !showSubMenu && !!this.props.history.location.pathname.match(/.account.overview/);
        const invoiceIsActive = !showSubMenu && !!this.props.history.location.pathname.match(/.invoice.overview/);
        const loanIsActive = !showSubMenu && !!this.props.history.location.pathname.match(/.loan.overview/);
        // submenu items, indicate active when submenu is visible
        const customerSettingsIsActive = !!this.props.history.location.pathname.match(/.customer.settings/);
        const customerSupportIsActive = !!this.props.history.location.pathname.match(/.customer.support/);

        return (
            <BottomNavigation light showOverlay={this.state.showSubMenu}>
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
                            active: showSubMenu,
                        })}
                    >
                        <SvgIconHamburger />
                        <MenuItemText>{i18n('navigation.more')}</MenuItemText>
                    </div>
                </BottomMenu>
                <SubMenu bottom show={this.state.showSubMenu} requestClose={this.closeSubMenu}>
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
