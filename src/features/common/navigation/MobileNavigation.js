import React from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import {Link, withRouter} from 'react-router-dom';
import { getText as i18n } from '@ecster/ecster-i18n/lib/Translate';

import { BottomNavigation, BottomMenu, MenuItem, MenuItemText, SubMenu, SubMenuItem } from '../menu/index';
import { SvgIconHamburger, SvgIconInvoices, SvgIconLoan, SvgIconOverview } from '../../../common/images/index';
import './MobileNavigation.scss';
import { InteractiveElement } from '../interactive-element/InteractiveElement';
import scrollTopOnLocationChange from './scrollTopOnLocationChange';

class MobileNavigation extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            showSubMenu: false,
        };
        scrollTopOnLocationChange(props.history);
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
        const { showSubMenu } = this.state;

        // double !! => true or false not array
        const overviewIsActive = !!this.props.history.location.pathname.match(/.account.overview/);
        const invoiceIsActive = !!this.props.history.location.pathname.match(/.invoice.overview/);
        const loanIsActive = !!this.props.history.location.pathname.match(/.loan.overview/);
        // submenu items, indicate active when submenu is visible
        const customerSettingsIsActive = !!this.props.history.location.pathname.match(/.customer.settings/);
        const customerSupportIsActive = !!this.props.history.location.pathname.match(/.customer.support/);
        const showLoanMenu = this.props.showLoanMenu;

        return (
            <BottomNavigation light showOverlay={showSubMenu}>
                <BottomMenu>
                    <MenuItem linkTo="/account/overview" active={overviewIsActive}>
                        <SvgIconOverview />
                        <MenuItemText>{i18n('navigation.account-overview')}</MenuItemText>
                    </MenuItem>

                    <MenuItem linkTo="/invoice/overview" active={invoiceIsActive}>
                        <SvgIconInvoices />
                        <MenuItemText>{i18n('navigation.invoices')}</MenuItemText>
                    </MenuItem>
                    {showLoanMenu && <MenuItem linkTo="/loan/overview" active={loanIsActive}>
                        <SvgIconLoan />
                        <MenuItemText>{i18n('navigation.loan')}</MenuItemText>
                    </MenuItem>}
                    <InteractiveElement onClick={this.toggleSubMenu}>
                        <div
                            className={classNames({
                                'menu-item': true,
                                active: false,
                            })}
                        >
                            <SvgIconHamburger />
                            <MenuItemText>{i18n('navigation.more')}</MenuItemText>
                        </div>
                    </InteractiveElement>
                </BottomMenu>
                <SubMenu bottom show={showSubMenu} requestClose={this.closeSubMenu}>
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
            </BottomNavigation>
        );
    }
}

MobileNavigation.propTypes = {
    customerId: PropTypes.number.isRequired,
    history: PropTypes.shape().isRequired,
    showLoanMenu: PropTypes.bool.isRequired,
};

export default withRouter(MobileNavigation);
