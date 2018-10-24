import React from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import { Link, withRouter } from 'react-router-dom';
import { getText as i18n } from '@ecster/ecster-i18n/lib/Translate';
import { InteractiveElement } from '@ecster/ecster-components';
import { BottomNavigation, BottomMenu, MenuItem, MenuItemText, SubMenu, SubMenuItem } from '../menu/index';
import { SvgIconHamburger, SvgIconInvoices, SvgIconLoan, SvgIconOverview } from '../../../common/images/index';
import './MobileNavigation.scss';
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
        // double !! => true or false not array
        const overviewIsActive = !!pathname.match(/.account.overview/);
        const invoiceIsActive = !!pathname.match(/.invoice.overview/);
        const loanIsActive = !!pathname.match(/.loan.overview/);
        // submenu items, indicate active when submenu is visible
        const customerSettingsIsActive = !!pathname.match(/.customer.settings/);
        const customerSupportIsActive = !!pathname.match(/.customer.support/);
        const { showLoanMenu, customerId, hasZeroAccounts } = this.props;

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
                    {showLoanMenu && (
                        <MenuItem linkTo="/loan/overview" active={loanIsActive}>
                            <SvgIconLoan />
                            <MenuItemText>{i18n('navigation.loan')}</MenuItemText>
                        </MenuItem>
                    )}
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
                    {!hasZeroAccounts && (
                        <SubMenuItem linkTo={`/customer/${customerId}/profile`} active={customerSettingsIsActive}>
                            {i18n('navigation.settings')}
                        </SubMenuItem>
                    )}
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
    hasZeroAccounts: PropTypes.bool.isRequired,
};

export default withRouter(MobileNavigation);
