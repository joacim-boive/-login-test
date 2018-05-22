import React from 'react';
import PropTypes from 'prop-types';
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

    showMoreSubMenu = e => {
        e.stopPropagation();
        e.preventDefault();
        this.setState({ showMoreSubMenu: true });
    };

    closeMoreSubMenu = () => {
        this.setState({ showMoreSubMenu: false });
    };

    render() {
        console.log('MobileNavigation history.location.pathname = ', this.props.history.location.pathname);

        const submenuIsActive = this.state.showMoreSubMenu;
        const overviewIsActive = !submenuIsActive && this.props.history.location.pathname.match(/.account.overview/);
        const invoiceIsActive = !submenuIsActive && this.props.history.location.pathname.match(/.invoice.overview/);
        const loanIsActive = !submenuIsActive && this.props.history.location.pathname.match(/.loan.overview/);

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
                    <MenuItem onClick={this.showMoreSubMenu} active={submenuIsActive}>
                        <SvgIconHamburger />
                        <MenuItemText>{i18n('navigation.more')}</MenuItemText>
                    </MenuItem>
                </BottomMenu>
                <SubMenu bottom show={this.state.showMoreSubMenu} requestClose={this.closeMoreSubMenu}>
                    <SubMenuItem linkTo="/customer/settings">{i18n('navigation.settings')}</SubMenuItem>
                    <SubMenuItem linkTo="/customer/support">{i18n('navigation.customer-support')}</SubMenuItem>
                    <SubMenuItem iconClass="icon-lock">{i18n('navigation.logout')}</SubMenuItem>
                </SubMenu>
            </BottomNavigation>
        );
    }
}

MobileNavigation.propTypes = {
    history: PropTypes.shape().isRequired,
};

export default withRouter(MobileNavigation);
