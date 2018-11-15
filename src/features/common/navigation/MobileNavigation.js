import React from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import { withRouter } from 'react-router-dom';
import { getText as i18n } from '@ecster/ecster-i18n/lib/Translate';
import { InteractiveElement } from '@ecster/ecster-components';
import { BottomNavigation, BottomMenu, MenuItem, MenuItemText, SubMenu, SubMenuItem } from '../menu/index';
import { SvgIconHamburger, SvgIconInvoices, SvgIconLoan, SvgIconOverview } from '../../../common/images/index';
import './MobileNavigation.scss';
import scrollTopOnLocationChange from './scrollTopOnLocationChange';

class MobileNavigation extends React.Component {
    static propTypes = {
        customerId: PropTypes.number.isRequired,
        history: PropTypes.shape().isRequired,
        showLoanMenu: PropTypes.bool.isRequired,
        hasZeroAccounts: PropTypes.bool.isRequired,
    };

    constructor(props) {
        super(props);
        this.state = {
            showSubMenu: false,
        };
        scrollTopOnLocationChange(props.history);
    }

    toggleSubMenu = e => {
        const { showSubMenu } = this.state;
        e.stopPropagation();
        e.preventDefault();
        this.setState({ showSubMenu: !showSubMenu });
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
        const customerSettingsIsActive = !!pathname.match(/.customer\/[0-9]+\/profile/);
        const customerSupportIsActive = !!pathname.match(/.customer.support/);
        const { showLoanMenu, customerId, hasZeroAccounts } = this.props;

        return (
            <BottomNavigation light showOverlay={showSubMenu}>
                <BottomMenu>
                    <MenuItem id="mobile-nav-account-overview" linkTo="/account/overview" active={overviewIsActive}>
                        <SvgIconOverview />
                        <MenuItemText>{i18n('navigation.account-overview')}</MenuItemText>
                    </MenuItem>

                    <MenuItem id="mobile-nav-invoice-overview" linkTo="/invoice/overview" active={invoiceIsActive}>
                        <SvgIconInvoices />
                        <MenuItemText>{i18n('navigation.invoices')}</MenuItemText>
                    </MenuItem>
                    {showLoanMenu && (
                        <MenuItem id="mobile-nav-loan-overview" linkTo="/loan/overview" active={loanIsActive}>
                            <SvgIconLoan />
                            <MenuItemText>{i18n('navigation.loan')}</MenuItemText>
                        </MenuItem>
                    )}
                    <InteractiveElement id="mobile-nav-open-submenu" onClick={this.toggleSubMenu}>
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
                        <SubMenuItem
                            id="mobile-nav-customer-profile"
                            linkTo={`/customer/${customerId}/profile`}
                            active={customerSettingsIsActive}
                        >
                            {i18n('navigation.settings')}
                        </SubMenuItem>
                    )}
                    <SubMenuItem
                        id="mobile-nav-customer-support"
                        linkTo="/customer/support"
                        active={customerSupportIsActive}
                    >
                        {i18n('navigation.customer-support')}
                    </SubMenuItem>
                    <SubMenuItem id="mobile-nav-logout" linkTo="/authentication/logout" iconClass="icon-lock">
                        {i18n('navigation.logout')}
                    </SubMenuItem>
                </SubMenu>
            </BottomNavigation>
        );
    }
}

export default withRouter(MobileNavigation);
